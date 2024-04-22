import { FaUserFriends } from "react-icons/fa"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"

interface PeopleListProps {
  params: {
    projectId: string
  }
}

export default async function PeopleList({ params: { projectId } }: PeopleListProps) {
  const associatedPeople = await prisma.user.findMany({
    where: {
      crewOf: {
        some: {
          projectId
        }
      }
    },
    select: {
      id: true,
      name: true,
      image: true
    }
  });

  return (
    <DashboardContainer
      headerText="Crew"
      headerIcon={<FaUserFriends />}
    >
      {associatedPeople.map(({ id, name }) => {
        return <p key={id}>{name}</p>
      })}

    </DashboardContainer>
  )
}
