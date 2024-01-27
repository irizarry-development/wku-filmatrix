'use server'

import { User } from "@prisma/client"
import { AuthError } from "next-auth"
import { signIn } from "~/lib/auth"
import prisma from "~/lib/prisma"

export async function authenticate(prev: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            return "Something went wrong";
        }
        
        throw error;
    }
}
