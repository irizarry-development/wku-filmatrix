import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, successWithMessage, unauthorizedResponse, unexpectedError, unexpectedErrorWithMessage } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createHomelinkSchema } from "~/lib/z"

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
    parsedBody = createHomelinkSchema.parse(body);
  } catch (errors) {
    if (errors instanceof ZodError)
      return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
    return unexpectedErrorWithMessage("Unexpected error creating homepage link");
  }

  const existing = await prisma.homepageLink.findFirst({
    where: {
      AND: [
        { category: parsedBody.category },
        { name: parsedBody.name }
      ]
    }
  });
  if (existing)
    return requestConflict("This homepage link already exists");

  try {
    return successWithMessage(
      await prisma.homepageLink.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError();
  }
}) as any
