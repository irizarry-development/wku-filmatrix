import Link from "next/link";
import { FaCirclePlus, FaMagnifyingGlass, FaArrowRotateLeft } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

interface PeopleDatabaseProps {
    searchParams: {
        search: string
        pageNumber: string
    }
}

export default async function PeopleDatabase({
    searchParams: {
        search,
        pageNumber
    }
}: PeopleDatabaseProps) {

    let parsedPage = 1;
    let perPage = 2;

    console.log(search, pageNumber)

    if (pageNumber) {
        parsedPage = parseInt(pageNumber);
    }

    let peopleData = null

    if (!search) {
        peopleData = await prisma.user.findMany({
            take: perPage,
            skip: (parsedPage - 1) * perPage
        })
    } else {
        peopleData = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { degree: { contains: search, mode: 'insensitive' } },
                    { classYear: { contains: search, mode: 'insensitive' } },
                    { address: { contains: search, mode: 'insensitive' } },
                    { credit: { contains: search, mode: 'insensitive' } },
                ],
            },
            take: perPage,
            skip: (parsedPage - 1) * perPage
        })
    }

    peopleData.forEach((user) => {
        // @ts-ignore
        delete user['saltedPassword']
    })

    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>People</h1>
                <Link href="/people/add" className="database-page-add">
                    <FaCirclePlus />
                </Link>
                <form id="people-search-form" action={`/people/dashboard`} method="GET">
          <label>
            <input type="text" name="search" defaultValue={search} placeholder="Search" />
          </label>
          <button type="submit">
            <FaMagnifyingGlass />
          </button>
          <Link href="/people" className="clear-search">
            <FaArrowRotateLeft /> Reset Search
            </Link>
        </form>
            </section>
            <section className="database-content">
                <Table title="People" headers={
                    ["Name", "Email", "Degree", "Class Year", "Onboarded", "Address", "Credit", ""]
                }>
                    {peopleData.length > 0 &&
                        peopleData.map((user, i) => (
                            <TableRow
                                key={i}
                                type='User'
                                id={user.id}
                                name={user.name}
                                fields={[
                                    user.name,
                                    user.email,
                                    user.degree,
                                    user.classYear,
                                    user.hasOnboarded ? 'Yes' : 'No',
                                    user.address,
                                    user.credit,
                                ]}
                                deleteUrl='/api/v1/user' 
                            />
                        ))}
                </Table>

                <Link 
                href={`/people/dashboard?${search ? `search=${search}`: ""}&pageNumber=${parsedPage - 1}`}
                >
                Previous
                </Link>
                <Link
                href={`/people/dashboard?${search ? `search=${search}`: ""}&pageNumber=${parsedPage + 1}`}
                >
                Next
                </Link>
            </section>
        </section>
    );
};
