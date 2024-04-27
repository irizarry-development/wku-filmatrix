"use client"

import { Vendor } from "@prisma/client"
import { Fragment, useState } from "react"
import Form from "../form/Form"
import TextInput from "../form/Input"
import { searchVendors } from "~/lib/actions"
import toast from "react-hot-toast"
import Table from "../table/Table"
import TableRow from "../table/TableRow"

export default function VendorLinkComponent() {
  const [searchResults, setSearchResults] = useState<Vendor[]>([])

  async function handleSubmit(formData: FormData) {
    try {
        // @ts-ignore
        const foundVendors = await searchVendors(formData)

        if (foundVendors) {
          setSearchResults(foundVendors)
        }
    } catch (error: any) {
        toast.error(error.message)
    }
  }

  return (
    <Fragment>
      <Form action={handleSubmit} formId="vendor-link-form">
        <TextInput label="Search for a vendor" id="searchQuery" type="text" />
      </Form>
      <Table
        title="Vendors"
        headers={[
            "Vendor Name",
            "Description",
            "Address",
            "Phone",
            "Email",
            "Contact Name"
        ]}
      >
        {searchResults.map((vendor) => (
            <TableRow 
                key={vendor.id}
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
    </Fragment>
  )
}
