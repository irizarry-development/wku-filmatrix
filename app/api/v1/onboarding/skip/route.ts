import { checkAuthentication, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api";
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse;

  try {
    await prisma.user.update({
      where: {
        email: auth,
      },
      data: { hasOnboarded: true }
    })
    return successWithMessage("Onboarding form submitted");
  } catch (error) {
    return unexpectedError;
  }
}) as any
