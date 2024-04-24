import { Prisma } from "@prisma/client"
import Link from "next/link"
import queryString from "query-string"
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaArrowRotateLeft,
  FaCirclePlus,
  FaMagnifyingGlass
} from "react-icons/fa6"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TextInput from "~/components/ui/form/Input"
import Table from "~/components/ui/table/Table"
import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"

interface ActorProps {
  searchParams: {
    search?: string
    pageNumber?: string
  }
}

export default async function ActorDatabase({
  searchParams: { search, pageNumber }
}: ActorProps) {
  let parsedPage = parseInt(pageNumber || "")
  if (Number.isNaN(parsedPage)) parsedPage = 1
  const perPage = 10
  let actorData = null
  let totalActors = 0

  if (!search) {
    actorData = await prisma.actor.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalActors = await prisma.actor.count()
  } else {
    const searchFilter: Prisma.ActorWhereInput = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } }
      ]
    }
    actorData = await prisma.actor.findMany({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalActors = await prisma.actor.count({ where: searchFilter })
  }

  const remaining = totalActors - parsedPage * perPage

  return (
    <DatabasePage
      databaseHeader="Actors"
      databaseId="actors"
      databaseFormId="actor-search-form"
      searchValue={search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={["Name", "Email", "Phone", ""]}
    >
      {actorData.length > 0 &&
        actorData.map((loc, i) => (
          <TableRow
            key={i}
            type="Actors"
            singular="Actor"
            id={loc.id}
            name={loc.name}
            fields={[loc.name, loc.email, loc.phone]}
            deleteUrl="/api/v1/actors"
            renderActions
          />
        ))}
    </DatabasePage>
  )
}