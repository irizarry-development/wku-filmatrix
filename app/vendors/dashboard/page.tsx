import { Prisma } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function VendorDatabase({
  searchParams: { search, pageNumber }
}: SearchParams) {
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
    <DatabasePage
      databaseHeader="Vendors"
      databaseId="vendors"
      databaseFormId="vendor-search-form"
      searchValue={search || ""}
      parsedPage={parsedPage}
      remaining={remaining}
      databaseTableHeaders={[
        "Name",
        "Description",
        "Address",
        "Phone",
        "Email",
        "Contact Name",
        ""
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
            renderActions
          />
        ))}
    </DatabasePage>
  )
}
