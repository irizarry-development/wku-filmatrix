import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import Drawer from "~/components/ui/Drawer";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaSuitcase } from "react-icons/fa6";

export default async function ProjectVendors({
    params: { id }
}: RouteParams) {

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
            vendorName: true,
        }
    })

    return (
        <DashboardContainer
            headerText="Vendors"
            headerIcon={<FaSuitcase />}
        >
            {
                associatedVendors.map(({ id, vendorName }) => {
                    return (
                        <p key={id}>{vendorName}</p>
                    )
                })
            }
        </DashboardContainer>
    )
}