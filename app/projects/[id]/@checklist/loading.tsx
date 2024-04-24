import { FaRegCircleCheck } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";

export default function ChecklistSkeleton() {
    return (
        <DashboardContainer
            headerText="Project Checklist"
            headerIcon={<FaRegCircleCheck />}
            additionalClasses="project-checklist-container"
        >
            <p>Loading checklist...</p>
        </DashboardContainer>
    )
}