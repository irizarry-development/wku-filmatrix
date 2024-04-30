import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createCrewSchema } from "~/lib/z"

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
  if (requester.role !== 1)
    return forbiddenResponse();

  const body = await req.json();
  let parsedBody: any;
  try {
    parsedBody = createCrewSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.crew.findFirst({
    where: {
      AND: [
        { userId: parsedBody.userId },
        { projectId: parsedBody.projectId }
      ]
    }
  });
  if (existing)
    return requestConflict("This user is already linked to this project");

  try {
    return successWithMessage(
      await prisma.crew.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError();
  }
}) as any
