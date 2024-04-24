import { FaAward, FaPlus } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";

export default function FestivalSkeleton() {
    return (
        <DashboardContainer
            headerText="Festivals"
            headerIcon={<FaAward />}
            additionalClasses="project-festivals-container"
            button={<FaPlus />}
        >
            <p>Loading festivals...</p>
        </DashboardContainer>
    )
}