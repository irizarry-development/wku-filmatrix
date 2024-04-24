import { Prisma, Vendor } from "@prisma/client"
import DatabasePage from "~/components/ui/database/DatabasePage"
import TableRow from "~/components/ui/table/TableRow"
import { paginatedQuery } from "~/lib/actions"
import prisma from "~/lib/prisma"
import { SearchParams } from "~/lib/types"

export default async function VendorDatabase({
  searchParams
}: SearchParams) {

  const vendorSearchFilter: Prisma.VendorWhereInput = {
    OR: [
      { vendorName: { contains: searchParams.search, mode: "insensitive" } },
      { vendorDescription: { contains: searchParams.search, mode: "insensitive" } },
      { vendorAddress: { contains: searchParams.search, mode: "insensitive" } },
      { vendorPhone: { contains: searchParams.search, mode: "insensitive" } },
      { vendorEmail: { contains: searchParams.search, mode: "insensitive" } },
      { vendorContactName: { contains: searchParams.search, mode: "insensitive" } }
    ]
  }

  const { data: vendorData, remaining, parsedPage } = await paginatedQuery<Vendor>(
    { searchParams },
    10,
    prisma.vendor.findMany,
    prisma.vendor.count,
    vendorSearchFilter
  )

  return (
    <DatabasePage
      databaseHeader="Vendors"
      databaseId="vendors"
      databaseFormId="vendor-search-form"
      searchValue={searchParams.search || ""}
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
