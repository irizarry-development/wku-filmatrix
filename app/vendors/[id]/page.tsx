import { notFound } from 'next/navigation';
import prisma from '~/lib/prisma';

interface VendorProfilePageProps {
    params: {
        id: string;
    }
}

export default async function VendorProfilePage({
    params: { id }
}: VendorProfilePageProps) {

    const foundVendor = await prisma.vendor.findUnique({
        where: {
            id
        }
    });

    if (!foundVendor) {
        return notFound()
    }

    const {
        vendorName,
        vendorDescription,
        vendorAddress,
        vendorPhone,
        vendorEmail,
        vendorContactName,
        vendorKeywords
    } = foundVendor;

    return (
        <section className="vendor-profile-page">
            <h1>{vendorName}</h1>
            <p>{vendorDescription}</p>
            <section className="vendor-profile-info">
                <p>{vendorAddress}</p>
                <p>{vendorPhone}</p>
                <p>{vendorEmail}</p>
                <p>{vendorContactName}</p>
                <p>{vendorKeywords}</p>
            </section>
        </section>
    )
}