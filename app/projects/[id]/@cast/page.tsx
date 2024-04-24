import { Actor, Cast } from "@prisma/client"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaEye, FaLink, FaLinkSlash, FaMasksTheater } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"


interface CastListProps {
  params: {
    id: string
  }
}

type CastActor = { actor: Actor } & Cast

interface CastCategory {
  [key: string]: ({ actor: Actor } & Cast)[]
}

function CastComponent({
  actor: { name, id },
  role
}: CastActor) {
  return (
    <section className="cast-component">
      
        <strong>
          {role}
        </strong>
        <p>
          {name}
        </p>
        <section className="cast-actions">
          <Link href={`/actors/${id}`}>
              <FaEye className="view-cast" />
          </Link>
          <FaLinkSlash className="unlink-cast" />
        </section>
    </section>
  )
}

export default async function CastList({ params: { id } }: CastListProps) {
  const project = await prisma.project.findUnique({
    where: {
      id
    },
    include: {
      cast: {
        include: {
          actor: true
        }
      }
    }
  })
  if (!project) return notFound()

  const _renderCast = (cast: ({ actor: Actor } & Cast)[]) => {
    let categorized: CastCategory = {}

    cast.forEach((member) => {
      categorized[member.type]
        ? categorized[member.type].push(member)
        : (categorized[member.type] = [member])
    })

    return Object.keys(categorized).map((key) => (
      <Drawer key={key} title={key}>
        {categorized[key].map((member, i) => 
          <CastComponent key={i} {...member} /> 
        )}
      </Drawer>
    ))
  }

  return (
    <DashboardContainer
      headerText="Cast"
      headerIcon={<FaMasksTheater />}
      additionalClasses="project-cast-container"
      button={<FaLink />}
    >
      {_renderCast(project.cast)}
    </DashboardContainer>
  )
}
