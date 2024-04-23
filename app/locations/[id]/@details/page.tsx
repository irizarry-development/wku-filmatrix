import { notFound } from "next/navigation";
import { FaClipboardList } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { FaEdit } from "react-icons/fa";

export default async function LocationDetails({
    params
}: RouteParams) {

    const foundLocation = await prisma.location.findFirst(
        {
            where: {
                id: params.id
            }
        }
    )

    if (!foundLocation) {
        return notFound()
    }

    return (
        <DashboardContainer
            headerText="Location Details"
            headerIcon={
                <FaClipboardList />
            }
            additionalClasses="location-details"
            button={
                <FaEdit />
            }
        >
            <p><strong>Name: </strong>{
                foundLocation.locationName
            }</p>

            <p><strong>Address: </strong>{
                foundLocation.locationAddress
            }</p>

            <p><strong>Description: </strong>{
                foundLocation.locationDescription
            }</p>

            <p><strong>Keywords: </strong>{
                foundLocation.locationKeywords
            }</p>

            <p><strong>Email: </strong> {
                foundLocation.locationEmail
            }</p>

            <p><strong>Contact Point: </strong>{
                foundLocation.locationContactName
            }</p>
        </DashboardContainer>
    )
}