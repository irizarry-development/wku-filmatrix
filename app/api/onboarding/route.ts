import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { onboardingBodySchema } from "~/lib/z";
import prisma from "~/lib/prisma";

export const POST = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return NextResponse.json({
            status: 401,
            error: "Unauthorized"
        });
    }

    const body = await req.json();
    const parsedBody = onboardingBodySchema.parse(body);

    try {
        await prisma.user.update({
            where: {
                email: req.auth.user.email
            },
            data: { ...parsedBody, hasOnboarded: true }
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
});
