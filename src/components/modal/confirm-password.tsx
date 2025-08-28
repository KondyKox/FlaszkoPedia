import { useState } from "react";
import LoadingText from "../loading/LoadingText";
import Modal from "./Modal";
import { checkPassword } from "@/lib/utils/user";
import { ConfirmModalProps } from "@/types/ModalProps";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import InputPassword from "../auth/InputPassword";
import { useFeedbacks } from "@/hooks/useFeedbacks";

const ConfirmPassword = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  setEditing,
}: ConfirmModalProps) => {
  if (!isOpen) return;

  const [checking, setChecking] = useState<boolean>(false);
  const { animate, triggerAnimation } = useAnimateFeedback();
  const { addFeedback } = useFeedbacks();

  const handlePasswordCheck = async () => {
    try {
      setChecking(true);

      const { message, success } = await checkPassword(formData.repPassword);
      if (message && success) addFeedback(message, success);

      if (success) {
        setTimeout(() => {
          setEditing(true);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      addFeedback("Nie udało się sprawdzić hasła.", false);
    } finally {
      setChecking(false);
    }

    triggerAnimation();
    setFormData((prev) => ({ ...prev, userPassword: "" }));
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="flex flex-col justify-center items-center gap-6 w-full px-4 py-8">
        <InputPassword
          inputId="confirmPassword"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              userPassword: e.target.value,
            }))
          }
          label="Hasło"
          placeholder="Potwierdź hasło..."
        />
        <button
          className="btn btn-primary w-full"
          onClick={() => handlePasswordCheck()}
        >
          {checking ? <LoadingText /> : "Potwierdź hasło"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmPassword;
