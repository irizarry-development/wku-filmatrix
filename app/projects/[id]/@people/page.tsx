import { FaUserFriends } from "react-icons/fa"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"

interface PeopleListProps {
  params: {
    id: string
  }
}

export default async function PeopleList({ params: { id } }: PeopleListProps) {
  const associatedPeople = await prisma.user.findMany({
    where: {
      projects: {
        some: {
          id
        }
      }
    },
    select: {
      id: true,
      name: true,
      image: true
    }
  })

  console.log(associatedPeople)

  return (
    <DashboardContainer
      headerText="Associated People"
      headerIcon={<FaUserFriends />}
    >
      {associatedPeople.map(({ id, name }) => {
        return <p key={id}>{name}</p>
      })}

    </DashboardContainer>
  )
}
