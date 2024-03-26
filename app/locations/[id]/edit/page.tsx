"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
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
                const foundLocation = await axios.get(`/api/locations/${id}`); 

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
                    await axios.patch(`/api/locations/${id}`, updatedLocationData);

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
                <section className="edit-location-page">
                    <form className="form" id="edit-location-form" action={updateLocationData}>
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
                </section>
            )
}