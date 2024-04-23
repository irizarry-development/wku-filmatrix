import { NextRequest, NextResponse } from 'next/server';
import prisma from "~/lib/prisma"

export const config = {
    runtime: 'experimental-edge',
};
  
export async function POST(req: NextRequest) {
    if (!req.body) {
        return new Response(JSON.stringify({ message: 'No data provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

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

        return new Response(JSON.stringify({ message: 'Locations processed. Duplicates skipped.', duplicates: duplicates }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to process locations', error);
        return new Response(JSON.stringify({ message: 'Failed to process locations', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
