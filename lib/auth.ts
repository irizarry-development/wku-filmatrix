import NextAuth from "next-auth"

import prisma from "~/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "~/auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.userId = token.sub
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token
        }
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    }
  },
  debug: true,
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig
})
