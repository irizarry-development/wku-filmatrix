"use server"

import { AuthError } from "next-auth"
import { signIn } from "~/lib/auth"
import prisma from "~/lib/prisma"

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return "We were unable to sign you in. Please contact ITS for assistance with NetID. (270) 745-7000"
    }

    throw error
  }
}

export async function unlinkVendor(formData: FormData) {
  const projectId = formData.get("projectId")
  const vendorId = formData.get("vendorId")

  if (!vendorId) {
    return
  }

  await prisma.vendor.update({
    where: {
      id: vendorId as string
    },
    data: {
      projects: {
        disconnect: {
          id: projectId as string
        }
      }
    }
  })
}

export async function unlinkLocation(formData: FormData) {
  const projectId = formData.get("projectId")
  const locationId = formData.get("locationId")

  if (!locationId) {
    return
  }

  await prisma.location.update({
    where: {
      id: locationId as string
    },
    data: {
      projects: {
        disconnect: {
          id: projectId as string
        }
      }
    }
  })
}

export async function deleteCrew(formData: FormData) {
  const projectId = formData.get("projectId")
  const userId = formData.get("userId")

  if (!userId) {
    return
  }

  await prisma.crew.delete({
    where: {
      userId_projectId: {
        projectId: projectId as string,
        userId: userId as string
      }
    }
  })
}

export async function deleteCast(formData: FormData) {
  const projectId = formData.get("projectId")
  const actorId = formData.get("actorId")

  if (!actorId) {
    return
  }

  await prisma.cast.delete({
    where: {
      actorId_projectId: {
        projectId: projectId as string,
        actorId: actorId as string
      }
    }
  })
}

export async function deleteFestival(formData: FormData) {
  const festivalId = formData.get("festivalId")

  if (!festivalId) {
    return
  }

  await prisma.festival.delete({
    where: {
      id: festivalId as string
    }
  })
}
