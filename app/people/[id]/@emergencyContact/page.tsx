import { FaUserShield } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import Button from "~/components/ui/Button";

export default async function PersonEmergencyContact({
    params: { id }
}: RouteParams) {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            emergencyContactAddress: true,
            emergencyContactName: true,
            emergencyContactPhone: true
        }
    })

    if (!user) {
        return notFound()
    }

    const {
        emergencyContactAddress,
        emergencyContactName,
        emergencyContactPhone
    } = user

    return (
        <DashboardContainer
            headerText="Emergency Contact"
            headerIcon={<FaUserShield />}
            additionalClasses="person-emergency-contact"
            button={
                <Button 
                    color="secondary"
                    content="Edit Contact"
                />
            }
        >
            <section className="emergency-contact-details">
                <p>
                    <strong>Name: </strong>
                    {emergencyContactName}
                </p>
                <p>
                    <strong>Phone: </strong>
                    {emergencyContactPhone}
                </p>
                <p>
                    <strong>Address: </strong>
                    {emergencyContactAddress}
                </p>
            </section>
        </DashboardContainer>
    )
}