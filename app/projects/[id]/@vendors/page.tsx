import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer"
import { FaLink, FaSuitcase } from "react-icons/fa6"
import VendorComponent from "~/components/ui/VendorComponent"
import VendorEditComponent from "~/components/ui/VendorEditComponent"

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
        <VendorEditComponent />
      }
    >
      {associatedVendors.map((vendor) => (
        <VendorComponent key={vendor.id} {...vendor} projectId={id} />
      ))}
    </DashboardContainer>
  )
}
