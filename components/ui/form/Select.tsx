interface SelectProps {
    label: string;
    options: string[];
    multiple?: boolean;
}

export default function Select({ label, options, multiple }: SelectProps) {
    return (
        <label htmlFor="previewMultiSelect" className="form-group">
            <span className="label">{label}</span>
            <select id="previewMultiSelect" multiple={multiple}>
                {options.map((option, index) => (
                    <option key={index}>{option}</option>
                ))}
            </select>
        </label>
    );
}
