import Link from "next/link"
import { notFound } from "next/navigation"
import { FaArrowLeftLong } from "react-icons/fa6"
import prisma from "~/lib/prisma"

interface VendorProfilePageProps {
  params: {
    id: string
  }
}

export default async function VendorProfilePage({
  params: { id }
}: VendorProfilePageProps) {
  const foundVendor = await prisma.vendor.findUnique({
    where: {
      id
    }
  })

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
  } = foundVendor

  return (
    <section className="view-resource-page">
      <section className="resource-page-header">
        <Link href="/vendors/dashboard" className="back-link">
          <FaArrowLeftLong />
        </Link>
        <h1>{vendorName}</h1>
      </section>
      <section className="resource-page-content">
        <p>
          <strong>Description: </strong>
          {vendorDescription}
        </p>
        <p>
          <strong>Address: </strong>
          {vendorAddress}
        </p>
        <p>
          <strong>Phone: </strong>
          {vendorPhone}
        </p>
        <p>
          <strong>Email: </strong>
          {vendorEmail}
        </p>
        <p>
          <strong>Contact Name: </strong>
          {vendorContactName}
        </p>
        <p>
          <strong>Keywords: </strong>
          {vendorKeywords}
        </p>
      </section>
    </section>
  )
}
