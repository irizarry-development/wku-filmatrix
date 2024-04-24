import { FaCircleInfo } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default async function PersonBiography({
    params: { id }
}: RouteParams) {

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            biography: true
        }
    })

    if (!user) {
        return notFound()
    }

    return (
        <DashboardContainer
            headerText="Biography"
            headerIcon={<FaCircleInfo />}
            additionalClasses="person-biography"
            button={
                <FaEdit />
            }
        >
            <p>{user.biography}</p>
        </DashboardContainer>
    )
}