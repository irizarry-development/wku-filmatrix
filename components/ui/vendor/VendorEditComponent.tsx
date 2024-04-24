"use client"

import { Vendor } from "@prisma/client"
import { useState } from "react"
import { Fieldset } from "../form/Fieldset"
import Form from "../form/Form"
import TextInput from "../form/Input"

export default function VendorEditComponent() {

    const [searchResults, setSearchResults] = useState<Vendor[]>([])

    async function handleSubmit(formData: FormData) {
        try {

        } catch (error) {

        }
    }

    return (
        <Form action={handleSubmit} formId="vendor-link-form">
            <Fieldset
                legendTitle="Vendor Information"
            >
                <TextInput label="Search for a vendor" id="vendorName" type="text" />
            </Fieldset>
        </Form>
    )
}