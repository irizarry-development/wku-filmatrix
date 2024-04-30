import { RouteParams } from "~/lib/types"
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer"
import { FaImages, FaPlus } from "react-icons/fa6"
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function MediaList({ params: { id } }: RouteParams) {
  const foundMedia = await prisma.projectMedia.findMany({
    where: {
      projectId: id
    },
  });
  if (!foundMedia)
    return notFound();

  return (
    <DashboardContainer
      headerText="Media"
      headerIcon={<FaImages />}
      additionalClasses="project-media-container"
      button={<FaPlus />}

    >
      {
        foundMedia.map(media => {
          return (
            <div key={media.id} className="media-item">
              <Image src={media.url} alt={media.id} />
            </div>
          )
        })
      }
    </DashboardContainer>
  )
}
