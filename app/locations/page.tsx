import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import prisma from "~/lib/prisma";

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
            <Table headers={
                ["Name", "Address", "Description", "Phone", "Email", "Contact Name", "Keywords"]
            }
            title="Locations">

                {
                    locationData.map(({
                        locationName,
                        locationAddress,
                        locationKeywords,
                        locationDescription,
                        locationPhone,
                        locationEmail,
                        locationContactName
                    }) => (
                        <tr key={locationName}>
                            <td>{locationName}</td>
                            <td>{locationAddress}</td>
                            <td>{locationDescription}</td>
                            <td>{locationPhone}</td>
                            <td>{locationEmail}</td>
                            <td>{locationContactName}</td>
                            <td>{locationKeywords}</td>
                        </tr>
                    ))
                }
            </Table>
        </section>
       </section>
    )
}