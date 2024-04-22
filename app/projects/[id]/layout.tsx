import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import prisma from "~/lib/prisma"
import { RouteParams } from "~/lib/types"

interface PeopleDashboardProps {
  children: ReactNode
  details: ReactNode
  vendors: ReactNode
  checklist: ReactNode
  people: ReactNode
  locations: ReactNode
  festivals: ReactNode
  cast: ReactNode
}

export default async function Layout({
  children,
  details,
  vendors,
  checklist,
  people,
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
    <section className="project-dashboard-layout">
      <section className="project-dashboard-jumbotron">
        <Image 
          src="https://www.wku.edu/marketingandcommunications/images/social-hero-3.jpg"
          alt="Project Jumbotron"
          className="project-dashboard-jumbotron-image"
          width={1200}
          height={800}
        />
        <section className="project-dashboard-jumbotron-content">
          <Link href="/projects/dashboard">
              <FaArrowLeftLong />
          </Link>
          <h1>{found.projectName}</h1>
        </section>
      </section>
      {details}
      {people}
      {locations}
      {vendors}
      {cast}
      {festivals}
      {checklist}
    </section>
  )
}
