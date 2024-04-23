import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequest, invalidRequestWithError, resourceDeleteSuccess, resourceFound, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { actorSchema } from "~/lib/z"

export const GET = auth(async (req) => {

  const auth = checkAuthentication(req)

  if (!auth) {
    return unauthorizedResponse
  }

  // Get the actor id from the url
  const id = req.url.split("/").pop()!;

  // Request the actor from the database
  const actor = await prisma.actor.findUnique({
    where: {
      id
    },
  })

  // If the actor is not found, return a 404 response
  if (!actor) {
    return resourceNotFound
  } else {
    return resourceFound(actor)
  }
}) as any

export const PATCH = auth(async (req) => {

  const auth = checkAuthentication(req)

  if (!auth) {
    return unauthorizedResponse
  }

  const requester = await prisma.user.findUnique({
    where: {
      email: auth
    },
  })

  // Check to see if there is a valid requester
  if (!requester) {
    return invalidRequest
  }
  
  // Check to see if they have the correct role
  if (requester.role !== 1) {
    return forbiddenResponse
  }

  // Get the id from the url
  const id = req.url.split("/").pop()!;

  // Get the actor from the database
  const actor = await prisma.actor.findUnique({
    where: {
      id
    },
  })

  if (!actor) {
    return resourceNotFound
  }

  const body = await req.json();
  let parsedBody;

  try {
    parsedBody = actorSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message)
  }

  try {
    await prisma.actor.update({
      where: {
        id
      },
      data: parsedBody,
    })

    return resourceUpdateSuccess
  } catch (error) {
    return unexpectedError
  }
}) as any

export const DELETE = auth(async (req) => {

  const auth = checkAuthentication(req)

  if (!auth) {
    return unauthorizedResponse
  }

  const requester = await prisma.user.findUnique({
    where: {
      email: auth
    }
  })

  if (!requester) {
    return invalidRequest
  } else if (requester.role !== 1) {
    return forbiddenResponse
  }

  const id = req.url.split("/").pop()!;
  const actor = await prisma.actor.findUnique({
    where: {
      id
    },
  })

  if (!actor) {
    return resourceNotFound
  }

  try {
    await prisma.actor.delete({
      where: {
        id
      },
    });

    return resourceDeleteSuccess
  } catch (error) {
    return unexpectedError
  }
}) as any
