import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import prisma from "~/lib/prisma";

export default async function VendorPage() {

    const vendors = await prisma.vendor.findMany()

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
                <Table title="Vendors" headers={["Vendor Name", "Vendor Description", "Vendor Address", "Vendor Phone", "Vendor Email", "Vendor Contact Name"]}>
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
                        </tr>
                    ))}
                </Table>
            </section>
        </section>
    )
}