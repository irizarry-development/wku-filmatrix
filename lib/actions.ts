'use server'

import { AuthError } from "next-auth"
import { signIn } from "./auth";

export async function authenticate(prev: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            return "We were unable to sign you in. Please contact ITS for assistance with NetID. (270) 745-7000";
        }
        
        throw error;
    }
}
