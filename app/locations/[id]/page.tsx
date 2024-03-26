import { notFound } from 'next/navigation';
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
        <section className="view-location-page">
            <h1>{locationName}</h1>
            <p>{locationDescription}</p>
            <section className="location-info">
                <p>{locationAddress}</p>
                <p>{locationPhone}</p>
                <p>{locationEmail}</p>
                <p>{locationContactName}</p>
                <p>{locationKeywords}</p>
            </section>
        </section>
    )
}