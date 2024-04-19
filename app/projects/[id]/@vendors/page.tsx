import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import Drawer from "~/components/ui/Drawer";

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
        <section className="project-vendors">
            <Drawer title="Vendors">

            {
                associatedVendors.map(({ id, vendorName }) => {
                    return (
                        <p key={id}>{vendorName}</p>
                    )
                })
            }
            </Drawer>
        </section>
    )
}