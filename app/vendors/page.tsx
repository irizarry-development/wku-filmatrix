import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import prisma from "~/lib/prisma";

import { FaEye } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

export default async function VendorPage() {

    const vendors = await prisma.vendor.findMany()

    const _deleteVendor = async (id: string) => {
        await prisma.vendor.delete({
            where: {
                id: id
            }
        })
    }

    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>Vendors</h1>
                <Link href="/vendors/add" className="database-page-add">
                    <FaCirclePlus 
                />
                </Link>
            </section>
            <section className="database-content">
                <Table title="Vendors" headers={["Name", "Description", "Address", "Phone", "Email", "Contact", ""]}>
                    {vendors.map(({
                        vendorName,
                        vendorDescription,
                        vendorAddress,
                        vendorPhone,
                        vendorEmail,
                        vendorContactName,
                        id
                    }) => (
                        <tr key={id}>
                            <td>{vendorName}</td>
                            <td>{vendorDescription}</td>
                            <td>{vendorAddress}</td>
                            <td>{vendorPhone}</td>
                            <td>{vendorEmail}</td>
                            <td>{vendorContactName}</td>
                            <td className="database-actions">
                                <Link href={`/vendors/${id}`} className="database-action-view">
                                    <FaEye />
                                </Link>
                                <Link
                                    href={`/vendors/${id}/edit`}
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
    )
}