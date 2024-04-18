import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "~/lib/prisma"
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = z
          .object({
            email: z.string().email(),
            password: z.string()
          })
          .parse(credentials)

        if (!email) {
          throw new Error("Email is required")
        }

        if (!password) {
          throw new Error("Password is required")
        }

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user) {
          throw new Error("No user found")
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.saltedPassword
        )

        if (!passwordMatch) {
          throw new Error("Password does not match")
        }

        return user
      }
    })
  ]
} satisfies NextAuthConfig
