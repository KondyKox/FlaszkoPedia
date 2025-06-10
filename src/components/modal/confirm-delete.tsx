import { ConfirmDeleteProps } from "@/types/ModalProps";
import Modal from "./Modal";
import FeedbackMessage from "../ui/FeedbackMessage";
import { useState } from "react";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import { useVodkas } from "@/hooks/useVodkas";
import { deleteVodka } from "@/lib/utils/admin/vodkas";

const ConfirmDelete = ({
  isOpen,
  onClose,
  selectedVodka,
  setSelectedVodka,
}: ConfirmDeleteProps) => {
  if (!isOpen) return;

  const { refreshVodkas } = useVodkas();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const { animate, triggerAnimation } = useAnimateFeedback();

  const handleDeleteVodka = async () => {
    const vodkaId = selectedVodka?._id;
    if (!vodkaId) return;

    try {
      const { message, success } = await deleteVodka(vodkaId);
      if (message) setFeedback(message);
      setSuccessful(success);

      if (success) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      setSuccessful(false);
      setFeedback("Nie udało się usunąć wódki.");
      console.error("Failed to delete vodka:", error);
    }

    triggerAnimation();
    setTimeout(async () => {
      setSelectedVodka(null);
      await refreshVodkas();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-primary text-xl md:text-2xl text-center">
          Czy usunąć wódkę:{" "}
          <span className="text-button font-bold">{selectedVodka?.name}</span>?
        </p>
        <div className="flex justify-center items-center gap-2 w-full mb-4">
          <button className="btn btn-secondary py-2 flex-1" onClick={onClose}>
            NIE
          </button>
          <button
            className="btn btn-danger flex-1"
            onClick={() => handleDeleteVodka()}
          >
            TAK
          </button>
        </div>
      </div>
      <FeedbackMessage isSuccessful={successful} animate={animate}>
        {feedback}
      </FeedbackMessage>
    </Modal>
  );
};

export default ConfirmDelete;
