import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer"
import { FaLink, FaSuitcase } from "react-icons/fa6"
import VendorComponent from "~/components/ui/VendorComponent"

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
    >
      {associatedVendors.map((vendor) => (
        <VendorComponent key={vendor.id} {...vendor} projectId={id} />
      ))}
    </DashboardContainer>
  )
}
