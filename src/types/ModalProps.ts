import { Dispatch, SetStateAction } from "react";
import { FormData } from "./AuthProps";
import { VodkaProps, VodkaFormData } from "./VodkaProps";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmModalProps extends ModalProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

export interface VodkaModalProps extends ModalProps {
  selectedVodka: VodkaProps | null;
  refreshVodkas: () => void;
}

export interface VodkaActionModal extends VodkaModalProps {
  action: "add" | "edit";
}

export interface VodkaFormProps {
  formData: VodkaFormData;
  setFormData: Dispatch<SetStateAction<VodkaFormData>>;
  refreshVodkas: () => void;
  action: "add" | "edit";
  onClose: () => void;
}
