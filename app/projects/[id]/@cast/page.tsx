import { Actor, Cast } from "@prisma/client"
import { notFound } from "next/navigation"
import { FaMasksTheater } from "react-icons/fa6"
import Button from "~/components/ui/Button"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"

interface CastListProps {
  params: {
    id: string
  }
}

interface CastCategory {
  [key: string]: ({ actor: Actor } & Cast)[],
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

  const _renderCast = (cast: ({ actor: Actor } & Cast)[]) => {
    let categorized: CastCategory = {};
    cast.forEach(member => {
      categorized[member.type]
      ? categorized[member.type].push(member)
      : categorized[member.type] = [member]
    });
    return (
      <ul className="project-nested-list">
        {
          Object.keys(categorized).map(key => {
            return (
              <li className="project-nested-list-top">
                <p className="project-nested-item-name"><strong>{key}</strong></p>
                <ul>
                  {
                    categorized[key].map(member => {
                      return (
                        <li className="project-nested-list-bottom" key={member.id}>
                          <p><strong>{member.role}</strong>&nbsp;&nbsp;&nbsp;{member.actor.name}</p>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    );
  }

  return (
    <DashboardContainer
      headerText="Cast"
      headerIcon={<FaMasksTheater />}
      button={
        <Button
          content="Link Cast"
          color="secondary"
        />
      }
    >
      { _renderCast(project.cast) }
    </DashboardContainer>
  )
}
