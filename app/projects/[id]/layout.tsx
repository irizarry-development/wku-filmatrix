import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import DashboardLayout from "~/components/ui/DashboardLayout"
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
}

export default async function Layout({
  details,
  vendors,
  checklist,
  crew,
  locations,
  festivals,
  cast,
  params,
}: PeopleDashboardProps & RouteParams) {

  const found = await prisma.project.findUnique({
    where: {
      id: params.id
    },
    select: {
      projectName: true
    }
  })

  if (!found) {
    return notFound()
  }

  return (
    <DashboardLayout
      jumbotronImage="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
      jumbotronTitle={found.projectName}
      dashboardId="projects"
      dashboardName={`Project Dashboard for ${found.projectName}`}
    >
      {details}
      {crew}
      {locations}
      {vendors}
      {cast}
      {festivals}
      {checklist}
    </DashboardLayout>
  )
}
