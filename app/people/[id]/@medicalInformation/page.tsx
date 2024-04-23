import { FaNotesMedical } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import Button from "~/components/ui/Button";
import { FaEdit } from "react-icons/fa";

export default async function MedicalInformation({
    params: { id }
}: RouteParams) {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            allergies: true,
            medications: true,
            conditions: true
        }
    })

    if (!user) {
        return notFound()
    }

    const {
        allergies,
        medications,
        conditions
    } = user
        
    return (
        <DashboardContainer
            headerText="Medical Information"
            headerIcon={<FaNotesMedical />}
            additionalClasses="person-medical-information"
            button={
                <FaEdit />
            }
        >
            <section className="medical-details">
                <p>
                    <strong>Allergies: </strong>
                    {allergies}
                </p>
                <p>
                    <strong>Medications: </strong>
                    {medications}
                </p>
                <p>
                    <strong>Conditions: </strong>
                    {conditions}
                </p>
            </section>
        </DashboardContainer>
    )
}