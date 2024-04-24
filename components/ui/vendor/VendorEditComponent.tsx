"use client"

import { Fieldset } from "../form/Fieldset"
import Form from "../form/Form"
import TextInput from "../form/Input"

export default function VendorEditComponent() {

    async function handleSubmit(formData: FormData) {
        try {

        } catch (error) {

        }
    }

    return (
        <Form action={handleSubmit} formId="vendor-edit-form">
            <Fieldset
                legendTitle="Vendor Information"
            >
                <TextInput
                    label="Vendor Name"
                    id="vendorName"
                    type="text"
                />
                <TextInput
                    label="Vendor Email"
                    id="vendorEmail"
                    type="email"
                />
                <TextInput
                    label="Vendor Phone"
                    id="vendorPhone"
                    type="tel"
                />
                <TextInput
                    label="Vendor Address"
                    id="vendorAddress"
                    type="text"
                />
            </Fieldset>
        </Form>
    )
}