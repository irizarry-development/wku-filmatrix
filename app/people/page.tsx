'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";

const headers = ["Name", "Email", "Degree", "Class Year", "Onboarded", "Address", "Credit", ""];

interface User {
  id: string;
  name: string;
  email: string;
  degree: string;
  classYear: string;
  hasOnboarded: boolean;
  address: string;
  credit: string;
}

const PeoplePage = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/v1/user/search'); 
            if (!response.ok) {
                console.error('Failed to fetch:', response.statusText);
                return;
            }
            const data = await response.json();
            setUserData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!searchTerm) return;

        const fetchSearchResults = async () => {
            const response = await fetch(`/api/v1/user/search?query=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                console.error('Failed to fetch:', response.statusText);
                return;
            }
            const data = await response.json();
            setUserData(data);
        };

        fetchSearchResults();
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <section className="database-page">
            <section className="database-page-header">
                <h1>People</h1>
                <Link href="/people/add" className="database-page-add">
                    <FaCirclePlus />
                </Link>

                <input
                    type="text"
                    placeholder="Search people..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </section>
            <section className="database-content">
                <Table title="People" headers={headers}>
                    {userData.length > 0 &&
                        userData.map((user, i) => (
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
            </section>
        </section>
    );
};

export default PeoplePage;
