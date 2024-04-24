import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import DatabasePage from "~/components/ui/database/DatabasePage"
import { SearchParams } from "~/lib/types"
import { Prisma, User } from "@prisma/client"
import { paginatedQuery } from "~/lib/actions"

export default async function PeopleDatabase({ searchParams }: SearchParams) {

  const peopleSearchFilter: Prisma.UserWhereInput = {
    OR: [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { email: { contains: searchParams.search, mode: "insensitive" } },
      { degree: { contains: searchParams.search, mode: "insensitive" } },
      { classYear: { contains: searchParams.search, mode: "insensitive" } },
      { address: { contains: searchParams.search, mode: "insensitive" } },
      { credit: { contains: searchParams.search, mode: "insensitive" } }
    ]
  }

  const { data, remaining, parsedPage } = await paginatedQuery<User>(
    { searchParams },
    10,
    prisma.user.findMany,
    prisma.user.count,
    peopleSearchFilter
  )

  return (
    <DatabasePage
      databaseHeader="People"
      databaseId="people"
      databaseFormId="people-search"
      searchValue={searchParams.search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={[
        "Name",
        "Email",
        "Degree",
        "Class Year",
        "Onboarded",
        "Address",
        "Credit",
        ""
      ]}
    >
      {data.length > 0 &&
        data.map((user, i) => (
          <TableRow
            key={i}
            type="People"
            singular="Person"
            id={user.id}
            name={user.name}
            fields={[
              user.name,
              user.email,
              user.degree,
              user.classYear,
              user.hasOnboarded ? "Yes" : "No",
              user.address,
              user.credit
            ]}
            deleteUrl="/api/v1/user"
            renderActions
          />
        ))}
    </DatabasePage>
  )
}
