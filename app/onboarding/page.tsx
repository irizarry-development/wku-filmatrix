"use client";

import { FormEvent, useRef } from "react"
import { useFormState } from "react-dom";
import Button from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import TextInput from "~/components/ui/form/Input";

export default function OnboardingPage() {

    const dialogRef = useRef<HTMLDialogElement>(null)

    const _handleSubmit = () => {
        console.log('submitting')
    }

    const _handleToggle = () => {
        if (!dialogRef.current) 
            return;

        if (dialogRef.current.open) {
            dialogRef.current.close()
        } else {
            dialogRef.current.showModal()
        }
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
                    handler={_handleToggle}
                />
                <Button 
                    color="secondary" 
                    content="Skip" 
                    disabled={false} 
                    handler={_handleToggle}
                />
                <Modal ref={dialogRef}>
                    <section className="onboarding-disclaimer">
                    <h1>BY SUBMITTING THIS FORM IT IS AGREED AS FOLLOWS:</h1>
                    <h3>1. VOLUNTARY SERVICE:</h3> <p>The Crew Member is providing their services on a voluntary
                        basis and it is hereby understood that there will be no form of compensation, monetary or otherwise, for the services that Crew Member provides to the Production.</p>
                    <h3>2. MEALS:</h3> <p>The Director will provide or cause the Producer to provide meal breaks and/or
                        food service at approximately six (6) hour intervals.</p>
                    <h3>3. CAR INSURANCE:</h3> <p>Crew Member is responsible for liability and collision 
                        insurance and deductibles on his/her vehicle used in conjunction with their voluntary service.</p>
                    <h3>4. CREDIT:</h3> <p>The Crew Member will have a name credit in the completed
                        film that will read as listed in Crew Member information.</p>
                    <h3>5. TERM:</h3> <p>The Director reserves the right to terminate or dismiss the Crew Member at any time.</p>
                    <h3>6. NO WAIVER:</h3> <p>The terms and conditions of this deal memo are binding the 
                        Director and Crew Member and shall not be waived or altered by any method. All alterations to
                        this deal memo are binding.</p>
                    <h3>7. WORK FOR HIRE:</h3> <p>The Director shall be the owner of all the
                        results and proceed of Crew Member's services, including and copyright, trademark, and any other intellectual property rights in any work
                        or property created by Crew Member, or anyone under Crew Member's direction. Crew Member acknowledges that Crew member's work is a "work made for hire"
                        within the scope of the Crew member's service, and therefore the Director shall be the author and copyright owner of any work created under this agreement.</p>
                    <h3>8. PUBLICITY:</h3> <p> Crew member shall not directly or indirectly circulate, publish, or otherwise disseminate any news story, article, book, or other publicity
                        concerning the Motion Picture, or Crew Member's or others' services without Director's prior written consent, provided that Crew Member may issue personal publicity
                        mentioning the Motion Picture so long as such references are not derogatory. Crew Member has permission to show a videotape of Motion Picture in connection with seeking future employment. Director
                        shall have the right to use the Crew Member's name, voice, picture, and likeness in connection with the Motion Picture, the advertising and publicizing thereof, and any 
                        promotional films or clips respecting the Motion Picture without additional compensation therefore.
                    </p>
                    </section>
                    <section className="onboarding-modal-buttons">
                        <Button 
                            color="primary" 
                            content="I Agree" 
                            disabled={false} 
                            handler={_handleSubmit}
                        />
                        <Button 
                            color="secondary" 
                            content="I Disagree (Exit)" 
                            disabled={false} 
                            handler={_handleToggle}
                        />
                    </section>
                </Modal>       
            </form>
            
        </>
    )
}