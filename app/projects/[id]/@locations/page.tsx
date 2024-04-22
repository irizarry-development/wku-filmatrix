import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { FaLinkSlash } from "react-icons/fa6";
import Button from "~/components/ui/Button";

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
        <DashboardContainer
            headerText="Locations"
            headerIcon={<FaMapMarkerAlt />}
            additionalClasses="project-locations-container"
            button={
                <Button
                    color="secondary"
                    content="Link Location"
                />
            }
        >
            {
                associatedLocations.map(({ id, locationName }) => {
                    return (
                        <section className="location-information">
                            <p key={id}>{locationName}</p>
                            <section className="location-buttons">
                                <Link href={`/locations/${id}`}>
                                    <FaEye />
                                </Link>
                                <FaLinkSlash className="unlink-location" />
                            </section>
                        </section>
                    )
                })
            }
        </DashboardContainer>
    )
}