"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

interface EditLocationPageProps {
    params: {
        id: string;
    }
}

export default function EditLocationPage({
    params: {
        id
    }
}: EditLocationPageProps) {
        
            const router = useRouter();

            async function fetchLocationData() {
                const foundLocation = await axios.get(`/api/v1/locations/${id}`); 

                if (!foundLocation) {
                    router.push('/404')
                }

                setLocationData(foundLocation.data.location);
            }

            async function updateLocationData(formData: FormData) {
                const updatedLocationData = {
                    locationName: formData.get("locationName"),
                    locationDescription: formData.get("locationDescription"),
                    locationAddress: formData.get("locationAddress"),
                    locationPhone: formData.get("locationPhone"),
                    locationEmail: formData.get("locationEmail"),
                    locationContactName: formData.get("locationContactName"),
                    locationKeywords: formData.get("locationKeywords")
                };

                try {
                    await axios.patch(`/api/v1/locations/${id}`, updatedLocationData);

                    toast.success("Location updated");

                    router.push(`/locations/${id}`);  
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to update location");
                }
            }

            const [locationData, setLocationData] = useState({
                locationName: "",
                locationDescription: "",
                locationAddress: "",
                locationPhone: "",
                locationEmail: "",
                locationContactName: "",
                locationKeywords: ""
            });

            useEffect(() => {
                fetchLocationData();
            }, [id]);

            return (
                    <form className="form edit-resource-form" id="edit-location-form" action={updateLocationData}>
                        <Link href="/locations" className="back-link">
                            <FaArrowLeftLong />
                        </Link>
                        <fieldset>
                            <legend>Edit Location</legend>
                            <Input
                                type="text"
                                id="locationName"
                                label="Location Name"
                                initialValue={locationData.locationName}
                            />
                            <Input
                                type="text"
                                id="locationDescription"
                                label="Description"
                                initialValue={locationData.locationDescription}
                            />
                            <Input
                                type="text"
                                id="locationAddress"
                                label="Address"
                                initialValue={locationData.locationAddress}
                            />
                            <Input
                                type="text"
                                id="locationPhone"
                                label="Phone"
                                initialValue={locationData.locationPhone}
                            />
                            <Input
                                type="text"
                                id="locationEmail"
                                label="Email"
                                initialValue={locationData.locationEmail}
                            />
                            <Input
                                type="text"
                                id="locationContactName"
                                label="Contact"
                                initialValue={locationData.locationContactName}
                            />
                            <Input
                                type="text"
                                id="locationKeywords"
                                label="Keywords"
                                initialValue={locationData.locationKeywords}
                            />
                        </fieldset>
                        <Button color="primary" content="Edit Location" />
                    </form>
            )
}