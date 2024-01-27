import NextAuth from "next-auth";

import prisma from "~/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import bcrypt from 'bcrypt'

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
      authorized({
        auth, request: { nextUrl }
      }) {
        return !!auth?.user;
      }
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

            const { email, password } = z.object({
              email: z.string().email(),
              password: z.string()
            }).parse(credentials);

            if (!email) {
              throw new Error('Email is required')
            }

            if (!password) {
              throw new Error('Password is required')
            }

            const user = await prisma.user.findUnique({
              where: {
                email
              },
            })

            if (!user) {
              throw new Error('No user found')
            }

            return user
          }
        }) 
    ],
    secret: process.env.AUTH_SECRET
});
