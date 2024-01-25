import prisma from '@/lib/prisma'
import UserMasonry from '@/components/user/UserMasonry';

export default async function PeoplePage() {
    const userData = await prisma.users.findMany();

    return (
        <UserMasonry userData={userData} />
    )
}