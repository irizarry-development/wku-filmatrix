interface ButtonProps {
    color: ButtonColors
    content: string
    size?: ButtonSize  
    alignment?: ButtonAlignment
    justification?: ButtonJustification
    disabled?: boolean
    handler?: () => void
}

type ButtonColors = 'primary' | 'secondary' | 'outline' | 'success' | 'info' | 'warning' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonAlignment = 'left' | 'right'
type ButtonJustification = 'top' | 'bottom'

export default function Button({
    color,
    content,
    size = "md",
    alignment,
    justification,
    disabled = false,
    handler
}: ButtonProps) {
    return (
        <button onClick={handler} className={`btn ${size} ${color} ${alignment} ${justification}`} aria-disabled={disabled}>{content}</button>
    )
}