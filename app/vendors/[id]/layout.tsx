import { ReactNode } from "react"
import DashboardLayout from "~/components/ui/dashboard/DashboardLayout"
import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import { notFound } from "next/navigation"

interface VendorLayoutProps {
    projects: ReactNode
    details: ReactNode
}

export default async function VendorLayout({
    params,
    projects,
    details
}: VendorLayoutProps & RouteParams) {

    const foundVendor = await prisma.vendor.findFirst(
        {
            where: {
                id: params.id
            }
        }
    )

    if (!foundVendor) {
        return notFound()
    }

    return (
        <DashboardLayout
            jumbotronImage="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
            jumbotronTitle={foundVendor.vendorName}
            dashboardId="vendors"
            dashboardName={`Vendor Dashboard for ${foundVendor.vendorName}`}
            dashboardClass="vendor-view"
        >
            {details}
            {projects}
        </DashboardLayout>
    )
}