import { FaAward } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"
import { dateFromISO8601 } from "~/lib/utils"

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
      additionalClasses="project-festivals-container"
      button={
        <Button 
          content="Link Festivals"
          color="secondary"
        />
      }
    >
      <ul className="project-nested-list">
        {
          festivals.map(festival => {
            return (
              <li key={festival.id} className="project-nested-list-bottom">
                <p className="project-nested-item-name"><strong>{festival.name}</strong></p>
                <section className="project-nested-details">
                  {
                    (festival.fflink) && (
                      <a href={festival.fflink}><strong>Film Freeway Link</strong></a>
                    )
                  }
                  {
                    (festival.email) && (
                      <p>
                        <strong>Contact Email: </strong>
                        { festival.email }
                      </p>
                    )
                  }
                  {
                    (festival.strategy) && (
                      <p>
                        <strong>Strategy: </strong>
                        { festival.strategy }
                      </p>
                    )
                  }
                  {
                    (festival.status) && (
                      <p>
                        <strong>Status: </strong>
                        { festival.status }
                      </p>
                    )
                  }
                  {
                    (festival.earlyDeadline) && (
                      <p>
                        <strong>Early Deadline: </strong>
                        { dateFromISO8601(festival.earlyDeadline.toISOString()) }
                      </p>
                    )
                  }
                  {
                    (festival.deadline) && (
                      <p>
                        <strong>Deadline: </strong>
                        { dateFromISO8601(festival.deadline.toISOString()) }
                      </p>
                    )
                  }
                  {
                    (festival.submitted) && (
                      <p>
                        <strong>Submitted: </strong>
                        { dateFromISO8601(festival.submitted.toISOString()) }
                      </p>
                    )
                  }
                </section>
              </li>
            )
          })
        }
      </ul>
    </DashboardContainer>
  )
}
