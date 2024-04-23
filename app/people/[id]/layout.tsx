import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import DashboardLayout from "~/components/ui/DashboardLayout";

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