import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceFound, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createLocationSchema } from "~/lib/z"

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse;

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  })
  if (!requester) {
    return unexpectedError;
  }

  // throw error if requester is a graduated student
  if (requester.role === 3)
    return forbiddenResponse;

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = createLocationSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  // if location with given name already exists, throw error
  const existing = await prisma.location.findUnique({
    where: {
      locationName: parsedBody.locationName
    }
  })
  if (existing)
    return requestConflict;

  try {
    return resourceFound(
      await prisma.location.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError;
  }
}) as any
