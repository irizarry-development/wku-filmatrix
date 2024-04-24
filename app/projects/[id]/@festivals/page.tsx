import { Festival } from "@prisma/client"
import {
  FaAward,
  FaLink,
  FaPlus,
  FaRegTrashCan
} from "react-icons/fa6"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"
import { dateFromISO8601 } from "~/lib/utils"
import { FaEdit } from "react-icons/fa"
import Link from "next/link"
import { FestivalComponent } from "~/components/ui/FestivalComponent"


interface FestivalsListProps {
  params: {
    id: string
  }
}

export default async function FestivalsList({
  params: { id }
}: FestivalsListProps) {
  const festivals = await prisma.festival.findMany({
    where: {
      projectId: id
    }
  })

  return (
    <DashboardContainer
      headerText="Festivals"
      headerIcon={<FaAward />}
      additionalClasses="project-festivals-container"
      button={<FaPlus />}
    >
      {festivals.map((festival) => (
        <Drawer key={festival.id} title={festival.name}>
          <FestivalComponent key={festival.id} {...festival} />
        </Drawer>
      ))}
    </DashboardContainer>
  )
}
