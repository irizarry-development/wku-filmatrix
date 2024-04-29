import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { checkAuthentication, invalidRequestWithError, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError, unexpectedErrorWithMessage } from "~/lib/api";
import { changePasswordSchema } from "~/lib/z";
import prisma from "~/lib/prisma";
import { hash, compare } from "bcrypt";
import { auth } from "~/lib/auth";

export const PATCH = auth(async (req) => {
  const auth = checkAuthentication(req)
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    },
  });
  if (!requester)
    return unexpectedError();

  const body = await req.json();
  let currentp, newp, repeatp;
  try {
    ({currentp, newp, repeatp} = changePasswordSchema.parse(body));
  } catch (error) {
    if (error instanceof ZodError)
      return invalidRequestWithError((error as ZodError).issues.at(0)?.message)
    return unexpectedError();
  }

  const id = req.url.split("/").at(-2)!;
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });
  if (!user)
    return resourceNotFound();

  if (user.email !== requester.email && requester.role !== 1)
    return invalidRequestWithError("You cannot change the password for people other than yourself");

  let passMatch: boolean;
  try {
    passMatch = await compare(currentp, user.saltedPassword);
  } catch (error) {
    return unexpectedErrorWithMessage("Unexpected error comparing provided current password to stored current password");
  }
  if (!passMatch)
    return invalidRequestWithError("Current password incorrect");
  if (newp !== repeatp)
    return invalidRequestWithError("Password and repeat password must be the same");
  if (newp.length < 8)
    return invalidRequestWithError("Password must be at least 8 characters");
  if (!newp.split('').some(char => char === char.toUpperCase()))
    return invalidRequestWithError("Password must have at least 1 uppercase letter");
  if (!newp.split('').some(char => char === char.toLowerCase()))
    return invalidRequestWithError("Password must have at least 1 lowercase letter");
  if (!newp.split('').some(char => /\d/.test(char)))
    return invalidRequestWithError("Password must have at least 1 digit");

  let hashedPassword;
  try {
    hashedPassword = await hash(newp, 10);
  } catch (error) {
    return unexpectedErrorWithMessage("Unexpected error hashing password");
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        saltedPassword: hashedPassword
      }
    });
    return resourceUpdateSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any;
