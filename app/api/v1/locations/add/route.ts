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

    // get requester and validate
    const requester = await prisma.user.findUnique({
        where: {
            email: req.auth.user.email
        }
    });
    if (!requester) {
        return new Response(JSON.stringify({
            status: 500,
            error: 'impossible...',
        }));
    }

    // throw error if requester is a graduated student
    if (requester.role === 3) {
        return new Response(JSON.stringify({
            status: 400,
            error: 'Graduated students may only view content.',
        }));
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