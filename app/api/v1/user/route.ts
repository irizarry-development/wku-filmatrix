import { NextRequest, NextResponse } from "next/server"
import prisma from "~/lib/prisma"
import { createUserSchema } from "~/lib/z"
import { hash } from "bcrypt"

export async function POST(req: NextRequest) {
  // TODO: determine how users will be onboarded and new accounts created, this will work temporarily.

  try {
    const body = await req.json()

    // TODO: change back to constants

    const {
      email,
      saltedPassword = "dummy",
      name
    } = createUserSchema.parse(body)

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUserByEmail) {
      return NextResponse.json(`User with email \'${email}\' already exists`, {
        status: 409
      })
    }

    // TODO: remove dummy password

    const hashedPassword = await hash(saltedPassword, 10)

    // TODO: Select only the fields that are needed

    const { saltedPassword: _saltedPassword, ...rest } =
      await prisma.user.create({
        data: {
          email,
          name,
          saltedPassword: hashedPassword
        }
      })

    return NextResponse.json(rest, { status: 201 })
  } catch (error) {
    return NextResponse.json("Error occured during user creation.", {
      status: 500
    })
  }
}
