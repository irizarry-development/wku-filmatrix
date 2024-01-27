'use server'

import { AuthError } from "next-auth"
import { signIn } from "~/lib/auth"

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
