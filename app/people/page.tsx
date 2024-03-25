import prisma from "~/lib/prisma";
import { PeopleTable } from "~/components/people/PeopleTable";
import Button from "~/components/ui/Button";
import Link from "next/link";

export default async function PeoplePage() {

    const userData = await prisma.user.findMany();

    return (
        <>
            <section className="people-header">
                <h1>People Database</h1>
                <Link href="/people/add" className="btn">
                    <Button color="primary" content="Add User(s)" />
                </Link>
            </section>
            <PeopleTable userData={userData} />
        </>
    );
}
