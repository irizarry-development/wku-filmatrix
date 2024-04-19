import Drawer from "~/components/ui/Drawer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"

export default async function LocationList({
    params: { id }
}: RouteParams) {

    const associatedLocations = await prisma.location.findMany({
        where: {
            projects: {
                some: {
                    id
                }
            }
        },
        select: {
            id: true,
            locationName: true,
        }
    })

    return (
        <section className="project-locations">
            <Drawer title="Locations">

            {
                associatedLocations.map(({ id, locationName }) => {
                    return (
                        <p key={id}>{locationName}</p>
                    )
                })
            }
            </Drawer>
        </section>
    )
}