import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { createLocationSchema } from "~/lib/z";

export const POST = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return NextResponse.json({
            status: 401,
            error: "Unauthorized"
        });
    }

    const body = await req.json();
    const parsedBody = createLocationSchema.parse(body);

    try {
        await prisma.location.create({
            data: { ...parsedBody }
        });

        return NextResponse.json({
            status: 200,
            message: "Location added"
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error: "Internal Server Error"
        });
    }
}) as any;