import Link from "next/link"
import { FaEye, FaUserFriends } from "react-icons/fa"
import { FaLinkSlash } from "react-icons/fa6"
import { MdPeopleAlt } from "react-icons/md"
import Button from "~/components/ui/Button"
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
      headerIcon={<MdPeopleAlt />}
      additionalClasses="project-people-container"
      button={
        <Button
          color="secondary"
          content="Link Person"
        />
      }
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
