"use client";

import { FormEvent, useRef } from "react"
import { useFormState } from "react-dom";
import Button from "~/components/ui/Button";
import TextInput from "~/components/ui/form/Input";

export default function OnboardingPage() {

    const dialogRef = useRef<HTMLDialogElement>(null)

    const _handleModal = () => 
    {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const _handleSubmit = () => {
        console.log('submitting')
    }

    const [error, dispatch] = useFormState(_handleSubmit, undefined)

    return (
        <>
            <h1>Crew Onboarding</h1>
            <form className="form" id="onboarding-form" onSubmit={(e) => e.preventDefault()}>
                <fieldset>
                    <legend>Crew Member Information</legend>
                    <TextInput label="Name" id="name" type="text" />
                    <TextInput label="Non WKU Email" id="email" type="text" />
                    <TextInput label="Phone" id="phone" type="text" /> 
                    <TextInput label="Address" id="address" type="text" />
                    <TextInput label="Position" id="position" type="text" />
                    <TextInput label="Credit" id="credit" type="text" />
                </fieldset>
                <fieldset>
                    <legend>Emergency Contact</legend>
                    <TextInput label="Name" id="em_name" type="text" />
                    <TextInput label="Phone" id="em_phone" type="text" />
                    <TextInput label="Address" id="em_address" type="text" />
                </fieldset>
                <fieldset>
                    <legend>Medical Information</legend>
                    <TextInput label="Allergies" id="allergies" type="text" />
                    <TextInput label="Medications" id="medications" type="text" />
                    <TextInput label="Medical Conditions" id="conditions" type="text" />
                </fieldset>
                <Button 
                    color="primary" 
                    content="Submit" 
                    disabled={false} 
                    handler={_handleModal}
                />
                <Button 
                    color="secondary" 
                    content="Skip" 
                    disabled={false} 
                    handler={_handleModal}
                />

            </form>
            <dialog ref={dialogRef}>
                <h1>HELLO DIALOG</h1>
            </dialog>
        </>
    )
}