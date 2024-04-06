import { FaMagnifyingGlass } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

const headers = ["Name", "Address", "Description", "Phone", "Email", "Contact", "Keywords", ""];

interface LocationDatabaseProps {
  searchParams: {
    search: string
  }
}

export default async function LocationDatabase(
  {
    searchParams: {
      search
    }
  }: LocationDatabaseProps
) {

  let searchData = null;

  if (!search) {
    searchData = await prisma.location.findMany()
  } else {
    searchData = await prisma.location.findMany({
      where: {
        OR: [
          { locationName: { contains: search, mode: 'insensitive' } },
          { locationDescription: { contains: search, mode: 'insensitive' } },
        ],
      }
    });
  }

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Locations</h1>
        <form id="location-search-form" action={`/locations`} method="GET">
          <label>
            <input type="text" name="search" placeholder="Search" />
          </label>
          <button type="submit">
            <FaMagnifyingGlass />
          </button>
        </form>
      </section>
      <section className="database-content">

        <Table title="Locations" headers={headers}>
          {
            (searchData.length > 0) &&
            searchData.map((loc, i) => (
              <TableRow
                key={i}
                type='Locations'
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
  );
};
