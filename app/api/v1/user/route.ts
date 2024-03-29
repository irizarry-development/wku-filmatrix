import { NextRequest, NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { createUserSchema } from "~/lib/z";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {

    // TODO: determine how users will be onboarded and new accounts created, this will work temporarily.

    try {
        const body = await req.json();

        // TODO: change back to constants

        const { email, saltedPassword = "dummy", name } = createUserSchema.parse(body);

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, status: 409 });
        }

        // TODO: remove dummy password

        const hashedPassword = await hash(saltedPassword, 10);

        const { saltedPassword: _saltedPassword, ...rest } =
            await prisma.user.create({
                data: {
                    email,
                    name,
                    saltedPassword: hashedPassword
                }
            });

        return NextResponse.json({
            user: rest,
            status: 201,
            message: "User created."
        });
    } catch (error) {
        return NextResponse.json({
            user: null,
            status: 500,
            message: "Error occured during user creation."
        });
    }
}
