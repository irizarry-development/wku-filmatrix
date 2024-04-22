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
        { phone: { contains: search, mode: "insensitive" } },
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
    <section className="database-page">
      <section className="database-page-header">
        <h1>Actors</h1>

        <Link href="/actors/add" className="database-page-add">
          <FaCirclePlus />
        </Link>

        <form
          id="actor-search-form"
          className="form database-search-form"
          action={`/actors/dashboard`}
          method="GET"
        >
          <TextInput
            id="search"
            type="search"
            placeholder="Search actors..."
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/actors/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            {parsedPage > 1 ? (
              <Link
                href={`/actors/dashboard?${queryString.stringify({ search, pageNumber: parsedPage - 1 })}`}
                className="pagination-button"
              >
                <FaArrowLeftLong />
              </Link>
            ) : (
              <Link href="#" className="pagination-button disabled">
                <FaArrowLeftLong />
              </Link>
            )}
            {remaining > 0 ? (
              <Link
                href={`/actors/dashboard?${queryString.stringify({ search, pageNumber: remaining > 0 ? parsedPage + 1 : 1 })}`}
                className="pagination-button"
              >
                <FaArrowRightLong />
              </Link>
            ) : (
              <Link href="#" className="pagination-button disabled">
                <FaArrowRightLong />
              </Link>
            )}
          </section>
        </form>
      </section>
      <section className="database-content">
        <Table
          title="Actors"
          headers={[
            "Name",
            "Email",
            "Phone",
          ]}
        >
          {actorData.length > 0 &&
            actorData.map((loc, i) => (
              <TableRow
                key={i}
                type="Actors"
                singular="Actor"
                id={loc.id}
                name={loc.name}
                fields={[
                  loc.name,
                  loc.email,
                  loc.phone,
                ]}
                deleteUrl="/api/v1/actors"
              />
            ))}
        </Table>
      </section>
    </section>
  )
}
