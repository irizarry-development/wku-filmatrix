import React from 'react';

interface InputButtonProps {
    color: ButtonColors
    buttonText: string | JSX.Element 
    size?: ButtonSize
    alignment?: ButtonAlignment
    justification?: ButtonJustification
    disabled?: boolean
    accept: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type ButtonColors =
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "info"
  | "warning"
  | "danger";
type ButtonSize = "sm" | "md" | "lg";
type ButtonAlignment = "left" | "right";
type ButtonJustification = "top" | "bottom";

const InputButton: React.FC<InputButtonProps> = ({
    onChange, 
    accept, 
    buttonText, 
    color,
    size = "md",
    alignment = "",
    justification = "",
    disabled = false
}) => {
    return (
        <label 
            className={`btn ${size} ${color} ${alignment} ${justification}`}
            aria-disabled={disabled ? 'true' : 'false'}
            style={{ position: 'relative' }} 
        >
            {buttonText}
            <input 
                type="file" 
                accept={accept} 
                onChange={onChange} 
                style={{ display: 'none' }} 
            />
        </label>
    );
};

export default InputButton;
