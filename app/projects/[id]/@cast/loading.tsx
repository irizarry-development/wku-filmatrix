import { FaMasksTheater, FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";

export default function CastSkeleton() {
    return (
        <DashboardContainer
            headerText="Cast"
            headerIcon={<FaMasksTheater />}
            additionalClasses="project-cast-container"
            button={<FaLink />}
        >
            <p>Loading cast...</p>
        </DashboardContainer>
    )
}