import EyeIconProps from "@/types/EyeIconProps";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CustomEyeIcon = ({
  showPassword,
  togglePassword,
  className,
}: EyeIconProps) => {
  return showPassword ? (
    <EyeSlashIcon
      className={`eye-icon ${className}`}
      onClick={() => togglePassword()}
    />
  ) : (
    <EyeIcon
      className={`eye-icon ${className}`}
      onClick={() => togglePassword()}
    />
  );
};

export default CustomEyeIcon;
