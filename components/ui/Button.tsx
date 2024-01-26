interface ButtonProps {
    color: ButtonColors
    content: string
    size?: ButtonSize    
}

type ButtonColors = 'primary' | 'secondary' | 'outline' | 'success' | 'info' | 'warning' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export default function Button({
    color,
    content,
    size = "md"
}: ButtonProps) {
    return (
        <button className={`btn ${size} ${color} `}>{content}</button>
    )
}