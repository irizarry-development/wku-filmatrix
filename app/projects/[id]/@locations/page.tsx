import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import LocationComponent from "~/components/ui/locations/LocationComponent";

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
                associatedLocations.map((location) => <LocationComponent key={location.id} {...location} projectId={id} /> )
            }
        </DashboardContainer>
    )
}