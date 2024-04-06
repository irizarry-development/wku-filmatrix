'use client';
import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "~/components/ui/table/Table";
import TableRow from "~/components/ui/table/TableRow";
import prisma from "~/lib/prisma";
import { useState, useEffect } from "react"; 

const headers = ["Name", "Address", "Description", "Phone", "Email", "Contact", "Keywords", ""];

interface Location {
  id: string;
  locationName: string;
  locationAddress: string;
  locationDescription: string;
  locationPhone: string;
  locationEmail: string;
  locationContactName: string;
  locationKeywords: string;
}

const LocationDatabase = () => {
    const [locationData, setLocationData] = useState<Location[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('/api/v1/user/search');
        if (!response.ok) {
          console.error('Failed to fetch:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log(data);
        setLocationData(data);
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
        console.log(data);
        setLocationData(data);
      };

      fetchSearchResults();
    }, [searchTerm]); 

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    return (
      <section className="database-page">
        <section className="database-page-header">
          <h1>Locations</h1>
          
        </section>
        <section className="database-content">
        <input 
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
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
    );
};

export default LocationDatabase;
