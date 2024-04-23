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

        //TODO: possible logic for working with duplicates to provide a notification?

        // const newLocations = [];
        // const duplicates = [];
        // const locationSet = new Set();

        // locations.forEach(location => {
        //     if (!locationSet.has(location.locationName)) {
        //         locationSet.add(location.locationName);
        //         newLocations.push(location);
        //     } else {
        //         duplicates.push(location.locationName);
        //     }
        // });

        await prisma.location.createMany({
            data: locations,
            skipDuplicates: true,
        });

        return new Response(JSON.stringify({ message: 'Locations processed. Duplicates skipped. Each location name must be unique'}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });


        // return new Response(JSON.stringify({ message: 'Locations processed. Duplicates skipped. Each location name must be unique', duplicates: duplicates }), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' },
        // });
    } catch (error) {
        console.error('Failed to process locations', error);
        return new Response(JSON.stringify({ message: 'Failed to process locations', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}