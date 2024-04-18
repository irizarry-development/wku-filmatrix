import { NextResponse } from "next/server"
import { auth } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { createVendorSchema } from "~/lib/z"

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user || !req.auth.user.email) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const id = req.url.split("/").pop()

  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  })

  if (!vendor) {
    return NextResponse.json("Vendor not found", { status: 404 })
  }

  return NextResponse.json({ vendor }, { status: 200 })
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
    return NextResponse.json("You cannot edit vendors.", { status: 400 })
  }

  const id = req.url.split("/").pop()
  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  })

  if (!vendor) {
    return NextResponse.json({}, { status: 404 })
  }

  const body = await req.json()
  const parsedBody = createVendorSchema.parse(body)

  // if vendor with given name already exists, throw error
  const existing = await prisma.vendor.findUnique({
    where: {
      vendorName: parsedBody.vendorName
    }
  })
  if (existing) {
    return NextResponse.json(
      `Vendor with name \'${parsedBody.vendorName}\' already exists`,
      { status: 409 }
    )
  }

  try {
    await prisma.vendor.update({
      where: {
        id
      },
      data: { ...parsedBody }
    })

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json("Unexpected error updating vendor", {
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
    return NextResponse.json("You cannot delete vendors", { status: 400 })
  }

  // get vendor id from url
  const id = req.url.split("/").pop()!

  // find vendor
  const vendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  })

  // if vendor does not exist, return error
  if (!vendor) {
    return NextResponse.json("Vendor not found", { status: 404 })
  }

  // delete vendor
  const deleted = await prisma.vendor.delete({
    where: {
      id
    }
  })

  // return error if vendor was not deleted
  if (!deleted) {
    return NextResponse.json(`Unexpected error while deleting vendor ${id}`, {
      status: 500
    })
  }
  return NextResponse.json({}, { status: 200 })
}) as any
