"use client";

import TextInput from "~/components/ui/form/Input";
import Button from "~/components/ui/Button";
import toast from "react-hot-toast";
import { authenticate } from "~/lib/actions";

export default function LoginPage() {
    async function handleLogin(formData: FormData) {
        try {
            
            const result = await authenticate(formData);

            if (!result) {
                toast.success("You have successfully signed in.");
            } else {
                return toast.error(result);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <form className="form login-form" id="login-form" action={handleLogin}>
            <fieldset>
                <legend>Sign in</legend>
                <TextInput label="Your NetID" id="email" type="email" />
                <TextInput label="Password" id="password" type="password" />
                <section className="login-buttons">
                    <Button
                        color="primary"
                        content="Sign in"
                    />
                    <Button color="secondary" content="Forgot password?" />
                </section>
            </fieldset>
        </form>
    );
}
