import { NextRequest, NextResponse } from 'next/server'
import prisma from '~/lib/prisma'
import { createUserSchema } from '~/lib/z'
import {hash} from 'bcrypt'

export async function GET() {
    return NextResponse.json({
        status: 200,
        message: "Welcome to the user API"
    })
}

/**
 * API Route to create a new user.
 * 
 * POST /api/user/
 * 
 */

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, saltedPassword, name } = createUserSchema.parse(body)

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUserByEmail)
        {
            return NextResponse.json({ user: null, status: 409 })
        }

        const hashedPassword = await hash(saltedPassword, 10);

        // The reason for destructuring in this way is for security.
        // We leave the salted password to get garbage collected on the server.
        // We don't want to send the salted password to the client.

        const { 
            saltedPassword: _saltedPassword, 
            ...rest
        } = await prisma.user.create({
            data: {
                email,
                name,
                saltedPassword: hashedPassword
            }
        })

        return NextResponse.json({ user: rest, status: 201, message: "User created."})
    } catch (error) {

        // TODO: Implement some kind of security check here. E.g. rate limiting or something.

        return NextResponse.json({ user: null, status: 500, message: "Error occured during user creation."})
    }
}