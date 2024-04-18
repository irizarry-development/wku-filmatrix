import Link from "next/link"
import {
  FaCirclePlus,
  FaMagnifyingGlass,
  FaArrowRotateLeft,
  FaArrowLeftLong,
  FaArrowRightLong
} from "react-icons/fa6"
import TextInput from "~/components/ui/form/Input"
import Table from "~/components/ui/table/Table"
import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import queryString from "query-string"
import { Prisma } from "@prisma/client"

interface PeopleDatabaseProps {
  searchParams: {
    search?: string
    pageNumber?: string
  }
}

export default async function PeopleDatabase({
  searchParams: { search, pageNumber }
}: PeopleDatabaseProps) {
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
    <section className="database-page">
      <section className="database-page-header">
        <h1>People</h1>
        <Link href="/people/add" className="database-page-add">
          <FaCirclePlus />
        </Link>
        <form
          id="people-search-form"
          className="database-search-form"
          action={`/people/dashboard`}
          method="GET"
        >
          <TextInput
            id="search"
            type="search"
            placeholder="Search people..."
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/people/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            {parsedPage > 1 ? (
              <Link
                href={`/people/dashboard?${queryString.stringify({ search, pageNumber: parsedPage - 1 })}`}
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
                href={`/people/dashboard?${queryString.stringify({ search, pageNumber: remaining > 0 ? parsedPage + 1 : 1 })}`}
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
          title="People"
          headers={[
            "Name",
            "Email",
            "Degree",
            "Class Year",
            "Onboarded",
            "Address",
            "Credit"
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
              />
            ))}
        </Table>
      </section>
    </section>
  )
}
