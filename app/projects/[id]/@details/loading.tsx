import { BsCameraReelsFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";

export default function DetailsSkeleton() {
    return (
        <DashboardContainer
            headerText="Project Details"
            headerIcon={<BsCameraReelsFill />}
            additionalClasses="project-details-container"
            button={
                <FaEdit />
            }
        >
            <p>Loading project details...</p>
        </DashboardContainer>
    )
}