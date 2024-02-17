import prisma from "~/lib/prisma";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { PeopleTable } from "~/components/people/PeopleTable";

export default async function PeoplePage() {
    const session = await auth();
    const userData = await prisma.user.findMany();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <>
            <h1>People Database</h1>
            <PeopleTable 
                userData={userData}
            />
        </>
    );
}
