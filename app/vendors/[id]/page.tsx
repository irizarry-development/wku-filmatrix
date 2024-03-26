import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
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
        <section className="view-resource-page">
            <section className="resource-page-header">
                <Link href="/vendors" className="back-link">
                    <FaArrowLeftLong />
                </Link>
                <h1>{vendorName}</h1>   
            </section>
            <section className="resource-page-content">
                <p>{vendorDescription}</p>
                <p>{vendorAddress}</p>
                <p>{vendorPhone}</p>
                <p>{vendorEmail}</p>
                <p>{vendorContactName}</p>
                <p>{vendorKeywords}</p>
            </section>
        </section>
    )
}