import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import Drawer from "~/components/ui/Drawer";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaSuitcase } from "react-icons/fa6";
import Button from "~/components/ui/Button";

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
            button={
                <Button 
                    content="Link Vendors"
                    color="secondary"
                />
            }
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