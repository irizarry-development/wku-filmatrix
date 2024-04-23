import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { checkAuthentication, forbiddenResponse, invalidRequestWithError, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { actorSchema } from "~/lib/z"

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
  if (requester.role !== 1)
    return forbiddenResponse;

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = actorSchema.parse(body);
  } catch (errors) {
    return invalidRequestWithError((errors as ZodError).issues.at(0)!.message);
  }
  try {
    return successWithMessage(
      await prisma.actor.create({
        data: { ...parsedBody }
      })
    );
  } catch (error) {
    return unexpectedError;
  }
}) as any
