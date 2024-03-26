import prisma from "~/lib/prisma";
import Link from "next/link";
import { FaCirclePlus, FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";

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
                    {userData.map(({
                        id, name, email, degree, classYear, hasOnboarded, address, credit
                    }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{degree}</td>
                            <td>{classYear}</td>
                            <td>{hasOnboarded ? "Yes" : "No"}</td>
                            <td>{address}</td>
                            <td>{credit}</td>
                            <td className="database-actions">
                                <Link href={`/people/${id}`} className="database-action-view">
                                    <FaEye />
                                </Link>
                                <Link
                                    href={`/people/${id}/edit`}
                                    className="database-action-edit"
                                >
                                    <FaPenToSquare />
                                </Link>
                                <FaTrashCan
                                    className="database-action-delete"
                                />
                            </td>

                        </tr>
                    ))}
                </Table>
            </section>
        </section>
    );
}
