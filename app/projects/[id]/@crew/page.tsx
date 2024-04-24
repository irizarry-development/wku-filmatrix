import { FaUserFriends } from "react-icons/fa"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"
import { FaLink, FaPlus } from "react-icons/fa6"
import { CrewResponse, CrewListProps, CrewCategory } from "~/lib/types"
import CrewComponent from "~/components/ui/CrewComponent"

export default async function CrewList({ params: { id } }: CrewListProps) {
  const crew: CrewResponse[] = await prisma.crew.findMany({
    where: {
      projectId: id
    },
    include: {
      user: {
        select: {
          name: true,
          id: true
        }
      }
    }
  })

  const _renderCrew = (crew: CrewResponse[]) => {
    let categorized: CrewCategory = {}

    crew.forEach((member) => {
      categorized[member.category]
        ? categorized[member.category].push(member)
        : (categorized[member.category] = [member])
    })
    return Object.keys(categorized).map((key) => (
      <Drawer title={key} key={key}>
        {categorized[key].map((member, i) => (
          <CrewComponent key={i} {...member} projectId={id} />
        ))}
      </Drawer>
    ))
  }

  return (
    <DashboardContainer
      headerText="Crew"
      headerIcon={<FaUserFriends />}
      additionalClasses="project-crew-container"
      button={<FaPlus />}
    >
      {_renderCrew(crew)}
    </DashboardContainer>
  )
}
