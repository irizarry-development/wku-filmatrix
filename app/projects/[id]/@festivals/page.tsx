import { FaAward } from "react-icons/fa6"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"

interface FestivalsListProps {
  params: {
    id: string
  }
}

export default async function FestivalsList({ params: { id } }: FestivalsListProps) {
  const festivals = await prisma.festival.findMany({
    where: {
      projectId: id,
    },
  })

  return (
    <DashboardContainer
      headerText="Festivals"
      headerIcon={<FaAward />}
    >
      {festivals.map(({ id, name }) => {
        return <p key={id}>{name}</p>
      })}

    </DashboardContainer>
  )
}
