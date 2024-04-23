import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editCrewSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse;

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  });
  if (!crew)
    return resourceNotFound;
  return successWithMessage({ crew });
}) as any

export const PATCH = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse;

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    },
  });
  if (!requester)
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  });
  if (!crew)
    return resourceNotFound;

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = editCrewSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  try {
    await prisma.crew.update({
      where: {
        id
      },
      data: parsedBody,
    });
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
  });
  if (!requester)
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  })
  if (!crew)
    return resourceNotFound;

  try {
    await prisma.crew.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess;
  } catch (error) {
    return unexpectedError;
  }
}) as any
