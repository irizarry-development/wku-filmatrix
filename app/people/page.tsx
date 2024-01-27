import prisma from '~/lib/prisma'
import UserMasonry from '~/components/user/UserMasonry';

export default async function PeoplePage() {
    const userData = await prisma.user.findMany();

    return (
        <UserMasonry userData={userData} />
    )
}