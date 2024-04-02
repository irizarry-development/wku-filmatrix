import prisma from "~/lib/prisma";
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";

const headers = ["Name", "Email", "Degree", "Class Year", "Onboarded", "Address", "Credit", ""]

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
                <Table title="People" headers={headers}>
                    {
                        (userData.length > 0) &&
                        userData.map((user, i) => (
                            <TableRow
                                key={i}
                                type='User'
                                id={user.id}
                                name={user.name}
                                fields={[user.name, user.email, user.degree, user.classYear, user.hasOnboarded ? 'Yes' : 'No', user.address, user.credit]}
                                deleteUrl='/api/v1/user'
                            />
                        ))
                    }
                </Table>
            </section>
        </section>
    );
}
