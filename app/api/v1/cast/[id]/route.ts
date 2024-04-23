import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editCastSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email)
    return NextResponse.json("Unauthorized", { status: 401 });

  const id = req.url.split("/").pop()!;
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  });
  if (!cast)
    return NextResponse.json("Cast member not found", { status: 404 });
  return NextResponse.json({ cast }, { status: 200 });
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
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  });
  if (!cast)
    return NextResponse.json("Cast member not found", { status: 404 });
  
  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  cast.projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot edit the cast of this project", { status: 403 });
  }

  const body = await req.json();
  let parsedBody;
  try {
    parsedBody = editCastSchema.parse(body);
  } catch (errors) {
    return NextResponse.json((errors as ZodError).issues.at(0)?.message, { status: 400 });
  }

  try {
    await prisma.cast.update({
      where: {
        id
      },
      data: parsedBody,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unexpected error updating cast member", { status: 500 });
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
  const cast = await prisma.cast.findUnique({
    where: {
      id
    },
  })
  if (!cast)
    return NextResponse.json("Cast member not found", { status: 404 });

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId:  cast.projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot delete the cast of this project", { status: 403 });
  }

  try {
    await prisma.cast.delete({
      where: {
        id
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json('Unexpected error while deleting cast member', { status: 500 });
  }
}) as any
