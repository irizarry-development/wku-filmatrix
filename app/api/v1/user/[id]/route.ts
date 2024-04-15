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

    // get user and validate
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

    // get user to be edited and validate
    const id = req.url.split("/").pop();
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        return new Response(JSON.stringify({
            status: 404,
            error: 'Person not found. Either someone deleted this person while you were editing, or there were network issues.',
        }));
    }

    // throw error if user to be edited is not requester and requester is not admin
    if (user.email !== req.auth.user.email && requester.role !== 1) {
        return new Response(JSON.stringify({
            status: 400,
            error: 'You cannot edit other people.',
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
            error: 'You cannot delete people.',
        }));
    }

    // get user and validate
    const id = req.url.split("/").pop();
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if (!user) {
        return new Response(JSON.stringify({
            status: 404,
            error: 'User not found',
        }));
    }

    // if user is trying to delete themselves, return error
    if (user.email === req.auth.user.email) {
        return new Response(JSON.stringify({
            status: 400,
            error: 'You cannot delete yourself',
        }));
    }

    // delete user
    const deleted = await prisma.user.delete({
        where: {
            id
        }
    });

    // return error if user was not deleted
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
