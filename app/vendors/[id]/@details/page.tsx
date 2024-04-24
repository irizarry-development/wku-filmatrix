import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import { FaClipboardList } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default async function VendorDetails({
    params
}: RouteParams) {   

    const foundVendor = await prisma.vendor.findFirst(
        {
            where: {
                id: params.id
            }
        }
    )

    if (!foundVendor) {
        return notFound()
    }

    return (
        <DashboardContainer
            headerText="Vendor Details"
            headerIcon={
                <FaClipboardList />
            }
            additionalClasses="vendor-details"
            button={
                <FaEdit />
            }
        >
            <p><strong>Name: </strong>{
                foundVendor.vendorName
            }</p>

            <p><strong>Address: </strong>{
                foundVendor.vendorAddress
            }</p>

            <p><strong>Description: </strong>{
                foundVendor.vendorDescription
            }</p>

            <p><strong>Keywords: </strong>{
                foundVendor.vendorKeywords
            }</p>

            <p><strong>Email: </strong> {
                foundVendor.vendorEmail
            }</p>

            <p><strong>Contact Point: </strong>{
                foundVendor.vendorContactName
            }</p>
        </DashboardContainer>
    )
}