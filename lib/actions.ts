"use server"

import { signIn } from "~/lib/auth"
import prisma from "~/lib/prisma"
import { SearchParams } from "./types"
import { Prisma } from "@prisma/client"

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    return "We were unable to sign you in. Please contact ITS for assistance with NetID. (270) 745-7000"
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

export async function searchVendors(query: string) {

  if (!query) {
    throw new Error("Search query is required")
  } else if (query.length < 3) {
    throw new Error("Search query must be at least 3 characters")
  }

  return await prisma.vendor.findMany({
    where: {
      OR: [
        { vendorName: { contains: query as string, mode: "insensitive" } },
        { vendorDescription: { contains: query as string, mode: "insensitive" } },
        { vendorAddress: { contains: query as string, mode: "insensitive" } },
        { vendorPhone: { contains: query as string, mode: "insensitive" } },
        { vendorEmail: { contains: query as string, mode: "insensitive" } },
        { vendorContactName: { contains: query as string, mode: "insensitive" } }
      ]
    },
    select: {
      vendorName: true,
      id: true
    }
  })
}

export async function searchLocations(query: string) {
  
    if (!query) {
      throw new Error("Search query is required")
    } else if (query.length < 3) {
      throw new Error("Search query must be at least 3 characters")
    }
  
    return await prisma.location.findMany({
      where: {
        OR: [
          { locationName: { contains: query as string, mode: "insensitive" } },
          { locationDescription: { contains: query as string, mode: "insensitive" } },
          { locationAddress: { contains: query as string, mode: "insensitive" } },
          { locationPhone: { contains: query as string, mode: "insensitive" } },
          { locationEmail: { contains: query as string, mode: "insensitive" } }
        ]
      },
      select: {
        locationName: true,
        id: true
      }
    })
  
}

type SearchFilters =
  | Prisma.UserWhereInput
  | Prisma.ActorWhereInput
  | Prisma.VendorWhereInput
  | Prisma.LocationWhereInput
  | Prisma.ProjectWhereInput

export async function paginatedQuery<T>(
  { searchParams }: SearchParams,
  perPage: number,
  searchHandler: any,
  countHandler: any,
  searchFilter: SearchFilters
) {
  let parsedPage = parseInt(searchParams.pageNumber || "")

  if (Number.isNaN(parsedPage)) {
    parsedPage = 1
  }

  let data: T[] = []
  let totalData = 0

  if (!searchParams.search) {
    data = await searchHandler({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })

    totalData = await countHandler()
  } else {
    data = await searchHandler({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })

    totalData = await countHandler({
      where: searchFilter
    })
  }

  const remaining = totalData - parsedPage * perPage

  return { data, remaining, parsedPage }
}