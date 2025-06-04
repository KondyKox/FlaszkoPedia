import { Dispatch, SetStateAction } from "react";

interface AuthFormProps {
  setFormData: Dispatch<SetStateAction<FormData>>;
  loading: boolean;
}

export interface FormData {
  email: string;
  password: string;
  repPassword: string;
}

export interface InputPasswordProps {
  inputId: string;
  value?: string | number;
  onChange: (event: any) => void;
  label: string;
  placeholder: string;
}

export default AuthFormProps;
