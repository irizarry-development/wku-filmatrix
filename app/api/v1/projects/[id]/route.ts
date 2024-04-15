import { auth } from "~/lib/auth";
import { createProjectSchema } from "~/lib/z";
import prisma from "~/lib/prisma";

export const GET = auth(async (req) => {

    if (!req.auth || !req.auth.user || !req.auth.user.email) {
        return new Response(JSON.stringify({ 
            status: 401,
            error: "Unauthorized"
        }))
    }

    const id = req.url.split("/").pop()

    const project = await prisma.project.findUnique({
        where: {
            id
        }
    });

    if (!project) {
        return new Response(JSON.stringify({ 
            status: 404
        }))
    }

    return new Response(JSON.stringify({ 
        status: 200,
        project
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
                error: 'You cannot edit projects.',
            }));
        }

        const id = req.url.split("/").pop()
        const project = await prisma.project.findUnique({
            where: {
                id
            }
        });
    
        if (!project) {
            return new Response(JSON.stringify({ 
                status: 404
            }))
        }
    
        const body = await req.json()
        const parsedBody = createProjectSchema.parse(body)

        try {
            await prisma.project.update({
                where: {
                    id
                },
                data: parsedBody
            });

            return new Response(JSON.stringify({ 
                status: 200,
                message: "Project updated"
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
            error: 'You cannot delete projects.',
        }));
    }

    // get project id from url
    const id = req.url.split("/").pop()!;
    // find project
    const project = await prisma.project.findUnique({
        where: {
            id
        }
    });

    // if project does not exist, return error
    if (!project) {
        return new Response(JSON.stringify({
            status: 404,
            error: 'Project not found',
        }));
    }

    // delete project
    const deleted = await prisma.project.delete({
        where: {
            id
        }
    });

    // return error if project was not deleted
    if (!deleted) {
        return new Response(JSON.stringify({
            status: 500,
            error: `Unexpected error while deleting project ${id}`,
        }));
    }
    return new Response(JSON.stringify({
        status: 200,
    }));
}) as any
