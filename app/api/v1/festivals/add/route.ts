import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createFestivalSchema } from "~/lib/z"

export const POST = auth(async (req) => {
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
  if (requester.role === 3)
    return forbiddenResponse;

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = createFestivalSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
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
      return forbiddenResponse;
  }

  try {
    return successWithMessage(
      await prisma.festival.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError;
  }
}) as any
