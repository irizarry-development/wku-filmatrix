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
        const vendors = await req.json();

        //TODO: possible logic for working with duplicates to provide a notification?

        // const newVendors = [];
        // const duplicates = [];
        // const vendorSet = new Set();

        // vendors.forEach(vendor => {
        //     if (!vendorSet.has(vendor.vendorName)) {
        //         vendorSet.add(vendor.vendorName);
        //         newVendors.push(vendor);
        //     } else {
        //         duplicates.push(vendor.vendorName);
        //     }
        // });

        await prisma.vendor.createMany({
            data: vendors,
            skipDuplicates: true,
        });

        return new Response(JSON.stringify({ message: 'vendors processed. Duplicates skipped. Each vendor name must be unique'}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });


        // return new Response(JSON.stringify({ message: 'vendors processed. Duplicates skipped. Each vendor name must be unique', duplicates: duplicates }), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' },
        // });
    } catch (error) {
        let errorMessage
        if (error instanceof Error) {
            errorMessage = error.message;
          }
        console.error('Failed to process vendors', error);
        return new Response(JSON.stringify({ message: 'Failed to process vendors', error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}