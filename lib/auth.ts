import NextAuth from "next-auth";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod"

async function getUser(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            name: username
        }
    });

    if (user) {
        return user;
    } else {
        return null;
    }
}

export const authConfig = {}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
    },
    pages: {
      signIn: '/auth/signin',
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith"
                },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string().email(), password: z.string().min(8) })
                    .safeParse(credentials)
              
                if (!parsedCredentials.success) {
                    return null;
                }

                const { username, password } = parsedCredentials.data

                let user = await getUser(username)

                console.log(user)

                return user
            }
        })
    ],
    secret: process.env.AUTH_SECRET
});
