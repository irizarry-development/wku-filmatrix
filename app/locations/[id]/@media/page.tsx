import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { FaImages, FaPlus } from "react-icons/fa6";
import Image from "next/image";

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
            headerIcon={ <FaImages /> }
            additionalClasses="location-media"
            button={ <FaPlus /> }
        >
            {
                foundLocationMedia.map((media) => (
                    <div key={media.id} className="media-item">
                        <Image src={media.url} alt={media.id} />
                    </div>
                ))
            }
        </DashboardContainer>
    )
}