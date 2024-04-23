import { BsCameraReelsFill } from "react-icons/bs";
import { FaEye, FaLink, FaLinkSlash } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { Project } from "@prisma/client";
import DashboardContainerCard from "~/components/ui/DashboardContainerCard";

export default async function VendorProjects({
    params
}: RouteParams) {

    const associatedProjects = await prisma.vendor.findFirst(
        {
            where: {
                id: params.id
            },
            select: {
                projects: true
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

                associatedProjects ? 
                associatedProjects.projects.map((project: Project) => (
                    <DashboardContainerCard
                        id={project.id}
                        key={project.id}
                    >
                        <p>{project.projectName}</p>
                    </DashboardContainerCard>
                ))

                : 

                <p>No projects associated with this vendor</p>
            }
        </DashboardContainer>
    )
}