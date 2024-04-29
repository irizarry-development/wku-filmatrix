import { auth } from "~/lib/auth"
import { onboardingBodySchema } from "~/lib/z"
import prisma from "~/lib/prisma"
import { checkAuthentication, successWithMessage, unauthorizedResponse, unexpectedError } from "~/lib/api"

export const PATCH = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const body = await req.json()
  const parsedBody = onboardingBodySchema.parse(body)

  try {
    await prisma.user.update({
      where: {
        email: auth,
      },
      data: { ...parsedBody, hasOnboarded: true }
    })
    return successWithMessage("Onboarding form submitted");
  } catch (error) {
    return unexpectedError();
  }
}) as any
