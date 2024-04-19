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
    <section className="people-list">
      <Drawer title="People">
        {associatedPeople.map(({ id, name }) => {
          return <p key={id}>{name}</p>
        })}
      </Drawer>
    </section>
  )
}
