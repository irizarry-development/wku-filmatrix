import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  
  let query = url.searchParams.get('query') || ''; 

  const results = await prisma.vendor.findMany({
    where: {
      OR: [
        { vendorName: { contains: query, mode: 'insensitive' } },
        { vendorDescription: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}
