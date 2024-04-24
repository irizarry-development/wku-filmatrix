import { FaUserFriends } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";

export default function CrewSkeleton() {
    return (
        <DashboardContainer
            headerText="Crew"
            headerIcon={<FaUserFriends />}
            additionalClasses="project-crew-container"
            button={<FaLink />}
        >
            <p>Loading crew...</p>
        </DashboardContainer>
    )
}