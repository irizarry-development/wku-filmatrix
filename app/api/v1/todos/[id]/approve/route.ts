import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json({
      status: 401,
      error: "Unauthorized"
    })
  }

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    }
  })
  if (!requester) {
    return NextResponse.json({ error: "impossible..." }, { status: 500 })
  }

  // in future return error if user is not a part of said project
  // throw error if requester is a graduated student
  if (requester.role === 3) {
    return new Response(
      JSON.stringify({
        status: 400,
        error: "Graduated students may only view content."
      })
    )
  }

  // get project todo id from url
  let id
  try {
    id = req.url.split("/").at(-2)
    if (!id) throw "shouldnt happen"
  } catch (error) {
    return NextResponse.json({ error: "impossible..." }, { status: 500 })
  }

  // find project todo
  const todo = await prisma.projectTodo.findUnique({
    where: {
      id
    }
  })
  // if project todo does not exist, return error
  if (!todo) {
    return NextResponse.json(
      { error: "Project todo not found" },
      { status: 404 }
    )
  }

  // if project todo is already complete, return error
  if (todo.complete) {
    return NextResponse.json(
      { error: "Project todo already complete" },
      { status: 400 }
    )
  }

  // set todo as complete and approver as requester
  try {
    console.log(new Date().toISOString())
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
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error while approving project todo" },
      { status: 500 }
    )
  }
})
