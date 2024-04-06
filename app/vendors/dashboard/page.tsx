import Link from 'next/link';
import { FaArrowLeftLong, FaArrowRightLong, FaArrowRotateLeft, FaCirclePlus, FaMagnifyingGlass } from 'react-icons/fa6';
import TextInput from '~/components/ui/form/Input';
import Table from '~/components/ui/table/Table';
import TableRow from '~/components/ui/table/TableRow';
import prisma from '~/lib/prisma';

interface VendorDatabaseProps {
  searchParams: {
    search: string
    pageNumber: string
  }
}

export default async function VendorDatabase(
  {
    searchParams: {
      search,
      pageNumber
    }
  }: VendorDatabaseProps
) {
  let parsedPage = 1;
  let perPage = 2;

  if (pageNumber) {
    parsedPage = parseInt(pageNumber);
  }

  let vendorData = null;

  if (!search) {
    vendorData = await prisma.vendor.findMany({
      take: perPage,
      skip: (parsedPage - 1) * perPage
    })
  } else {
    vendorData = await prisma.vendor.findMany({
      where: {
        OR: [
          { vendorName: { contains: search, mode: 'insensitive' } },
          { vendorDescription: { contains: search, mode: 'insensitive' } },
          { vendorAddress: { contains: search, mode: 'insensitive' } },
          { vendorPhone: { contains: search, mode: 'insensitive' } },
          { vendorEmail: { contains: search, mode: 'insensitive' } },
          { vendorContactName: { contains: search, mode: 'insensitive' } },
        ],
      },
      take: perPage,
      skip: (parsedPage - 1) * perPage
    });
  }

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Vendors</h1>
        <Link href="/vendors/add" className="database-page-add">
          <FaCirclePlus />
        </Link>
        <form id="vendor-search-form" className="database-search-form" action={`/vendors/dashboard`} method="GET">
          <TextInput
            id='search'
            type="search"
            placeholder='Search vendors...'
            initialValue={search}
          />
          <section className="database-search-buttons">
            <button type="submit">
              <FaMagnifyingGlass />
            </button>
            <Link href="/vendors/dashboard" className="clear-search">
              <FaArrowRotateLeft />
            </Link>
            <Link
              href={`/vendors/dashboard?${search ? `search=${search}` : ""}&pageNumber=${parsedPage - 1}`}
              className="pagination-button"
            >
              <FaArrowLeftLong />
            </Link>
            <Link
              href={`/vendors/dashboard?${search ? `search=${search}` : ""}&pageNumber=${parsedPage + 1}`}
              className="pagination-button"
            >
              <FaArrowRightLong />
            </Link>
          </section>
        </form>
      </section>
      <section className="database-content">
        <Table title="Vendors" headers={
          ["Name", "Description", "Address", "Phone", "Email", "Contact", ""]
        }>
          {vendorData.length > 0 &&
            vendorData.map((vendor, i) => (
              <TableRow
                key={i}
                type="Vendors"
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
                deleteUrl="/api/v1/vendors"
              />
            ))}
        </Table>
      </section>
    </section>
  );
};