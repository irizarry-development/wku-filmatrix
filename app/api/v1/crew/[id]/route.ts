import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { editCrewSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email)
    return NextResponse.json("Unauthorized", { status: 401 });

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  });
  if (!crew)
    return NextResponse.json("Crew member not found", { status: 404 });
  return NextResponse.json({ crew }, { status: 200 });
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
  if (requester.role !== 1)
    return NextResponse.json("You cannot edit crew members", { status: 400 });

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  });
  if (!crew)
    return NextResponse.json("Crew member not found", { status: 404 });

  const body = await req.json()
  const parsedBody = editCrewSchema.parse(body)
  try {
    await prisma.crew.update({
      where: {
        id
      },
      data: parsedBody,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unexpected error updating crew member", { status: 500 });
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
  if (requester.role !== 1)
    return NextResponse.json("You cannot delete crew members", { status: 400 });

  const id = req.url.split("/").pop()!;
  const crew = await prisma.crew.findUnique({
    where: {
      id
    },
  })
  if (!crew)
    return NextResponse.json("Crew member not found", { status: 404 });

  try {
    await prisma.crew.delete({
      where: {
        id
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json('Unexpected error while deleting crew member', { status: 500 });
  }
}) as any
