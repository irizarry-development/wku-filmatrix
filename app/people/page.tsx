import prisma from "~/lib/prisma";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import PeopleTableRow from "~/components/ui/table/PeopleTableRow";

export default async function PeoplePage() {

    const userData = await prisma.user.findMany();

    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>People</h1>
                <Link href="/people/add" className="database-page-add">
                    <FaCirclePlus />
                </Link>
            </section>
            <section className="database-content">
                <Table title="People" headers={["Name", "Email", "Degree", "Class Year", "Onboarded", "Address", "Credit", ""]}>
                    {
                        userData.map(({
                            id, name, email, degree, classYear, hasOnboarded, address, credit
                        }) => (
                            <PeopleTableRow key={id}
                                id={id}
                                name={name}
                                email={email}
                                degree={degree}
                                classYear={classYear}
                                hasOnboarded={hasOnboarded}
                                address={address}
                                credit={credit}
                            />
                        ))
                    }
                </Table>
            </section>
        </section>
    );
}
