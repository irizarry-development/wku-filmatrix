'use server'

import { signIn } from "~/lib/auth"
import prisma from "~/lib/prisma"

export async function authenticate(prev: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        console.error(error)
        return 'Something went wrong.'
    }
}

export async function getUserFromDatabase(email: string) {

    console.log("getUserFromDatabase called with value " + email)

    let user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        console.log("User not found in database.")
        return null
    }

    console.log("User found in database.")

    console.log(user)

    return user
}