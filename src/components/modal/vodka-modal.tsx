import { VodkaActionModal } from "@/types/ModalProps";
import Modal from "./Modal";
import { useState } from "react";
import { VodkaFormData } from "@/types/VodkaProps";
import { getInitialFormData } from "@/lib/utils/admin/vodkas";
import VodkaForm from "../admin/vodka-form";

const VodkaModal = ({
  isOpen,
  onClose,
  selectedVodka,
  refreshVodkas,
  action,
}: VodkaActionModal) => {
  if (!isOpen) return null;
  if (action === "edit" && !selectedVodka) return null;

  const [formData, setFormData] = useState<VodkaFormData>(
    getInitialFormData(action, selectedVodka)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        {action === "edit" && selectedVodka && (
          <h2 className="sub-header">{selectedVodka.name}</h2>
        )}
        <VodkaForm
          formData={formData}
          setFormData={setFormData}
          refreshVodkas={refreshVodkas}
          action={action}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default VodkaModal;
