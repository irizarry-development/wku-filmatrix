import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createUserSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse;

  const id = req.url.split("/").pop()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (!user)
    return resourceNotFound;
  return successWithMessage({ user });
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

  const id = req.url.split("/").pop()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!user)
    return resourceNotFound;

  if (user.email !== requester.email && requester.role !== 1)
    return invalidRequestWithError("You cannot edit people other than yourself");

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = createUserSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.user.findUnique({
    where: {
      email: parsedBody.email
    }
  });
  if (existing)
    return requestConflict("A user with this email already exists");

  try {
    await prisma.user.update({
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
  });
  if (!requester)
    return unexpectedError;
  if (requester.role !== 1)
    return forbiddenResponse;

  const id = req.url.split("/").pop();
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });
  if (!user)
    return resourceNotFound;
  if (user.email === auth)
    return invalidRequestWithError("You cannot delete yourself");

  try {
    await prisma.user.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess;
  } catch (error) {
    return unexpectedError;
  }
}) as any
