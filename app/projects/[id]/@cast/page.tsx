import { notFound } from "next/navigation"
import { FaMasksTheater } from "react-icons/fa6"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"

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
          actor: true,
        },
      },
    },
  });
  if (!project)
    return notFound();

  return (
    <DashboardContainer
      headerText="Cast"
      headerIcon={<FaMasksTheater />}
    >
      {
        project.cast.map(cast => {
          return (
            <p key={cast.id}>
              {`${cast.actor.name} - ${cast.role} - ${cast.type} - ${cast.actor.email}`}
            </p>
          )
        }) 
      }
    </DashboardContainer>
  )
}
