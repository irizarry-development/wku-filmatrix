import Link from "next/link";
import { FaArrowRotateLeft, FaCirclePlus, FaMagnifyingGlass } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

interface LocationDatabaseProps {
  searchParams: {
    search: string
    pageNumber: string
  }
}

export default async function LocationDatabase(
  {
    searchParams: {
      search,
      pageNumber
    }
  }: LocationDatabaseProps
) {

  let parsedPage = 1;
  let perPage = 2;

  if (pageNumber) {
    parsedPage = parseInt(pageNumber);
  }

  let searchData = null;

  if (!search) {
    searchData = await prisma.location.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    });
  } else {
    searchData = await prisma.location.findMany({
      where: {
        OR: [
          { locationName: { contains: search, mode: 'insensitive' } },
          { locationDescription: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: perPage,
      skip: (parsedPage - 1) * perPage
    });
  }

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Locations</h1>

        <Link href="/locations/add" className="database-page-add">
            <FaCirclePlus />
        </Link>
        <form id="location-search-form" action={`/locations/dashboard`} method="GET">
          <label>
            <input type="text" name="search" defaultValue={search} placeholder="Search" />
          </label>
          <button type="submit">
            <FaMagnifyingGlass />
          </button>
          <Link href="/locations/dashboard" className="clear-search">
            <FaArrowRotateLeft />
            Reset Search
          </Link>
        </form>
      </section>
      <section className="database-content">

        <Table title="Locations" headers={[
          "Name", "Address", "Description", "Phone", "Email", "Contact", "Keywords", ""
        ]}>
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
        <Link 
          href={`/locations/dashboard?${search ? `search=${search}`: ""}&pageNumber=${parsedPage - 1}`}
        >
          Previous
        </Link>
        <Link
          href={`/locations/dashboard?${search ? `search=${search}`: ""}&pageNumber=${parsedPage + 1}`}
        >
          Next
        </Link>
        
      </section>
    </section>
  );
};
