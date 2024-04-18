import { auth } from "~/lib/auth"
import { createProjectSchema } from "~/lib/z"
import prisma from "~/lib/prisma"
import { NextResponse } from "next/server"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const id = req.url.split("/").pop()

  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })

  if (!project) {
    return NextResponse.json("Project not found", { status: 404 })
  }

  return NextResponse.json({ project }, { status: 200 })
}) as any

export const PATCH = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    }
  })
  if (!requester) {
    return NextResponse.json("impossible...", { status: 500 })
  }

  // throw error if requester is a graduated student
  if (requester.role === 3) {
    return NextResponse.json("Graduated students may only view content", {
      status: 400
    })
  }

  // throw error if requester is not admin
  if (requester.role !== 1) {
    return NextResponse.json("You cannot edit projects.", { status: 400 })
  }

  const id = req.url.split("/").pop()
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })

  if (!project) {
    return NextResponse.json({}, { status: 404 })
  }

  const body = await req.json()
  const parsedBody = createProjectSchema.parse(body)

  // if project with given name or production number already exists, throw error
  const existing = await prisma.project.findFirst({
    where: {
      OR: [
        { projectName: parsedBody.projectName },
        { projectProductionNumber: parsedBody.projectProductionNumber }
      ]
    }
  })
  if (existing) {
    return NextResponse.json(
      `Project with name \'${parsedBody.projectName}\' OR production number \'${parsedBody.projectProductionNumber}\' already exists`,
      { status: 409 }
    )
  }

  try {
    await prisma.project.update({
      where: {
        id
      },
      data: parsedBody
    })

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json("Unexpected error updating project", {
      status: 500
    })
  }
}) as any

export const DELETE = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  // get requester and validate
  const requester = await prisma.user.findUnique({
    where: {
      email: req.auth.user.email
    }
  })
  if (!requester) {
    return NextResponse.json("impossible...", { status: 500 })
  }

  // throw error if requester is a graduated student
  if (requester.role === 3) {
    return NextResponse.json("Graduated students may only view content", {
      status: 400
    })
  }

  // throw error if requester is not admin
  if (requester.role !== 1) {
    return NextResponse.json("You cannot delete projects", { status: 400 })
  }

  // get project id from url
  const id = req.url.split("/").pop()!
  // find project
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })

  // if project does not exist, return error
  if (!project) {
    return NextResponse.json("Project not found", { status: 404 })
  }

  // delete project
  const deleted = await prisma.project.delete({
    where: {
      id
    }
  })

  // return error if project was not deleted
  if (!deleted) {
    return NextResponse.json(`Unexpected error while deleting project ${id}`, {
      status: 500
    })
  }

  return NextResponse.json({}, { status: 200 })
}) as any
