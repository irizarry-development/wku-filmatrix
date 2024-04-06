import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';

// export async function GET() {
//     const data = { message: 'Test successful' };
//     return new Response(JSON.stringify(data), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }



export async function GET(request: Request) {
  const url = new URL(request.url);
  
  let query = url.searchParams.get('query') || ''; 

  const results = await prisma.location.findMany({
    where: {
      OR: [
        { locationName: { contains: query, mode: 'insensitive' } },
        { locationDescription: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  });
}
