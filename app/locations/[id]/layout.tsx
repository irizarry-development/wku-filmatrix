import { ReactNode } from "react";
import DashboardLayout from "~/components/ui/DashboardLayout";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";

interface LocationLayoutProps {
    children: ReactNode
    media: ReactNode
    projects: ReactNode
    details: ReactNode
}

export default async function LocationLayout({
    params,
    media,
    projects,
    details
}: LocationLayoutProps & RouteParams) {

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
        <DashboardLayout
            jumbotronImage="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
            jumbotronTitle={foundLocation.locationName}
            dashboardId="locations"
            dashboardName={`Location Dashboard for ${foundLocation.locationName}`}
            dashboardClass="location-view"
        >
            {details}
            {media}
            {projects}
        </DashboardLayout>
    )
}