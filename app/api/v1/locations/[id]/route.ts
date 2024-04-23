import { auth } from "~/lib/auth"
import { createLocationSchema } from "~/lib/z"
import prisma from "~/lib/prisma"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceDeleteSuccess, resourceFound, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { ZodError } from "zod"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse;

  const id = req.url.split("/").pop()
  const location = await prisma.location.findUnique({
    where: {
      id
    }
  });
  if (!location)
    return resourceNotFound;
  return resourceFound({ location });
}) as any

export const PATCH = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse;

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  })
  if (!requester)
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const id = req.url.split("/").pop();
  const location = await prisma.location.findUnique({
    where: {
      id
    }
  });
  if (!location)
    return resourceNotFound;

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = createLocationSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.location.findUnique({
    where: {
      locationName: parsedBody.locationName
    }
  })
  if (existing)
    return requestConflict("A location with this name already exists");

  try {
    await prisma.location.update({
      where: {
        id
      },
      data: parsedBody
    })
    return resourceUpdateSuccess;
  } catch (error) {
    return unexpectedError;
  }
}) as any

export const DELETE = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse;

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  })
  if (!requester) {
    return unexpectedError;
  }
  if (requester.role !== 1)
    return forbiddenResponse;

  const id = req.url.split("/").pop()!
  const loc = await prisma.location.findUnique({
    where: {
      id
    }
  });
  if (!loc)
    return resourceNotFound;

  try {
    await prisma.location.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess;
  } catch (error) {
    return unexpectedError;
  }
}) as any
