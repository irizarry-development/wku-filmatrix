"use client";

import { useFormState, useFormStatus } from "react-dom";
import TextInput from "~/components/ui/form/Input";
import Button from "~/components/ui/Button";
import toast from "react-hot-toast";
import { authenticate } from "~/lib/actions";

export default function LoginPage() {
    async function _authenticate(prev: string | undefined, formData: FormData) {
        const result = await authenticate(prev, formData);

        if (!result) return;

        return toast.error(result);
    }

    const [error, dispatch] = useFormState(_authenticate, undefined);
    const { pending } = useFormStatus();

    return (
        <form className="form login-form" action={dispatch}>
            <fieldset>
                <legend>Sign in</legend>
                <TextInput label="Your NetID" id="email" type="email" />
                <TextInput label="Password" id="password" type="password" />
                <section className="login-buttons">
                    <Button
                        color="primary"
                        content="Sign in"
                        disabled={pending}
                    />
                    <Button color="secondary" content="Forgot password?" />
                </section>
            </fieldset>
        </form>
    );
}
