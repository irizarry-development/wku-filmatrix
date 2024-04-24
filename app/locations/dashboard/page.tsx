import { Prisma } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function LocationDatabase({
  searchParams: { search, pageNumber }
}: SearchParams) {
  let parsedPage = parseInt(pageNumber || "")
  if (Number.isNaN(parsedPage)) parsedPage = 1
  const perPage = 10
  let locationData = null
  let totalLocations = 0

  if (!search) {
    locationData = await prisma.location.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalLocations = await prisma.location.count()
  } else {
    const searchFilter: Prisma.LocationWhereInput = {
      OR: [
        { locationName: { contains: search, mode: "insensitive" } },
        {
          locationDescription: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    }
    locationData = await prisma.location.findMany({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalLocations = await prisma.location.count({ where: searchFilter })
  }

  const remaining = totalLocations - parsedPage * perPage

  return (
    <DatabasePage
      databaseHeader="Locations"
      databaseId="locations"
      databaseFormId="location-form"
      searchValue={search || ""}
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
      {locationData.length > 0 &&
            locationData.map((loc, i) => (
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