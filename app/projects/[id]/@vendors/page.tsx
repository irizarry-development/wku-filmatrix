import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import Drawer from "~/components/ui/Drawer";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaEye, FaLinkSlash, FaSuitcase } from "react-icons/fa6";
import Link from "next/link";
import { FaUnlink } from "react-icons/fa";
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
            additionalClasses="project-vendors-container"
            button={
                <Button
                    color="secondary"
                    content="Link Vendor"
                />
            }
        >
            {
                associatedVendors.map(({ id, vendorName }) => {
                    return (
                        <section className="vendor-information" key={id}>

                            <p key={id}>{vendorName}</p>
                            <section className="vendor-buttons">
                                <Link
                                href={`/vendors/${id}`}>
                                    <FaEye />
                                </Link>
                                <FaLinkSlash className="unlink-vendor" />  
                            </section>
                        </section>
                    )
                })
            }
        </DashboardContainer>
    )
}