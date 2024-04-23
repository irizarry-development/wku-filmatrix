import { BsCameraReelsFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";

export default async function VendorProjects({
    params
}: RouteParams) {

    const associatedProjects = await prisma.vendor.findMany(
        {
            where: {
                projects: {
                    some: {
                        id: params.id
                    }
                }
            }
        }
    )

    return (
        <DashboardContainer
            headerText="Projects"
            headerIcon={<BsCameraReelsFill />}
            additionalClasses="vendor-projects"
            button={
                <FaLink />
            }
        >   
            {
                associatedProjects.map(({ id, vendorName }) => {
                    return (
                        <section className="associated-project" key={id}>
                            <section className="associated-project-image">

                            </section>
                            <section className="associated-project-meta">
                                <p>{vendorName}</p>
                            </section>
                        </section>
                    )
                })
            }
        </DashboardContainer>
    )
}