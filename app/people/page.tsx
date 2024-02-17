import prisma from "~/lib/prisma";
import { auth } from "~/lib/auth";
import { redirect } from "next/navigation";
import { PeopleTable } from "~/components/people/PeopleTable";
import Button from "~/components/ui/Button";

export default async function PeoplePage() {
    const session = await auth();
    const userData = await prisma.user.findMany();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <>
            <section className="people-header">
                <h1>People Database</h1>
                <Button color="primary" content="Add User(s)" />
            </section>
            <PeopleTable userData={userData} />
        </>
    );
}
