import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  type DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import type { $Enums, PrismaClient, ROLE } from "@prisma/client";
import { db } from "@/server/db";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { compare } from "bcryptjs";
import { type DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: $Enums.ROLE;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    role: $Enums.ROLE;
    provider: string;
  }

  interface User extends DefaultUser {
    role: $Enums.ROLE;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user?.role) {
        token.role = user.role;
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session.user.id = token.sub!;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (token?.role) session.user.role = token.role as ROLE;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      id: "staff-login",
      name: "Staff Login",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: authorizeStaff(db),
    }),
    CredentialsProvider({
      id: "user-login",
      name: "User Login",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: authorizeUser(db),
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/signin",
  },
};

function authorizeUser(prisma: PrismaClient) {
  return async (
    credentials: Record<"email" | "password", string> | undefined,
  ) => {
    if (!credentials) throw new Error("Missing credentials");
    if (!credentials.email)
      throw new Error('"email" is required in credentials');
    if (!credentials.password)
      throw new Error('"password" is required in credentials');

    const maybeUser = await prisma.user.findFirst({
      where: { email: credentials.email },
    });

    if (!maybeUser?.password) return null;

    // verify the input password with stored hash
    const isValid = await compare(credentials.password, maybeUser.password);
    // const isValid = credentials.password === maybeUser.password;
    if (!isValid) return null;

    return {
      id: maybeUser.id,
      email: maybeUser.email,
      name: maybeUser.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: maybeUser.role,
    };
  };
}
function authorizeStaff(prisma: PrismaClient) {
  return async (
    credentials: Record<"email" | "password", string> | undefined,
  ) => {
    if (!credentials) throw new Error("Missing credentials");
    if (!credentials.email)
      throw new Error('"email" is required in credentials');
    if (!credentials.password)
      throw new Error('"password" is required in credentials');

    const maybeStaff = await prisma.user.findFirst({
      where: {
        email: credentials.email,
        role: { not: "user" },
      },
    });

    console.log("========>", maybeStaff);
    if (!maybeStaff?.password) return null;

    // verify the input password with stored hash
    const isValid = await compare(credentials.password, maybeStaff.password);
    // const isValid = credentials.password === maybeStaff.password;
    if (!isValid) return null;
    // if (!maybeStaff?.role) return null;
    // if (!(maybeStaff.role as Role).name) return null;

    return {
      id: maybeStaff.id,
      email: maybeStaff.email,
      name: maybeStaff.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      role: maybeStaff.role,
    };
  };
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
