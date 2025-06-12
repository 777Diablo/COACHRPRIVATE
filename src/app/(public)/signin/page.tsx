import Link from "next/link";


import { type Metadata } from "next";
import GoogleSignInButton from "./GoogleSignInButton";
import LoginForm from "./LoginForm";
import { Suspense } from "react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In | CoachR",
  description: "CoachR",
};

const SigninPage = async ({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string };
}) => {
  const session = await getServerAuthSession();

  if (session?.user) {
    return redirect("/");
  }

  // if callbackUrl includes admin, redirect to admin signin page
  if (searchParams.callbackUrl?.includes("admin")) {
    return redirect("/admin/signin");
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>
                {searchParams?.error && (
                  <p className="mb-4 rounded-md bg-destructive p-1 text-center text-sm font-medium text-body-color text-destructive-foreground">
                    Invalid credentials
                  </p>
                )}
                <Suspense>
                  <LoginForm />
                </Suspense>
                <div className="flex justify-end ">
                         <Link
                      href="/forgotpassword"
                      className="text-primary"
                    >Forgot Password?</Link>

                </div>
         
                {/* OR */}

                <div className="my-10 flex items-center justify-center">
                  <span className="relative z-[1] inline-block h-[1px] flex-1 bg-body-color/30 dark:bg-body-color"></span>
                  <span className="relative z-[1] mx-3 inline-block flex-shrink text-base font-medium uppercase leading-normal text-body-color dark:text-body-color">
                    or
                  </span>
                  <span className="relative z-[1] inline-block h-[1px] flex-1 bg-body-color/30 dark:bg-body-color"></span>
                </div>

                <GoogleSignInButton />

                <p className="text-center text-base font-medium text-body-color">
                  Don’t you have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
