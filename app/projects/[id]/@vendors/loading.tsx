import { FaSuitcase, FaLink } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";

export default function VendorSkeleton() {
    return (
        <DashboardContainer
            headerText="Vendors"
            headerIcon={<FaSuitcase />}
            additionalClasses="project-vendors-container"
            button={
                <FaLink />
            }
        >
            <p>Loading vendors...</p>
        </DashboardContainer>
    )
}