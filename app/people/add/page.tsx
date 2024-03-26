"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/form/Input";

export default function CreatePeoplePage() {

    const router = useRouter();

    async function addPerson(formData: FormData) {
        const newPerson = {
            name: formData.get("name"),
            email: formData.get("email")
        };

        try {
            await axios.post(`/api/v1/user`, newPerson);

            toast.success("Person added");

            router.push(`/people`);
            router.refresh();
        } catch (error) {
            toast.error("Failed to add person");
        }
    }

    return (
        <>
            <h1>Add User</h1>
            <form className="form" id="add-user-form" action={addPerson}>
                <fieldset>
                    <legend>User Information</legend>
                    <Input label="Name" id="name" />
                    <Input label="Outgoing Email" id="email" />
                </fieldset>
                <Button 
                    color="primary"
                    content="Add User"
                />
            </form>
        </>
    )
}