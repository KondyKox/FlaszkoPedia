import { useState } from "react";
import LoadingText from "../loading/LoadingText";
import CustomEyeIcon from "../ui/CustomEyeIcon";
import FeedbackMessage from "../ui/FeedbackMessage";
import Modal from "./Modal";
import { checkPassword } from "@/lib/utils/user";
import { ConfirmModalProps } from "@/types/ModalProps";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";

const ConfirmModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  setEditing,
}: ConfirmModalProps) => {
  if (!isOpen) return;

  const [checking, setChecking] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { animate, triggerAnimation } = useAnimateFeedback();

  const handlePasswordCheck = async () => {
    try {
      setChecking(true);

      const { message, success } = await checkPassword(formData.userPassword);
      if (message) setFeedback(message);
      setIsSuccessful(success);

      if (success) {
        setTimeout(() => {
          setEditing(true);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsSuccessful(false);
      setFeedback("Nie udało się sprawdzić hasła.");
    } finally {
      setChecking(false);
    }

    triggerAnimation();
    setFormData((prev) => ({ ...prev, userPassword: "" }));
  };
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <div className="justify-center items-stretch w-full relative flex rounded-xl border-2">
          <label htmlFor="confirmPassword" className="label">
            Nowe hasło
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={`${showPassword ? "text" : "password"}`}
            className="input"
            placeholder="Potwierdź hasło..."
            value={formData.userPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                userPassword: e.target.value,
              }))
            }
          />
          <CustomEyeIcon
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => handlePasswordCheck()}
        >
          {checking ? <LoadingText /> : "Potwierdź hasło"}
        </button>
        <FeedbackMessage isSuccessful={isSuccessful} animate={animate}>
          {feedback}
        </FeedbackMessage>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
