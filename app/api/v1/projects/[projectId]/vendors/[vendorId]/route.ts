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
  const vendorId = surl[-1]!;
  const [project, vendor] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
    }),
    prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    }),
  ]);
  if (!project)
    return NextResponse.json("Project not found", { status: 404 });
  if (!vendor)
    return NextResponse.json("Vendor not found", { status: 404 });

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
      return NextResponse.json("You cannot link vendors to this project", { status: 403 });
  }

  const existing = await prisma.vendor.findFirst({
    where: {
      id: vendorId,
      projects: {
        some: {
          id: projectId,
        }
      }
    }
  });
  if (existing)
    return NextResponse.json("This vendor is already linked to this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          vendors: {
            connect: {
              id: vendorId,
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
  const vendorId = surl[-1]!;
  const [project, vendor] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
    }),
    prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    }),
  ]);
  if (!project)
    return NextResponse.json("Project not found", { status: 404 });
  if (!vendor)
    return NextResponse.json("Vendor not found", { status: 404 });

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
      return NextResponse.json("You cannot unlink vendors from this project", { status: 403 });
  }

  const existing = await prisma.vendor.findFirst({
    where: {
      id: vendorId,
      projects: {
        some: {
          id: projectId,
        }
      }
    }
  });
  if (!existing)
    return NextResponse.json("This vendor is not linked to this project", { status: 409 });

  try {
    return NextResponse.json(
      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          vendors: {
            disconnect: {
              id: vendorId,
            },
          },
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json("Unexpected error unlinking vendor from project", { status: 500 });
  }
}) as any
