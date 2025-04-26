import { Dispatch, JSX, SetStateAction } from "react";

interface AuthFormProps {
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepPassword?: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  renderEyeIcon: () => JSX.Element;
  loading: boolean;
}

export default AuthFormProps;
