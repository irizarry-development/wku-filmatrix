import { notFound } from "next/navigation"
import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer"
import { FaClipboard, FaEdit } from "react-icons/fa"
import Button from "~/components/ui/Button"

export default async function ProfileDetails({ params: { id } }: RouteParams) {
  const foundPerson = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!foundPerson) {
    return notFound()
  }

  const {
    name,
    email,
    degree,
    classYear,
    hasOnboarded,
    address,
    credit,
    role
  } = foundPerson

  return (
    <DashboardContainer
      headerText="Details"
      headerIcon={<FaClipboard />}
      additionalClasses="person-details"
      button={
        <FaEdit />
      }
    >
      <p>
        <strong>Email: </strong>
        {email}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Class Year: </strong>
        {classYear}
      </p>
      <p>
        <strong>Onboarded: </strong>
        {hasOnboarded ? "Yes" : "No"}
      </p>
      <p>
        <strong>Address: </strong>
        {address}
      </p>
      <p>
        <strong>Credit: </strong>
        {credit}
      </p>
    </DashboardContainer>
  )
}
