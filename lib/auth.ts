import NextAuth from "next-auth";

import prisma from "~/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
    },
    debug: true,
    pages: {
      signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    providers: [
        Credentials({
          async authorize(credentials) {
            return {}
          }
        }) 
    ],
    secret: process.env.AUTH_SECRET
});
