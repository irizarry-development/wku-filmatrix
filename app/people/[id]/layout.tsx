import { ReactNode } from "react";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import DashboardLayout from "~/components/ui/dashboard/DashboardLayout";

interface PeopleLayoutProps {
    details: ReactNode
    projects: ReactNode
    biography: ReactNode
    medicalInformation: ReactNode
    emergencyContact: ReactNode
}

export default async function PeopleLayout({
    params: { id },
    details,
    projects,
    biography,
    medicalInformation,
    emergencyContact
}: PeopleLayoutProps & RouteParams) {

    const foundPerson = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            name: true
        }
    })

    if (!foundPerson) {
        return notFound()
    }

    return (
        <DashboardLayout
            jumbotronImage="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
            jumbotronTitle={foundPerson.name || id}
            dashboardId="people"
            dashboardName={`People Dashboard for ${foundPerson.name}`}
            dashboardClass="people-view"
        >
            {details}
            {projects}
            {biography}
            {medicalInformation}
            {emergencyContact}
        </DashboardLayout>
    )
}