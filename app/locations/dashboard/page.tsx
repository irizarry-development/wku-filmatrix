import { Prisma, Location } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import { paginatedQuery } from "~/lib/actions"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function LocationDatabase({ searchParams }: SearchParams) {
  const locationSearchFilter: Prisma.LocationWhereInput = {
    OR: [
      { locationName: { contains: searchParams.search, mode: "insensitive" } },
      {
        locationDescription: {
          contains: searchParams.search,
          mode: "insensitive"
        }
      },
      {
        locationAddress: { contains: searchParams.search, mode: "insensitive" }
      },
      { locationPhone: { contains: searchParams.search, mode: "insensitive" } },
      { locationEmail: { contains: searchParams.search, mode: "insensitive" } },
      {
        locationContactName: {
          contains: searchParams.search,
          mode: "insensitive"
        }
      }
    ]
  }

  const { data, remaining, parsedPage } = await paginatedQuery<Location>(
    { searchParams },
    10,
    prisma.location.findMany,
    prisma.location.count,
    locationSearchFilter
  )

  return (
    <DatabasePage
      databaseHeader="Locations"
      databaseId="locations"
      databaseFormId="location-form"
      searchValue={searchParams.search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={[
        "Name",
        "Address",
        "Description",
        "Phone",
        "Email",
        "Contact Name",
        "Keywords",
        ""
      ]}
    >
      {data.length > 0 &&
        data.map((loc, i) => (
          <TableRow
            key={i}
            type="Locations"
            singular="Location"
            id={loc.id}
            name={loc.locationName}
            fields={[
              loc.locationName,
              loc.locationAddress,
              loc.locationDescription,
              loc.locationPhone,
              loc.locationEmail,
              loc.locationContactName,
              loc.locationKeywords
            ]}
            deleteUrl="/api/v1/locations"
            renderActions
          />
        ))}
    </DatabasePage>
  )
}
