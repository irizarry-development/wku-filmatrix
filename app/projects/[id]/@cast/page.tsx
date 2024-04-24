import { Actor, Cast } from "@prisma/client"
import { notFound } from "next/navigation"
import { FaMasksTheater, FaPlus } from "react-icons/fa6"
import { CastComponent } from "~/components/ui/cast/CastComponent"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"
import Drawer from "~/components/ui/global/Drawer"
import prisma from "~/lib/prisma"
import { CastCategory } from "~/lib/types"

interface CastListProps {
  params: {
    id: string
  }
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
          <CastComponent key={i} {...member} projectId={id} /> 
        )}
      </Drawer>
    ))
  }

  return (
    <DashboardContainer
      headerText="Cast"
      headerIcon={<FaMasksTheater />}
      additionalClasses="project-cast-container"
      button={<FaPlus />}
    >
      {_renderCast(project.cast)}
    </DashboardContainer>
  )
}
