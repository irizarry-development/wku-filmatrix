import { RouteParams, TruncatedVendor } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"
import { FaLink, FaSuitcase } from "react-icons/fa6"
import VendorComponent from "~/components/ui/vendor/VendorComponent"
import LinkComponent from "~/components/ui/dashboard/LinkComponent"
import { Vendor } from "@prisma/client"
import { searchVendors } from "~/lib/actions"

export default async function ProjectVendors({ params: { id } }: RouteParams) {
    
  const associatedVendors = await prisma.vendor.findMany({
    where: {
      projects: {
        some: {
          id
        }
      }
    },
    select: {
      id: true,
      vendorName: true
    }
  })

  return (
    <DashboardContainer
      headerText="Vendors"
      headerIcon={<FaSuitcase />}
      additionalClasses="project-vendors-container"
      button={<FaLink />}
      modalContent={
        <LinkComponent<TruncatedVendor>
          searchHandler={searchVendors}
          formId="vendor-link-form"
          searchPlaceholder="Search for a vendor"
          tableTitle="Vendors"
          tableHeaders={[
            "Vendor Name",
            "Description",
            "Address",
            "Phone",
            "Email",
            "Contact Name"
          ]}
        />
      }
    >
      {associatedVendors.map((vendor) => (
        <VendorComponent key={vendor.id} {...vendor} projectId={id} />
      ))}
    </DashboardContainer>
  )
}
