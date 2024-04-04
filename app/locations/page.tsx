import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

const headers = ["Name", "Address", "Description", "Phone", "Email", "Contact", "Keywords", ""]

export default async function LocationDatabase() {

    const locationData = await prisma.location.findMany();

    return (
       <section className="database-page">
        <section className="database-page-header">
            <h1>Locations</h1>
            <Link href="/locations/add" className="database-page-add">
                <FaCirclePlus />
            </Link>
        </section>
        <section className="database-content">
            <Table title="Locations" headers={headers}>
                {
                    (locationData.length > 0) &&
                    locationData.map((loc, i) => (
                        <TableRow
                            key={i}
                            type='Location'
                            id={loc.id}
                            name={loc.locationName}
                            fields={[
                                loc.locationName,
                                loc.locationAddress,
                                loc.locationDescription,
                                loc.locationPhone,
                                loc.locationEmail,
                                loc.locationContactName,
                                loc.locationKeywords,
                            ]}
                            deleteUrl='/api/v1/locations'
                        />
                    ))
                }
            </Table>
        </section>
       </section>
    )
}