import { checkAuthentication, forbiddenResponse, invalidRequestWithError, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editCastSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse();

  const id = req.url.split("/").at(-1)!;
  const link = await prisma.homepageLink.findUnique({
    where: {
      id
    },
  });
  if (!link)
    return resourceNotFound();
  return successWithMessage({link});
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
  if (requester.role !== 1)
    return forbiddenResponse();

  const id = req.url.split("/").at(-1)!;
  const link = await prisma.homepageLink.findUnique({
    where: {
      id
    },
  });
  if (!link)
    return resourceNotFound();

  try {
    await prisma.homepageLink.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any
