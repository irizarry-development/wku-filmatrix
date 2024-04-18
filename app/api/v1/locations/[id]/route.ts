import { auth } from "~/lib/auth"
import { createLocationSchema } from "~/lib/z"
import prisma from "~/lib/prisma"
import { NextResponse } from "next/server"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const id = req.url.split("/").pop()

  const location = await prisma.location.findUnique({
    where: {
      id
    }
  })

  if (!location) {
    return NextResponse.json("Location not found", { status: 404 })
  }

  return NextResponse.json({ location }, { status: 200 })
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
    return NextResponse.json("You cannot edit locations.", { status: 400 })
  }

  const id = req.url.split("/").pop()
  const location = await prisma.location.findUnique({
    where: {
      id
    }
  })

  if (!location) {
    return NextResponse.json({}, { status: 404 })
  }

  const body = await req.json()
  const parsedBody = createLocationSchema.parse(body)

  // if location with given name already exists, throw error
  const existing = await prisma.location.findUnique({
    where: {
      locationName: parsedBody.locationName
    }
  })
  if (existing) {
    return NextResponse.json(
      `Location with name \'${parsedBody.locationName}\' already exists`,
      { status: 409 }
    )
  }

  try {
    await prisma.location.update({
      where: {
        id
      },
      data: parsedBody
    })

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json("Unexpected error updating location", {
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
    return NextResponse.json("You cannot delete locations", { status: 400 })
  }

  // get location id from url
  const id = req.url.split("/").pop()!
  // find location
  const loc = await prisma.location.findUnique({
    where: {
      id
    }
  })

  // if location does not exist, return error
  if (!loc) {
    return NextResponse.json("Location not found", { status: 404 })
  }

  // delete location
  const deleted = await prisma.location.delete({
    where: {
      id
    }
  })

  // return error if location was not deleted
  if (!deleted) {
    return NextResponse.json(`Unexpected error while deleting location ${id}`, {
      status: 500
    })
  }

  return NextResponse.json({}, { status: 200 })
}) as any
