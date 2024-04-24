interface FormProps {
    children: React.ReactNode
    action?: string | ((formData: FormData) => void)
    formId: string
}

export default function Form({
    children,
    action,
    formId
}: FormProps) {
    return (
        <form action={action || ""} className="form" id={formId}>
            {children}
        </form>
    )
}