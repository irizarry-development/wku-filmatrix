import { Crew, User } from "@prisma/client"
import { FaUserFriends } from "react-icons/fa"
import DashboardContainer from "~/components/ui/DashboardContainer"
import prisma from "~/lib/prisma"

interface CrewListProps {
  params: {
    id: string
  }
}

interface CrewCategory {
  [key: string]: ({ user: User } & Crew)[],
}

export default async function CrewList({ params: { id } }: CrewListProps) {
  const crew = await prisma.crew.findMany({
    where: {
      projectId: id,
    },
    include: {
      user: true,
    }
  });

  const _renderCrew = (crew: ({ user: User } & Crew)[]) => {
    let categorized: CrewCategory = {};
    crew.forEach(member => {
      categorized[member.category]
      ? categorized[member.category].push(member)
      : categorized[member.category] = [member]
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
                        <li>
                          <p><strong>{member.role}</strong>&nbsp;&nbsp;&nbsp;{member.user.name}</p>
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
  };

  return (
    <DashboardContainer
      headerText="Crew"
      headerIcon={<FaUserFriends />}
    >
      { _renderCrew(crew) }
    </DashboardContainer>
  )
}
