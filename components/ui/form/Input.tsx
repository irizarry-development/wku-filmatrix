type InputType =
  | "text"
  | "multiline"
  | "file"
  | "date"
  | "time"
  | "number"
  | "color"
  | "range"
  | "search"
  | "email"
  | "password"
  | "tel"

interface TextInputProps {
  id: string
  label?: string
  placeholder?: string
  type?: InputType
  helperText?: string
  initialValue?: string
}

export default function TextInput({
  id,
  helperText,
  label,
  placeholder,
  type = "text",
  initialValue
}: TextInputProps) {
  return (
    <label htmlFor={id} className="form-group">
      {label && <span className="label">{label}</span>}
      {helperText && <em className="helper-text">{helperText}</em>}
      {type === "multiline" ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder || ""}
          defaultValue={initialValue || ""}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder || ""}
          defaultValue={initialValue || ""}
        />
      )}
    </label>
  )
}
