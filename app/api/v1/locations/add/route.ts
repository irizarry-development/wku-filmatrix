import { NextResponse } from 'next/server';
import { auth } from '~/lib/auth';
import prisma from '~/lib/prisma';
import { createLocationSchema } from '~/lib/z';

export const POST = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return NextResponse.json(
            'Unauthorized',
            { status: 401 },
        );
    }

    // get requester and validate
    const requester = await prisma.user.findUnique({
        where: {
            email: req.auth.user.email
        }
    });
    if (!requester) {
        return NextResponse.json(
            'impossible...',
            { status: 500 },
        );
    }

    // throw error if requester is a graduated student
    if (requester.role === 3) {
        return NextResponse.json(
            'Graduated students may only view content',
            { status: 400 },
        );
    }

    const body = await req.json();
    const parsedBody = createLocationSchema.parse(body);

    // if location with given name already exists, throw error
    const existing = await prisma.location.findUnique({
        where: {
            locationName: parsedBody.locationName
        }
    });
    if (existing) {
        return NextResponse.json(
            `Location with name \'${parsedBody.locationName}\' already exists`,
            { status: 409 },
        );
    }

    try {
        const location = await prisma.location.create({
            data: { ...parsedBody }
        });
        return NextResponse.json(
            location,
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            'Internal server error',
            { status: 500 },
        );
    }
}) as any;