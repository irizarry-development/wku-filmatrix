import { checkAuthentication, forbiddenResponse, requestConflict, resourceDeleteSuccess, successWithMessage, resourceNotFound, unauthorizedResponse, unexpectedError } from "~/lib/api";
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"

export const POST = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  });
  if (!requester)
    return unexpectedError();
  if (requester.role === 3)
    return forbiddenResponse();

  const surl = req.url.split("/");
  const projectId = surl.at(-3)!;
  const locationId = surl.at(-1)!;
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
    return resourceNotFound();
  if (!location)
    return resourceNotFound();

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
      return forbiddenResponse();
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
    return requestConflict("This location is already linked to this project");

  try {
    return successWithMessage(
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
      })
    );
  } catch (error) {
    return unexpectedError();
  }
}) as any

export const DELETE = auth(async (req) => {
  const auth = checkAuthentication(req);
  if (!auth)
    return unauthorizedResponse();

  const requester = await prisma.user.findUnique({
    where: {
      email: auth,
    }
  });
  if (!requester)
    return unexpectedError();
  if (requester.role === 3)
    return forbiddenResponse();

  const surl = req.url.split("/");
  const projectId = surl.at(-3)!;
  const locationId = surl.at(-1)!;
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
    return resourceNotFound();
  if (!location)
    return resourceNotFound();

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
      return forbiddenResponse();
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
    return requestConflict("This location is not linked to this project");

  try {
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
    });
    return resourceDeleteSuccess();
  } catch (error) {
    return unexpectedError();
  }
}) as any
