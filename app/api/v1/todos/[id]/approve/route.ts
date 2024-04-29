import { checkAuthentication, forbiddenResponse, invalidRequestWithError, resourceNotFound, resourceUpdateSuccess, unauthorizedResponse, unexpectedError } from "~/lib/api";
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
  if (requester.role !== 1)
    return forbiddenResponse();

  const id = req.url.split("/").at(-2)!;
  const todo = await prisma.projectTodo.findUnique({
    where: {
      id
    }
  })
  if (!todo)
    return resourceNotFound();

  if (todo.complete)
    return invalidRequestWithError("Project todo already complete");

  try {
    await prisma.projectTodo.update({
      where: {
        id: todo.id
      },
      data: {
        complete: true,
        approverId: requester.id,
        approvedDT: new Date().toISOString(),
        approverName: requester.name || "Unknown"
      }
    })
    return resourceUpdateSuccess();
  } catch (error) {
    return unexpectedError();
  }
})
