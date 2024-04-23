import { Festival } from "@prisma/client"
import {
  FaArrowUpRightFromSquare,
  FaAward,
  FaGlobe,
  FaLink,
  FaPlus,
  FaRegTrashCan
} from "react-icons/fa6"
import Button from "~/components/ui/Button"
import DashboardContainer from "~/components/ui/DashboardContainer"
import Drawer from "~/components/ui/Drawer"
import prisma from "~/lib/prisma"
import { dateFromISO8601 } from "~/lib/utils"
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa"

interface FestivalsListProps {
  params: {
    id: string
  }
}

export function FestivalComponent({
  fflink,
  email,
  strategy,
  status,
  earlyDeadline,
  deadline,
  submitted
}: Festival) {
  return (
    <section className="festival-component">
      <section className="festival-actions">
        <FaEdit className="festival-link" />
        <FaLink className="festival-link" />
        <FaRegTrashCan className="festival-link" />
      </section>
      <p className="festival-email">
        <strong>Contact Email: </strong>
        <a href={`mailto:${email}`}>{email || "N/A"}</a>
      </p>
      <p className="festival-strategy">
        <strong>Strategy: </strong>
        {strategy || "N/A"}
      </p>
      <p className="festival-status">
        <strong>Status: </strong>
        {status || "N/A"}
      </p>
      <p className="festival-early-deadline">
        <strong>Early Deadline: </strong>
        {earlyDeadline ? dateFromISO8601(earlyDeadline.toISOString()) : "N/A"}
      </p>
      <p className="festival-deadline">
        <strong>Deadline: </strong>
        {deadline ? dateFromISO8601(deadline.toISOString()) : "N/A"}
      </p>
      <p className="festival-submitted">
        <strong>Submitted: </strong>
        {submitted ? dateFromISO8601(submitted.toISOString()) : "N/A"}
      </p>
    </section>
  )
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
