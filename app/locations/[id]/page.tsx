import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import prisma from '~/lib/prisma';

interface LocationProfilePageProps {
    params: {
        id: string
    }
}

export default async function LocationProfilePage({
    params: {
        id
    }
}: LocationProfilePageProps) {

    const foundLocation = await prisma.location.findUnique({
        where: {
            id
        }
    });

    if (!foundLocation) {
        return notFound()
    }

    const {
        locationName,
        locationDescription,
        locationAddress,
        locationPhone,
        locationEmail,
        locationContactName,
        locationKeywords
    } = foundLocation;

    return (
        <section className="view-resource-page">
            <section className="resource-page-header">
                <Link href="/locations" className="back-link">
                    <FaArrowLeftLong />
                </Link>
                <h1>{locationName}</h1>
            </section>
            <section className="location-info">
            <p>{locationDescription}</p>
                <p>{locationAddress}</p>
                <p>{locationPhone}</p>
                <p>{locationEmail}</p>
                <p>{locationContactName}</p>
                <p>{locationKeywords}</p>
            </section>
        </section>
    )
}