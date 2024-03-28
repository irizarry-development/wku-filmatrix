import { auth } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { createUserSchema } from "~/lib/z";

export const GET = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({
            status: 401,
            error: "Unauthorized"
        }));
    }
    const id = req.url.split("/").pop();
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        return new Response(JSON.stringify({
            status: 404
        }));
    }

    return new Response(JSON.stringify({
        status: 200,
        user
    }));

}) as any

export const PATCH = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({
            status: 401,
            error: "Unauthorized"
        }));
    }
    const id = req.url.split("/").pop();
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        return new Response(JSON.stringify({
            status: 404
        }));
    }
    const body = await req.json();
    const parsedBody = createUserSchema.parse(body);

    try {
        await prisma.user.update({
            where: {
                id
            },
            data: parsedBody
        });

        return new Response(JSON.stringify({
            status: 200,
            message: "User updated"
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: "Error updating user"
        }));
    }
}) as any

export const DELETE = auth(async (req) => {
    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({
            status: 401,
            error: "Unauthorized"
        }));
    }
    const id = req.url.split("/").pop()!;
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        return new Response(JSON.stringify({
            status: 404
        }));
    }
    const deleted = await prisma.user.delete({
        where: {
            id
        }
    });
    if (!deleted) {
        return new Response(JSON.stringify({
            status: 500,
            error: `Unexpected error while deleting user ${id}`,
        }));
    }
    return new Response(JSON.stringify({
        status: 200,
    }));
}) as any
