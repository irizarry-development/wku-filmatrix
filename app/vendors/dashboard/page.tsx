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

interface VendorDatabaseProps {
  searchParams: {
    search?: string
    pageNumber?: string
  }
}

export default async function VendorDatabase({
  searchParams: { search, pageNumber }
}: VendorDatabaseProps) {
  let parsedPage = parseInt(pageNumber || "")
  if (Number.isNaN(parsedPage)) parsedPage = 1
  const perPage = 10
  let vendorData = null
  let totalVendors = 0

  if (!search) {
    vendorData = await prisma.vendor.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalVendors = await prisma.vendor.count()
  } else {
    const searchFilter: Prisma.VendorWhereInput = {
      OR: [
        { vendorName: { contains: search, mode: "insensitive" } },
        {
          vendorDescription: { contains: search, mode: "insensitive" }
        },
        { vendorAddress: { contains: search, mode: "insensitive" } },
        { vendorPhone: { contains: search, mode: "insensitive" } },
        { vendorEmail: { contains: search, mode: "insensitive" } },
        { vendorContactName: { contains: search, mode: "insensitive" } }
      ]
    }
    vendorData = await prisma.vendor.findMany({
      where: searchFilter,
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
    totalVendors = await prisma.vendor.count({ where: searchFilter })
  }

  const remaining = totalVendors - parsedPage * perPage

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Vendors</h1>
        <Link href="/vendors/add" className="database-page-add">
          <FaCirclePlus />
        </Link>
        <form
          id="vendor-search-form"
          className="form database-search-form"
          action={`/vendors/dashboard`}
          method="GET"
        >
          <TextInput
            id="search"
            type="search"
            placeholder="Search vendors..."
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/vendors/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            {parsedPage > 1 ? (
              <Link
                href={`/vendors/dashboard?${queryString.stringify({ search, pageNumber: parsedPage - 1 })}`}
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
                href={`/vendors/dashboard?${queryString.stringify({ search, pageNumber: remaining > 0 ? parsedPage + 1 : 1 })}`}
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
          title="Vendors"
          headers={[
            "Name",
            "Description",
            "Address",
            "Phone",
            "Email",
            "Contact"
          ]}
        >
          {vendorData.length > 0 &&
            vendorData.map((vendor, i) => (
              <TableRow
                key={i}
                type="Vendors"
                singular="Vendor"
                id={vendor.id}
                name={vendor.vendorName}
                fields={[
                  vendor.vendorName,
                  vendor.vendorDescription,
                  vendor.vendorAddress,
                  vendor.vendorPhone,
                  vendor.vendorEmail,
                  vendor.vendorContactName
                ]}
                deleteUrl="/api/v1/vendors"
              />
            ))}
        </Table>
      </section>
    </section>
  )
}
