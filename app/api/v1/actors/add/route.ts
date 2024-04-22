import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { actorSchema } from "~/lib/z"

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email)
    return NextResponse.json("Unauthorized", { status: 401 });

  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    }
  });
  if (!requester)
    return NextResponse.json("impossible...", { status: 500 });
  if (requester.role === 3)
    return NextResponse.json( "Graduated students may only view content", { status: 400 });
  if (requester.role !== 1)
    return NextResponse.json("You cannot create actors", { status: 403 });

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = actorSchema.parse(body);
  } catch (errors) {
    return NextResponse.json((errors as ZodError).issues.at(0)!.message, { status: 400 });
  }
  try {
    return NextResponse.json(
      await prisma.actor.create({
        data: { ...parsedBody }
      }), 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Unexpected error creating actor", { status: 500 });
  }
}) as any
