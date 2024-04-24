import { BsCameraReelsFill } from "react-icons/bs";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { FaLink } from "react-icons/fa6";
import DashboardContainerCard from "~/components/ui/dashboard/DashboardContainerCard";

export default async function ProfileProjects({
    params: { id }
}: RouteParams) {

    const associatedProjects = await prisma.crew.findMany({
        where: {
            userId: id
        },
        select: {
            project: true
        }
    })

    return (
        <DashboardContainer
            headerText="Projects"
            headerIcon={<BsCameraReelsFill />}
            additionalClasses="person-projects"
            button={
                <FaLink />
            }
        >
            {
                associatedProjects.map(({ project: { id, projectName } }) => (
                    <DashboardContainerCard
                        id={id}
                        key={id}
                    >
                        <p>{projectName}</p>
                    </DashboardContainerCard>
                ))
            }
        </DashboardContainer>
    )
}