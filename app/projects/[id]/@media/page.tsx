import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"
import { FaImages, FaPlus } from "react-icons/fa6"
import { notFound } from "next/navigation";

export default async function MediaList({ params: { id } }: RouteParams) {
  const projecWithMedia = await prisma.project.findUnique({
    where: {
      id: id
    },
    include: {
      media: true,
    },
  });
  if (!projecWithMedia)
    return notFound();

  return (
    <DashboardContainer
      headerText="Media"
      headerIcon={<FaImages />}
      additionalClasses="project-media-container"
      button={<FaPlus />}

    >
      {
        projecWithMedia.media.map(media => {
          return (
            <p>{media.url}</p>
          )
        })
      }
    </DashboardContainer>
  )
}
