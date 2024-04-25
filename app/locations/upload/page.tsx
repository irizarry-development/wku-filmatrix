'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Button from '~/components/ui/Button';
import InputButton from '~/components/ui/FileInput';


const LocationsUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>('Please select a file to upload.');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length) {
            setFile(files[0]);
            setUploadMessage(`Selected file: ${files[0].name}`); // Message updated to reflect file selection
        } else {
            setFile(null);
            setUploadMessage('');
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
                setUploadMessage(`Upload successful.`);
                // setUploadMessage(`Upload successful. ${result.duplicates.length > 0 ? 'Duplicates skipped: ' + result.duplicates.join(', ') : 'Each location name must be unique'}`);
            } else {
                setUploadMessage('Upload failed.');
                console.error('Upload failed');
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <fieldset className="upload-fieldset">
            <legend>Upload Locations</legend>
            <div className="upload-container">
                <p>Note: All repeated entries with the same name will be skipped and only the first one will be processed. For example, if you have three locations with the name "House" only the first will be processed and all subsequent entries will be skipped.<br></br>
                The headers for the file should be as follows:
                </p>
                <ul>
                    <li>Name</li>
                    <li>Address</li>
                    <li>Description</li>
                    <li>Keywords</li>
                    <li>Contact</li>
                    <li>Phone</li>
                    <li>Email</li>
                    <li>Comments</li>
                </ul>
                <InputButton
                    color="primary"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                    buttonText="Select File"
                />
                <Button
                    color="primary"
                    content="Upload Locations"
                    handler={handleUpload}
                    type="button"
                />
                {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
            </div>
        </fieldset>
    );
};

export default LocationsUpload;