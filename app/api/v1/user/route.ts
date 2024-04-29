import { NextRequest, NextResponse } from "next/server"
import prisma from "~/lib/prisma"
import { createUserSchema } from "~/lib/z"
import { hash } from "bcrypt"
import { invalidRequestWithError, requestConflict, successWithMessage, unexpectedError, unexpectedErrorWithMessage } from "~/lib/api"
import { ZodError } from "zod"
import { auth } from "~/lib/auth"

export const POST = auth(async (req) => {
  const body = await req.json()

  let name, email, role, password, repeat;
  try {
    ({name, email, role, password, repeat} = createUserSchema.parse(body));
  } catch (error) {
    if (error instanceof ZodError)
      return invalidRequestWithError((error as ZodError).issues.at(0)?.message)
    return unexpectedError();
  }

  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUserByEmail)
    return requestConflict(`User with email \'${email}\' already exists`);
  if (!['1', '2', '3'].some(pos => pos === role))
    return invalidRequestWithError("Role must be 1 (admin), 2 (student), 3 (graduate)");
  const role_num = parseInt(role);
  if (password !== repeat)
    return invalidRequestWithError("Password and repeat password must be the same");
  if (password.length < 8)
    return invalidRequestWithError("Password must be at least 8 characters");
  if (!password.split('').some(char => char === char.toUpperCase()))
    return invalidRequestWithError("Password must have at least 1 uppercase letter");
  if (!password.split('').some(char => char === char.toLowerCase()))
    return invalidRequestWithError("Password must have at least 1 lowercase letter");
  if (!password.split('').some(char => /\d/.test(char)))
    return invalidRequestWithError("Password must have at least 1 digit");

  let hashedPassword;
  try {
    hashedPassword = await hash(password, 10);
  } catch (error) {
    return unexpectedErrorWithMessage("Unexpected error hashing password");
  }

  try {
    const { saltedPassword: _saltedPassword, ...rest } =
    await prisma.user.create({
      data: {
        name,
        email,
        role: role_num,
        saltedPassword: hashedPassword
      }
    });
    return successWithMessage(rest);
  } catch (error) {
    return unexpectedError();
  }
})
