import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { BsCameraReelsFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";

export default async function LocationProjects({
    params
}: RouteParams) {

    const associatedProjects = await prisma.location.findMany(
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

    console.log(associatedProjects)

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
                associatedProjects.map(({ id, locationName }) => {
                    return (
                        <section className="associated-project" key={id}>
                            <section className="associated-project-image">

                            </section>
                            <section className="associated-project-meta">
                                <p>{locationName}</p>
                            </section>
                        </section>
                    )
                })
            }
        </DashboardContainer>
    )

}