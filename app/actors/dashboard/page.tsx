import { Actor, Prisma } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import { paginatedQuery } from "~/lib/actions"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function ActorDatabase({
  searchParams: { search, pageNumber }
}: SearchParams) {
  const actorSearchFilter: Prisma.ActorWhereInput = {
    OR: [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } }
    ]
  }

  const { data, remaining, parsedPage } = await paginatedQuery<Actor>(
    { searchParams: { search, pageNumber } },
    10,
    prisma.actor.findMany,
    prisma.actor.count,
    actorSearchFilter
  )

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
      {data.length > 0 &&
        data.map((actor, i) => (
          <TableRow
            key={i}
            type="Actors"
            singular="Actor"
            id={actor.id}
            name={actor.name}
            fields={[actor.name, actor.email, actor.phone]}
            deleteUrl="/api/v1/actors"
            renderActions
          />
        ))}
    </DatabasePage>
  )
}
