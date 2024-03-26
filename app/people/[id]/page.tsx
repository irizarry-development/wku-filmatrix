import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import prisma from '~/lib/prisma'

interface PeopleProfilePageProps {
    params: {
        id: string;
    }
}

export default async function PeopleProfilePage({
    params
}: PeopleProfilePageProps) {

    const foundPerson = await prisma.user.findUnique({
        where: {
            id: params.id
        }
    })

    if (!foundPerson) {
        return notFound()
    }

    const {
        name,
        email,
        degree,
        classYear,
        hasOnboarded,
        address,
        credit
    } = foundPerson


    return (
        <section className="view-resource-page">
            <section className="resource-page-header">
                <Link href="/people" className="back-link">
                    <FaArrowLeftLong />
                </Link>
                <h1>{name}</h1>
            </section>
            
            <section className="resource-page-content">
                <p>{email}</p>
                <p>{degree}</p>
                <p>{classYear}</p>
                <p>{hasOnboarded ? "Yes" : "No"}</p>
                <p>{address}</p>
                <p>{credit}</p>
            </section>
        </section>
    )
}