import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";

export default function MediaSkeleton() {
    return (
        <DashboardContainer
            headerText="Media"
            headerIcon={<FaMapMarkerAlt />}
            additionalClasses="project-media-container"
            button={
                <FaLink />
            }
        >
            <p>Loading media...</p>
        </DashboardContainer>
    )
}