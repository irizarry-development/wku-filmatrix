import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editCastSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse();

  const id = req.url.split("/").at(-1)!;
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  });
  if (!cast)
    return resourceNotFound();
  return successWithMessage({cast});
}) as any

export const PATCH = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    },
  });
  if (!requester)
    return unexpectedError();
  if (requester.role === 3)
    return forbiddenResponse();

  const id = req.url.split("/").at(-1)!;
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  });
  if (!cast)
    return resourceNotFound();
  
  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  cast.projectId },
        ]
      }
    });
    if (!crew)
      return forbiddenResponse();
  }

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = editCastSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  try {
    await prisma.cast.update({
      where: {
        id
      },
      data: parsedBody,
    });
    return resourceUpdateSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any

export const DELETE = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth
    }
  });
  if (!requester)
    return unexpectedError();
  if (requester.role === 3)
    return forbiddenResponse();

  const id = req.url.split("/").at(-1)!;
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  });
  if (!cast)
    return resourceNotFound();

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  cast.projectId },
        ]
      }
    });
    if (!crew)
      return forbiddenResponse();
  }

  try {
    await prisma.cast.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any
