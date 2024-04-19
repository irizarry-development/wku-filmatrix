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

interface LocationDatabaseProps {
  searchParams: {
    search?: string
    pageNumber?: string
  }
}

export default async function LocationDatabase({
  searchParams: { search, pageNumber }
}: LocationDatabaseProps) {
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
    <section className="database-page">
      <section className="database-page-header">
        <h1>Locations</h1>

        <Link href="/locations/add" className="database-page-add">
          <FaCirclePlus />
        </Link>

        <form
          id="location-search-form"
          className="form database-search-form"
          action={`/locations/dashboard`}
          method="GET"
        >
          <TextInput
            id="search"
            type="search"
            placeholder="Search locations..."
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/locations/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            {parsedPage > 1 ? (
              <Link
                href={`/locations/dashboard?${queryString.stringify({ search, pageNumber: parsedPage - 1 })}`}
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
                href={`/locations/dashboard?${queryString.stringify({ search, pageNumber: remaining > 0 ? parsedPage + 1 : 1 })}`}
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
          title="Locations"
          headers={[
            "Name",
            "Address",
            "Description",
            "Phone",
            "Email",
            "Contact",
            "Keywords"
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
              />
            ))}
        </Table>
      </section>
    </section>
  )
}
