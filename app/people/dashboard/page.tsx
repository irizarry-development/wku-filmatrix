import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import { Prisma } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import { SearchParams } from "~/lib/types"

export default async function PeopleDatabase({
  searchParams: { search, pageNumber }
}: SearchParams) {
  
  let parsedPage = parseInt(pageNumber || "")
  if (Number.isNaN(parsedPage)) parsedPage = 1
  const perPage = 10
  let peopleData = null
  let totalPeople = 0

  if (!search) {
    peopleData = await prisma.user.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalPeople = await prisma.user.count()
  } else {
    const searchFilter: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { degree: { contains: search, mode: "insensitive" } },
        { classYear: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { credit: { contains: search, mode: "insensitive" } }
      ]
    }
    peopleData = await prisma.user.findMany({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalPeople = await prisma.user.count({ where: searchFilter })
  }

  const remaining = totalPeople - parsedPage * perPage

  peopleData.forEach((user) => {
    // @ts-ignore
    delete user["saltedPassword"]
  })

  return (
    <DatabasePage
      databaseHeader="People"
      databaseId="people"
      databaseFormId="people-search"
      searchValue={search || ""}
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
      {peopleData.length > 0 &&
            peopleData.map((user, i) => (
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
