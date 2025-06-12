import { withAuth } from "next-auth/middleware";
import { type MiddlewareConfig, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextUrl.pathname === "/admin/signin") {
      return NextResponse.next();
    }

    if (!req.nextauth.token?.role || req.nextauth.token?.role === "user") {
      // return NextResponse.rewrite(new URL("/", req.url));
      return NextResponse.redirect(new URL("/", req.url));
    }

    // path is /coach/**
    if (
      req.nextUrl.pathname.startsWith("/coach") === false &&
      req.nextauth.token.role == "coach"
    ) {
      return NextResponse.redirect(new URL("/coach/dashboard", req.url));
    }

    // path is /coach/**
    if (
      req.nextUrl.pathname.startsWith("/coach") &&
      req.nextauth.token.role !== "coach"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const adminRoles = ["admin", "superadmin", "staff"];
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      adminRoles.includes(req.nextauth.token.role as string) === false
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/signin") {
          return true; // Allow access to /admin/signin without checking the token
        }

        if (!token) {
          return false;
        }

        return true;
      },
    },
  },
);

export const config: MiddlewareConfig = {
  matcher: ["/admin/:path*", "/coach/:path*"],
};
