import { notFound } from "next/navigation"
import { ReactNode } from "react"
import DashboardLayout from "~/components/ui/dashboard/DashboardLayout"
import prisma from "~/lib/prisma"
import { RouteParams } from "~/lib/types"

interface PeopleDashboardProps {
  children: ReactNode
  details: ReactNode
  vendors: ReactNode
  checklist: ReactNode
  crew: ReactNode
  locations: ReactNode
  festivals: ReactNode
  cast: ReactNode
  media: ReactNode
}

export default async function Layout({
  details,
  vendors,
  checklist,
  crew,
  locations,
  festivals,
  cast,
  media,
  params,
}: PeopleDashboardProps & RouteParams) {

  const found = await prisma.project.findUnique({
    where: {
      id: params.id
    },
    select: {
      projectName: true,
      projectProductionNumber: true,
    }
  })

  if (!found) {
    return notFound()
  }

  return (
    <DashboardLayout
      jumbotronImage="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
      jumbotronTitle={found.projectName}
      jumbotronSubtitle={found.projectProductionNumber}
      dashboardId="projects"
      dashboardName={`Project Dashboard for ${found.projectName}`}
      dashboardClass="project-view"
    >
      {details}
      {checklist}
      {crew}
      {locations}
      {vendors}
      {cast}
      {festivals}
      {media}
    </DashboardLayout>
  )
}
