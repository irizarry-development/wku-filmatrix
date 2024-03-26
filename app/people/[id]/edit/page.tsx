"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";
import Radio from "~/components/ui/form/Radio";

interface EditPersonPageProps {
    params: {
        id: string;
    }
}

export default function EditPersonPage({
    params: {
        id
    }
}: EditPersonPageProps) {
    const router = useRouter();

    async function fetchPersonData() {
        const foundPerson = await axios.get(`/api/v1/user/${id}`);

        if (!foundPerson) {
            router.push('/404')
        }

        setPersonData(foundPerson.data.user);
    }

    async function updatePersonData(formData: FormData) {
        const updatedPersonData = {
            name: formData.get("name"),
            email: formData.get("email"),
            degree: formData.get("degree"),
            classYear: formData.get("classYear"),
            address: formData.get("address"),
            credit: formData.get("credit"),
        };

        try {
            await axios.patch(`/api/v1/user/${id}`, updatedPersonData);

            toast.success("Person updated");

            router.push(`/people/${id}`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update person");
        }
    }

    const [personData, setPersonData] = useState({
        name: "",
        email: "",
        degree: "",
        classYear: "",
        address: "",
        credit: "",
    });

    useEffect(() => {
        fetchPersonData();
    }, [id]);

    return (
        <section className="edit-person-page">
            <form className="form" id="edit-person-form" action={updatePersonData}>
                <fieldset>
                    <legend>Edit Person</legend>
                    <Input
                        type="text"
                        id="name"
                        label="Name"
                        initialValue={personData.name}
                    />
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        initialValue={personData.email}
                    />
                    <Input
                        type="text"
                        id="degree"
                        label="Degree"
                        initialValue={personData.degree}
                    />
                    <Input
                        type="text"
                        id="classYear"
                        label="Class Year"
                        initialValue={personData.classYear}
                    />
                    <Input
                        type="text"
                        id="address"
                        label="Address"
                        initialValue={personData.address}
                    />
                    <Input
                        type="text"
                        id="credit"
                        label="Credit"
                        initialValue={personData.credit}
                    />
                </fieldset>
                <Button 
                    color="primary"
                    content="Edit Person"
                />
            </form>
        </section>
    )
}