import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, requestConflict, resourceDeleteSuccess, successWithMessage, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createVendorSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse();

  const id = req.url.split("/").at(-1)!;
  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  });
  if (!vendor)
    return resourceNotFound();
  return successWithMessage({ vendor });
}) as any

export const PATCH = auth(async (req) => {
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

  const id = req.url.split("/").at(-1)!;
  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  });
  if (!vendor)
    return resourceNotFound();

  const body = await req.json();
  let parsedBody: any;
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
    await prisma.vendor.update({
      where: {
        id
      },
      data: parsedBody
    })
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
      email: auth,
    }
  });
  if (!requester) {
    return unexpectedError();
  }
  if (requester.role !== 1)
    return forbiddenResponse();

  const id = req.url.split("/").at(-1)!;
  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    },
  });
  if (!vendor)
    return resourceNotFound();

  try {
    await prisma.vendor.delete({
      where: {
        id
      },
    });
    return resourceDeleteSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any
