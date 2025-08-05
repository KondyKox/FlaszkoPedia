import { InputGroupProps } from "@/types/VodkaProps";

const InputGroup = ({
  label,
  id,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  isTextArea = false,
}: InputGroupProps) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          className="input min-h-32"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputGroup;
