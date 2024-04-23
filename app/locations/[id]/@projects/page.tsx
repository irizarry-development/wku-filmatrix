import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { BsCameraReelsFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import DashboardContainerCard from "~/components/ui/DashboardContainerCard";

export default async function LocationProjects({
    params
}: RouteParams) {

    const associatedProjects = await prisma.location.findFirst(
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
            additionalClasses="locations-projects"
            button={
                <FaLink />
            }
        >
            {
                associatedProjects ? 

                associatedProjects.projects.map((project) => (
                    <DashboardContainerCard
                        id={project.id}
                        key={project.id}
                    >
                        <p>{project.projectName}</p>
                    </DashboardContainerCard>
                ))

                :

                <p>No projects associated with this location</p>

            }
        </DashboardContainer>
    )

}