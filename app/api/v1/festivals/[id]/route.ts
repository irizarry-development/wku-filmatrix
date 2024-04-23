import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editFestivalSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email)
    return NextResponse.json("Unauthorized", { status: 401 });

  const id = req.url.split("/").pop()!;
  const festival = await prisma.festival.findUnique({
    where: {
      id
    },
  });
  if (!festival)
    return NextResponse.json("Festival not found", { status: 404 });
  return NextResponse.json({ festival }, { status: 200 });
}) as any

export const PATCH = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email)
    return NextResponse.json("Unauthorized", { status: 401 });

  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    },
  });
  if (!requester)
    return NextResponse.json("impossible...", { status: 500 });
  if (requester.role === 3)
    return NextResponse.json("Graduated students may only view content", { status: 400 });

  const id = req.url.split("/").pop()!;
  const festival = await prisma.festival.findUnique({
    where: {
      id
    },
  });
  if (!festival)
    return NextResponse.json("Festival not found", { status: 404 });

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  festival.projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot edit festivals from this project", { status: 403 });
  }
  
  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = editFestivalSchema.parse(body);
  } catch (errors) {
    return NextResponse.json((errors as ZodError).issues.at(0)?.message, { status: 400 });
  }

  try {
    await prisma.festival.update({
      where: {
        id
      },
      data: parsedBody,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unexpected error updating festivals", { status: 500 });
  }
}) as any

export const DELETE = auth(async (req) => {
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
    return NextResponse.json("Graduated students may only view content", { status: 400 });

  const id = req.url.split("/").pop()!;
  const festival = await prisma.festival.findUnique({
    where: {
      id
    },
  })
  if (!festival)
    return NextResponse.json("Festival not found", { status: 404 });

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  festival.projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot delete festivals from this project", { status: 403 });
  }

  try {
    await prisma.festival.delete({
      where: {
        id
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json('Unexpected error while deleting festival', { status: 500 });
  }
}) as any
