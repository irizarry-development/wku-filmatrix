'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCirclePlus } from 'react-icons/fa6';
import Table from '~/components/ui/table/Table';
import TableRow from '~/components/ui/table/TableRow';

const headers = ["Name", "Description", "Address", "Phone", "Email", "Contact", ""];

interface Vendor {
  id: string;
  vendorName: string;
  vendorDescription: string;
  vendorAddress: string;
  vendorPhone: string;
  vendorEmail: string;
  vendorContactName: string;
}

const VendorPage = () => {
  const [vendorData, setVendorData] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchSearchResults = async () => {
      const response = await fetch(`/api/v1/vendors/search?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        console.error('Failed to fetch:', response.statusText);
        return;
      }
      const data = await response.json();
      setVendorData(data);
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="database-page">
      <section className="database-page-header">
        <h1>Vendors</h1>
        <Link href="/vendors/add" className="database-page-add">
            <FaCirclePlus />
        </Link>
        <input
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>
      <section className="database-content">
        <Table title="Vendors" headers={headers}>
          {vendorData.length > 0 &&
            vendorData.map((vendor, i) => (
              <TableRow
                key={i}
                type="Vendor"
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

export default VendorPage;
