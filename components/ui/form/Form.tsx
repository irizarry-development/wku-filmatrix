interface FormProps {
    children: React.ReactNode
    action?: string | ((formData: FormData) => void)
    formId: string
    method?: string
    additionalClasses?: string
}

export default function Form({
    children,
    action,
    formId,
    method,
    additionalClasses
}: FormProps) {
    return (
        <form action={action || ""} method={method || undefined} className={`form ${additionalClasses ? additionalClasses : ""}`} id={formId}>
            {children}
        </form>
    )
}