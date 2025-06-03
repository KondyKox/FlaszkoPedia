import { Dispatch, SetStateAction } from "react";

interface AuthFormProps {
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepPassword?: Dispatch<SetStateAction<string>>;
  loading: boolean;
}

export interface FormData {
  email: string;
  newPassword: string;
  userPassword: string;
}

export interface InputPasswordProps {
  inputId: string;
  value?: string | number;
  onChange: (event: any) => void;
  label: string;
  placeholder: string;
}

export default AuthFormProps;
