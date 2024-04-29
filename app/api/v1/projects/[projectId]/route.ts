import { auth } from "~/lib/auth"
import { editProjectSchema } from "~/lib/z"
import prisma from "~/lib/prisma"
import { checkAuthentication, forbiddenResponse, requestConflict, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, splitUrl, unauthorizedResponse, unexpectedError } from "~/lib/api"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse;

  const id = req.url.split('/')[req.url.length - 1];
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })
  if (!project)
    return resourceNotFound;
  return successWithMessage({ project })
}) as any

export const PATCH = auth(async (req) => {
  
  const auth = checkAuthentication(req)

  if (!auth) {
    return unauthorizedResponse;
  }

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: auth
    }
  })

  if (!requester) {
    return unexpectedError
  }

  if (requester.role !== 1) {
    return forbiddenResponse
  }

  const id = req.url.split('/')[req.url.length - 1];
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })

  if (!project) {
    return resourceNotFound
  }

  const body = await req.json()
  const parsedBody = editProjectSchema.parse(body)

  // if project with given name or production number already exists, throw error
  const existing = await prisma.project.findFirst({
    where: {
      OR: [
        { projectName: parsedBody.projectName },
        { projectProductionNumber: parsedBody.projectProductionNumber }
      ]
    }
  })
  if (existing)
    requestConflict("A project with this name or production number already exists");

  try {
    await prisma.project.update({
      where: {
        id
      },
      data: parsedBody
    })

    return resourceUpdateSuccess
  } catch (error) {
    return unexpectedError
  }
}) as any

export const DELETE = auth(async (req) => {
  
  const auth = checkAuthentication(req)

  if (!auth)
    return unauthorizedResponse;
  const requester = await prisma.user.findUnique({
    where: {
      email: auth
    }
  });
  if (!requester) 
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const surl = req.url.split('/');
  const id = surl.at(-1)!;
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  });
  if (!project)
    return resourceNotFound;

  try {
    await prisma.project.delete({
      where: {
        id
      }
    });
    return resourceDeleteSuccess;
  } catch (error) {
    return unexpectedError;
  }
}) as any
