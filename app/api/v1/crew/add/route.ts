import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createCrewSchema } from "~/lib/z"

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
    return NextResponse.json("You cannot add users to a project crew", { status: 403 });

  const body = await req.json();
  const parsedBody = createCrewSchema.parse(body);

  const existing = await prisma.crew.findFirst({
    where: {
      AND: [
        { userId: parsedBody.userId },
        { projectId: parsedBody.projectId }
      ]
    }
  });
  if (existing)
    return NextResponse.json("This user is already a part of the crew of this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.crew.create({
        data: { ...parsedBody }
      }), 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Unexpected error adding user to crew", { status: 500 });
  }
}) as any
