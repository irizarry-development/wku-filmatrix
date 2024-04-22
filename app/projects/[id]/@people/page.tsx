import Link from "next/link"
import { FaEye, FaUserFriends } from "react-icons/fa"
import { FaLinkSlash } from "react-icons/fa6"
import { MdPeopleAlt } from "react-icons/md"
import Button from "~/components/ui/Button"
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
        return (
          <section className="people-information" key={id}>
            <section className="people-image">

            </section>

            <section className="people-actions">
              <Link 
                href={`/people/${id}`}
                className="view-person"
              >
                <FaEye />
              </Link>
              <FaLinkSlash className="unlink-person" />
            </section>
            <section className="people-meta">
              <p key={id}>{name}</p>  
            </section>
          </section>
        )
      })}

    </DashboardContainer>
  )
}
