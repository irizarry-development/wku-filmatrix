type InputType = 'text' | 'multiline' | 'file' | 'date' | 'time' | 'number' | 'color' | 'range' | 'search'

interface TextInputProps {
    label: string;
    placeholder?: string;
    type?: InputType
}


export default function TextInput({ label, placeholder, type = 'text' }: TextInputProps) {
    return (
        <label htmlFor="previewSingleLineTextField" className="form-group">
            <span className="label">{label}</span>
            { 
                type === 'multiline' 
                    ? 
                <textarea
                    id="previewMultiLineTextField"
                    placeholder={placeholder || label}
                />  
                    :
                <input
                    type={type}
                    id="previewSingleLineTextField"
                    placeholder={placeholder || label}
                />
            }
            
        </label>
    );
}
