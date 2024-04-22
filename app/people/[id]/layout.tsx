import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

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
            name: true,
        }
    })

    if (!foundPerson) {
        return notFound()
    }

    return (
        <section className="dashboard-layout people-view">
            <section className="dashboard-jumbotron">
                <Image
                    src="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
                    alt="People Jumbotron"
                    className="dashboard-jumbotron-image"
                    width={1200}
                    height={800}
                />
                <section className="dashboard-jumbotron-content">
                    <Link href="/people/dashboard">
                        <FaArrowLeftLong />
                    </Link>
                    <h1>{foundPerson.name}</h1>
                </section>
            </section>
            {details}
            {projects}
            {biography}
            {medicalInformation}
            {emergencyContact}
        </section>
    )
}