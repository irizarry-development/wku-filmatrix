import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createCastSchema } from "~/lib/z"

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
    return NextResponse.json("You cannot add actors to a cast", { status: 403 });

  const body = await req.json();
  const parsedBody = createCastSchema.parse(body);

  const existing = await prisma.cast.findFirst({
    where: {
      AND: [
        { actorId: parsedBody.actorId },
        { projectId: parsedBody.projectId }
      ]
    }
  });
  if (existing)
    return NextResponse.json("This actor is already a part of the cast of this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.cast.create({
        data: { ...parsedBody }
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json("Unexpected error adding actor to cast", { status: 500 });
  }
}) as any
