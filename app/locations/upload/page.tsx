'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';

const LocationsUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length) {
            setFile(files[0]);
        } else {
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            const mappedData = jsonData
                .filter((row: any) => row.Name && row.Address) 
                .map((row: any) => ({
                    locationName: row.Name,
                    locationAddress: row.Address,
                    locationKeywords: row.Keywords || '',
                    locationDescription: row.Description || '',
                    locationContactName: row.Contact || '',
                    locationPhone: row.Phone ? row.Phone.toString() : '', 
                    locationEmail: row.Email || '', 
                    // locationComments: row.Comments || '', 
                }));

            const response = await fetch('/api/v1/locations/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mappedData),
            });

            const result = await response.json();
            if (response.ok) {
                setUploadMessage(`Upload successful. ${result.duplicates.length > 0 ? 'Duplicates skipped: ' + result.duplicates.join(', ') : ''}`);
            } else {
                setUploadMessage('Upload failed.');
                console.error('Upload failed');
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Locations</button>
            {uploadMessage && <p>{uploadMessage}</p>}
        </div>
    );
};

export default LocationsUpload;
