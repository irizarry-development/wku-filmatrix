import prisma from '~/lib/prisma'
import UserMasonry from '~/components/user/UserMasonry';
import { auth } from '~/lib/auth';
import { redirect } from 'next/navigation';

export default async function PeoplePage() {
    const session = await auth();
    const userData = await prisma.user.findMany();

    if (!session) {
        redirect('/auth/signin')
    }

    return (
        <UserMasonry userData={userData} />
    )
}