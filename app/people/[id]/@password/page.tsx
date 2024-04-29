import { FaShieldHalved } from "react-icons/fa6";
import DashboardContainer from "~/components/ui/dashboard/DashboardContainer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma";
import { notFound } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default async function Password({
    params: { id }
}: RouteParams) {

    // const user = await prisma.user.findUnique({
    //     where: {
    //         id
    //     },
    //     select: {
    //         allergies: true,
    //         medications: true,
    //         conditions: true
    //     }
    // })

    // if (!user) {
    //     return notFound()
    // }

    // const {
    //     allergies,
    //     medications,
    //     conditions
    // } = user
        
    return (
        <DashboardContainer
            headerText="Password"
            headerIcon={<FaShieldHalved />}
            additionalClasses="person-password"
            button={
                <FaEdit />
            }
        >
			<></>
        </DashboardContainer>
    )
}