import { auth } from "~/lib/auth";
import { createLocationSchema } from "~/lib/z";
import prisma from "~/lib/prisma";

export const GET = auth(async (req) => {

    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({ 
            status: 401,
            error: "Unauthorized"
         }))
    }

    const id = req.url.split("/").pop()

    const location = await prisma.location.findUnique({
        where: {
            id
        }
    });

    if (!location) {
        return new Response(JSON.stringify({ 
            status: 404
         }))
    }

    return new Response(JSON.stringify({ 
        status: 200,
        location
     }))
}) as any

export const PATCH = auth(async (req) => {
    
        if (!req.auth || !req.auth.user || !req.auth.user.email) {
            return new Response(JSON.stringify({ 
                status: 401,
                error: "Unauthorized"
            }))
        }
    
        const id = req.url.split("/").pop()
    
        const location = await prisma.location.findUnique({
            where: {
                id
            }
        });
    
        if (!location) {
            return new Response(JSON.stringify({ 
                status: 404
            }))
        }
    
        const body = await req.json()
        const parsedBody = createLocationSchema.parse(body)

        try {
            await prisma.location.update({
                where: {
                    id
                },
                data: parsedBody
            });

            return new Response(JSON.stringify({ 
                status: 200,
                message: "Location updated"
            }))
        } catch (e) {
            return new Response(JSON.stringify({ 
                status: 500
            }))
        }
    
    }) as any