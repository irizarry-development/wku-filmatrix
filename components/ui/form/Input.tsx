type InputType = 'text' | 'multiline' | 'file' | 'date' | 'time' | 'number' | 'color' | 'range' | 'search' | 'email' | 'password'

interface TextInputProps {
    id: string
    label: string;
    placeholder?: string;
    type?: InputType
}


export default function TextInput({ id, label, placeholder, type = 'text' }: TextInputProps) {
    return (
        <label htmlFor={id} className="form-group">
            <span className="label">{label}</span>
            { 
                type === 'multiline' 
                    ? 
                <textarea
                    id={id}
                    name={id}
                    placeholder={placeholder || ""}
                />  
                    :
                <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder || ""}
                />
            }
            
        </label>
    );
}
