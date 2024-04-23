import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"

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

  const surl = req.url.split("/");
  const projectId = surl[-3]!;
  const locationId = surl[-1]!;
  const [project, location] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
    }),
    prisma.location.findUnique({
      where: {
        id: locationId,
      },
    }),
  ]);
  if (!project)
    return NextResponse.json("Project not found", { status: 404 });
  if (!location)
    return NextResponse.json("Location not found", { status: 404 });

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId: projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot link locations to this project", { status: 403 });
  }

  const existing = await prisma.location.findFirst({
    where: {
      id: locationId,
      projects: {
        some: {
          id: projectId,
        }
      }
    }
  });
  if (existing)
    return NextResponse.json("This location is already linked to this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          locations: {
            connect: {
              id: locationId,
            },
          },
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json("Unexpected error linking location to project", { status: 500 });
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

  const surl = req.url.split("/");
  const projectId = surl[-3]!;
  const locationId = surl[-1]!;
  const [project, location] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
    }),
    prisma.location.findUnique({
      where: {
        id: locationId,
      },
    }),
  ]);
  if (!project)
    return NextResponse.json("Project not found", { status: 404 });
  if (!location)
    return NextResponse.json("Location not found", { status: 404 });

  if (requester.role !== 1) {
    const crew = await prisma.crew.findFirst({
      where: {
        AND: [
          { userId: requester.id, },
          { projectId: projectId },
        ]
      }
    });
    if (!crew)
      return NextResponse.json("You cannot unlink locations from this project", { status: 403 });
  }

  const existing = await prisma.location.findFirst({
    where: {
      id: locationId,
      projects: {
        some: {
          id: projectId,
        }
      }
    }
  });
  if (!existing)
    return NextResponse.json("This location is not linked to this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          locations: {
            disconnect: {
              id: locationId,
            },
          },
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json("Unexpected error unlinking location from project", { status: 500 });
  }
}) as any
