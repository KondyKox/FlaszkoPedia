import { Dispatch, SetStateAction } from "react";
import { FormData } from "./AuthProps";
import { Vodka } from "./VodkaProps";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

export interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVodka: Vodka | null;
  setSelectedVodka: Dispatch<SetStateAction<Vodka | null>>;
}
