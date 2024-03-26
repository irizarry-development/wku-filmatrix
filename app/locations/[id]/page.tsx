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
                <p><strong>Address: </strong>{locationAddress}</p>
                <p><strong>Phone: </strong>{locationPhone}</p>
                <p><strong>Email: </strong>{locationEmail}</p>
                <p><strong>Contact Name: </strong>{locationContactName}</p>
                <p><strong>Keywords: </strong>{locationKeywords}</p>
            </section>
        </section>
    )
}