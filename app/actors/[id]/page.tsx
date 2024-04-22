import Link from "next/link"
import { notFound } from "next/navigation"
import { FaArrowLeftLong } from "react-icons/fa6"
import prisma from "~/lib/prisma"

interface ActorPageProps {
  params: {
    id: string
  }
}

export default async function ActorProfilePage({
  params: { id }
}: ActorPageProps) {
  const foundActor = await prisma.actor.findUnique({
    where: {
      id
    }
  })

  if (!foundActor) {
    return notFound()
  }

  const {
    name,
    email,
    phone,
  } = foundActor

  return (
    <section className="view-resource-page">
      <section className="resource-page-header">
        <Link href="/actors/dashboard" className="back-link">
          <FaArrowLeftLong />
        </Link>
        <h1>{name}</h1>
      </section>
      <section className="location-info">
        <p>
          <strong>Email: </strong>
          {email}
        </p>
        <p>
          <strong>Phone: </strong>
          {phone}
        </p>
      </section>
    </section>
  )
}
