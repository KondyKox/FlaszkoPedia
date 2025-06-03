import { FormData } from "./AuthProps";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
