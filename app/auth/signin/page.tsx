"use client"

import { authenticate } from "~/lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import TextInput from "~/components/ui/form/Input"
import Button from "~/components/ui/Button"

export default function LoginPage() {

    const [error, dispatch] = useFormState(authenticate, undefined)
    const { pending } = useFormStatus()

    return (
        <form className="form login-form" action={dispatch}>
            <fieldset>
                <legend>Sign in</legend>
                <TextInput label="Your NetID" id="email" type="email"/>
                <TextInput label="Password" id="password" type="password" />
                <section className="login-buttons">
                    <Button color="primary" content="Sign in" disabled={pending} />
                    <Button color="secondary" content="Forgot password?" />
                </section>
            </fieldset>
        </form>
    )
}