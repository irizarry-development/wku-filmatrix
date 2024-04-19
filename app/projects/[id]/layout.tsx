import { notFound } from "next/navigation"
import { ReactNode } from "react"
import prisma from "~/lib/prisma"
import { RouteParams } from "~/lib/types"

interface PeopleDashboardProps {
  children: ReactNode
  details: ReactNode
  vendors: ReactNode
  checklist: ReactNode
  people: ReactNode
  locations: ReactNode
}

export default async function Layout({
  details,
  vendors,
  checklist,
  people,
  locations
}: PeopleDashboardProps) {

  return (
    <section className="people-dashboard-layout">
      {details}
      {vendors}
      {checklist}
      {people}
      {locations}
    </section>
  )
}
