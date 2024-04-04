import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

const headers = ["Name", "Description", "Address", "Phone", "Email", "Contact", ""]

export default async function VendorPage() {

    const vendorData = await prisma.vendor.findMany()

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
                <Table title="Vendors" headers={headers}>
                    {
                        (vendorData.length > 0) &&
                        vendorData.map((vendor, i) => (
                            <TableRow
                                key={i}
                                type='Vendor'
                                id={vendor.id}
                                name={vendor.vendorName}
                                fields={[
                                    vendor.vendorName,
                                    vendor.vendorDescription,
                                    vendor.vendorAddress,
                                    vendor.vendorPhone,
                                    vendor.vendorEmail,
                                    vendor.vendorContactName,
                                ]}
                                deleteUrl='/api/v1/vendors'
                            />
                        ))
                    }
                </Table>
            </section>
        </section>
    )
}