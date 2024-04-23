import { BsCameraReelsFill } from "react-icons/bs";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { FaEye, FaLink, FaLinkSlash } from "react-icons/fa6";
import Link from "next/link";

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
                associatedProjects.map(({project: { id, projectName }}) => {
                    return (
                        <section className="associated-project" key={id}>
                            <section className="associated-project-image">

                            </section>
                            <section className="associated-project-actions">
                                <Link href={`/projects/${id}`}>
                                    <FaEye className="view-project" />
                                </Link>
                                <FaLinkSlash className="unlink-project" />
                            </section>
                            <section className="associated-project-meta">
                                <p>{projectName}</p>
                            </section>
                        </section>
                    )
                })
            }
        </DashboardContainer>
    )
}