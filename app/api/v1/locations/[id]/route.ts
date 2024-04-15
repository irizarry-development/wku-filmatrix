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

        // throw error if requester is not admin
        if (requester.role !== 1) {
            return new Response(JSON.stringify({
                status: 400,
                error: 'You cannot edit locations.',
            }));
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

export const DELETE = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({
            status: 401,
            error: "Unauthorized"
        }));
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

    // throw error if requester is not admin
    if (requester.role !== 1) {
        return new Response(JSON.stringify({
            status: 400,
            error: 'You cannot delete locations.',
        }));
    }

    // get location id from url
    const id = req.url.split("/").pop()!;
    // find location
    const loc = await prisma.location.findUnique({
        where: {
            id
        }
    });

    // if location does not exist, return error
    if (!loc) {
        return new Response(JSON.stringify({
            status: 404,
            error: 'Location not found',
        }));
    }

    // delete location
    const deleted = await prisma.location.delete({
        where: {
            id
        }
    });

    // return error if location was not deleted
    if (!deleted) {
        return new Response(JSON.stringify({
            status: 500,
            error: `Unexpected error while deleting location ${id}`,
        }));
    }
    return new Response(JSON.stringify({
        status: 200,
    }));
}) as any
