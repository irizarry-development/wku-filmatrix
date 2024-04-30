import { NextRequest, NextResponse } from 'next/server';
import { invalidRequest, successWithMessage, unexpectedError } from '~/lib/api';
import prisma from "~/lib/prisma"
  
export async function POST(req: NextRequest) {
    if (!req.body)
        return invalidRequest();

    try {
        const locations = await req.json();
        let duplicates = [];

        for (const location of locations) {
            const existingLocation = await prisma.location.findUnique({
                where: { locationName: location.locationName },
            });

            if (!existingLocation) {
                await prisma.location.create({ data: location });
            } else {
                duplicates.push(location.locationName);
            }
        }

        return successWithMessage({ message: 'Locations processed' });
    } catch (error) {
        return unexpectedError();
    }
}
