import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";

export default function LocationSkeleton() {
    return (
        <DashboardContainer
            headerText="Locations"
            headerIcon={<FaMapMarkerAlt />}
            additionalClasses="project-locations-container"
            button={
                <FaLink />
            }
        >
            <p>Loading locations...</p>
        </DashboardContainer>
    )
}