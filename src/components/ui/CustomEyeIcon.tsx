import EyeIconProps from "@/types/EyeIconProps";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const CustomEyeIcon = ({
  showPassword,
  togglePassword,
  className,
}: EyeIconProps) => {
  return showPassword ? (
    <EyeSlashIcon
      className={`w-6 h-6 absolute -top-1 right-2 translate-y-1/2 cursor-pointer ${className}`}
      onClick={() => togglePassword()}
    />
  ) : (
    <EyeIcon
      className={`w-6 h-6 absolute -top-1 right-2 translate-y-1/2 cursor-pointer ${className}`}
      onClick={() => togglePassword()}
    />
  );
};

export default CustomEyeIcon;
