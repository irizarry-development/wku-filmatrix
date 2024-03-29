import { auth } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { createVendorSchema } from "~/lib/z";

export const GET = auth(async (req) => {

    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({ 
            status: 401,
            error: "Unauthorized"
         }))
    }

    const id = req.url.split("/").pop()

    const vendor = await prisma.vendor.findUnique({
        where: {
            id
        }
    });

    if (!vendor) {
        return new Response(JSON.stringify({ 
            status: 404
         }))
    }

    return new Response(JSON.stringify({ 
        status: 200,
        vendor
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
    
        const vendor = await prisma.vendor.findUnique({
            where: {
                id
            }
        });
    
        if (!vendor) {
            return new Response(JSON.stringify({ 
                status: 404
            }))
        }
    
        const body = await req.json()
        const parsedBody = createVendorSchema.parse(body)

        try {
            await prisma.vendor.update({
                where: {
                    id
                },
                data: { ...parsedBody }
            });

            return new Response(JSON.stringify({ 
                status: 200,
                message: "Vendor updated"
            }))
        } catch (error) {
            return new Response(JSON.stringify({ 
                status: 500,
                error: "Internal Server Error"
            }))
        }
    }
) as any