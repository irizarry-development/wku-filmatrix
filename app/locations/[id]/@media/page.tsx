import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaImages, FaPlus } from "react-icons/fa6";

export default async function LocationMedia({
    params
}: RouteParams) {
    const foundLocationMedia = await prisma.locationMedia.findMany(
        {
            where: {
                locationId: params.id
            }
        }
    )

    return (
        <DashboardContainer
            headerText="Location Media"
            headerIcon={
                <FaImages />
            }
            additionalClasses="location-media"
            button={
                <FaPlus />
            }
        >
            {foundLocationMedia.map((media) => (
                <div key={media.id} className="media-item">
                    <img src={media.url} />
                </div>
            ))}
        </DashboardContainer>
    )
}