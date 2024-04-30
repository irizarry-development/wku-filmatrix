import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, successWithMessage, unauthorizedResponse, unexpectedError, unexpectedErrorWithMessage } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createCastSchema } from "~/lib/z"

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  });
  if (!requester)
    return unexpectedError();
  if (requester.role === 3)
    return forbiddenResponse();

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = createCastSchema.parse(body);
  } catch (errors) {
    if (errors instanceof ZodError)
      return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
    return unexpectedErrorWithMessage("Unexpected error linking actor to project");
  }

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  parsedBody.projectId },
        ]
      }
    });
    if (!crew)
      return forbiddenResponse();
  }

  const existing = await prisma.cast.findFirst({
    where: {
      AND: [
        { actorId: parsedBody.actorId },
        { projectId: parsedBody.projectId }
      ]
    }
  });
  if (existing)
    return requestConflict("This actor is already linked to this project");

  try {
    return successWithMessage(
      await prisma.cast.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError();
  }
}) as any
