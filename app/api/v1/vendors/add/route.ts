import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceFound, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createVendorSchema } from "~/lib/z"

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
    parsedBody = createVendorSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)?.message);
  }

  const existing = await prisma.vendor.findUnique({
    where: {
      vendorName: parsedBody.vendorName
    }
  });
  if (existing)
    return requestConflict("A vendor with this name already exists");

  try {
    return resourceFound(
      await prisma.vendor.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError;
  }
}) as any
