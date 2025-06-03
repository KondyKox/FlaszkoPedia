import { useState } from "react";
import CustomEyeIcon from "./CustomEyeIcon";
import { InputPasswordProps } from "@/types/AuthProps";

const InputPassword = ({
  inputId,
  value,
  onChange,
  label,
  placeholder,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative border-2 rounded-xl w-full">
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <input
        id={inputId}
        name={inputId}
        type={showPassword ? "text" : "password"}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={() => onChange}
        required
      />
      <CustomEyeIcon
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
        className="top-2"
      />
    </div>
  );
};

export default InputPassword;
