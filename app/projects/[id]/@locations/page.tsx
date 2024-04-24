import Drawer from "~/components/ui/Drawer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaEye, FaMapMarkerAlt } from "react-icons/fa";
import Button from "~/components/ui/Button";
import Link from "next/link";
import { FaLink, FaLinkSlash } from "react-icons/fa6";
;

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
                <FaLink />
            }
        >
            {
                associatedLocations.map(({ id, locationName }) => {
                    return (
                        <section className="location-information" key={id}>
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