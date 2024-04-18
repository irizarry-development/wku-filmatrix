interface RadioProps {
  id: string
  label: string
  options: string[]
  checkbox?: boolean
}

export default function Radio({ id, label, checkbox, options }: RadioProps) {
  return (
    <label htmlFor={`${id}`} className="form-group">
      <span className="label">{label}</span>
      <section className="radio-group">
        {options.map((option, index) => (
          <label key={index} htmlFor={`${id}${index}`} className="radio">
            <input
              type={checkbox ? "checkbox" : "radio"}
              id={`${id}${index}`}
              name={`${id}`}
            />
            {option}
          </label>
        ))}
      </section>
    </label>
  )
}
