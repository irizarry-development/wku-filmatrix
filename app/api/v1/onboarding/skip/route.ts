import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import prisma from "~/lib/prisma";

export const POST = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return NextResponse.json({
            status: 401,
            error: "Unauthorized"
        });
    }

    try {
        await prisma.user.update({
            where: {
                email: req.auth.user.email
            },
            data: { hasOnboarded: true }
        });

        return NextResponse.json({
            status: 200,
            message: "Onboarding form submitted"
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error"
        });
    }
}) as any
