import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createUserSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  // get user and validate
  const id = req.url.split("/").pop()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (!user) {
    return NextResponse.json("Person not found", { status: 404 })
  }

  return NextResponse.json({ user }, { status: 200 })
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

  // get user to be edited and validate
  const id = req.url.split("/").pop()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (!user) {
    return NextResponse.json("Person not found", { status: 404 })
  }

  // throw error if user to be edited is not requester and requester is not admin
  if (user.email !== requester.email && requester.role !== 1) {
    return NextResponse.json("You cannot edit people other than yourself", {
      status: 400
    })
  }

  const body = await req.json()
  const parsedBody = createUserSchema.parse(body)

  // if person with given email already exists, throw error
  const existing = await prisma.user.findUnique({
    where: {
      email: parsedBody.email
    }
  })
  if (existing) {
    return NextResponse.json(
      `Person with email \'${parsedBody.email}\' already exists`,
      { status: 409 }
    )
  }

  try {
    await prisma.user.update({
      where: {
        id
      },
      data: parsedBody
    })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json("Unexpected error updating user", {
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

  // throw error if requester is not admin
  if (requester.role !== 1) {
    return NextResponse.json("You cannot delete people", { status: 400 })
  }

  // get user and validate
  const id = req.url.split("/").pop()
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  if (!user) {
    return NextResponse.json("User not found", { status: 404 })
  }

  // if user is trying to delete themselves, return error
  if (user.email === req.auth.user.email) {
    return NextResponse.json("You cannot delete yourself", { status: 400 })
  }

  // delete user
  const deleted = await prisma.user.delete({
    where: {
      id
    }
  })
  // return error if user was not deleted
  if (!deleted) {
    return NextResponse.json(`Unexpected error while deleting user ${id}`, {
      status: 500
    })
  }

  return NextResponse.json({}, { status: 200 })
}) as any
