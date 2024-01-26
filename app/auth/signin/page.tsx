"use client"

import { authenticate } from "~/lib/actions"
import { useFormState, useFormStatus } from "react-dom"

export default function LoginPage() {

    const [error, dispatch] = useFormState(authenticate, undefined)
    const { pending } = useFormStatus()

    return (
        <form action={dispatch}>
            <label htmlFor="email">
                <input type="email" name="email" id="email" placeholder="hello@world.com"/>
            </label>
            <label htmlFor="password">
                <input type="password" name="password" id="password" placeholder="abcdef" />
            </label>
            <button aria-disabled={pending}>
                Sign in
            </button>
        </form>
    )
}