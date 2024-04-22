import { Crew, User } from "@prisma/client"
import { notFound } from "next/navigation"
import { FaUserFriends } from "react-icons/fa"
import Button from "~/components/ui/Button"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"

interface CrewListProps {
  params: {
    id: string
  }
}

interface RedactedUser {
  name: string | null
}

interface CrewResponse extends Crew{
  user: RedactedUser
}

interface CrewCategory {
  [key: string]: ({ user: {
    name: string | null
  } } & Crew)[]
}

function CrewComponent({
  user: {
    name
  },
  role
}: CrewResponse) {
  return (
    <section className="crew-component">
      <p><strong>{role}</strong>{name}</p>
    </section>
  )
}

export default async function CrewList({ params: { id } }: CrewListProps) {
  const crew: CrewResponse[] = await prisma.crew.findMany({
    where: {
      projectId: id
    },
    include: {
      user: {
        select: {
          name: true
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
      <Drawer title={key}>
        {categorized[key].map((member, i) => (
          <CrewComponent key={i} {...member} />
        ))}
      </Drawer>
    ))
  }

  return (
    <DashboardContainer 
      headerText="Crew" headerIcon={<FaUserFriends />}
      additionalClasses="project-crew-container"
      button={
        <Button 
          content="Link Crew Member"
          color="secondary"
        />
      }
    >
      {_renderCrew(crew)}
    </DashboardContainer>
  )
}
