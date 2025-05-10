"use client";

import LoadingOverlay from "@/components/loading/LoadingOverlay";
import LoadingText from "@/components/loading/LoadingText";
import Modal from "@/components/Modal";
import CustomEyeIcon from "@/components/ui/CustomEyeIcon";
import FeedbackMessage from "@/components/ui/FeedbackMessage";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import { checkPassword, updateUser } from "@/lib/utils/user";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session, status, update } = useSession();
  const [newEmail, setNewEmail] = useState<string>(session?.user.email || "");
  const [newPass, setNewPass] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { animate, triggerAnimation } = useAnimateFeedback();
  const [checking, setChecking] = useState<boolean>(false);

  useEffect(() => {
    setNewEmail(session?.user.email || "");
  }, [session?.user.email]);

  const handleEditClick = async () => {
    if (!editing) {
      setIsModalOpen(true);
      return;
    }

    try {
      const { message, success } = await updateUser(newEmail, newPass);
      if (message) setFeedback(message);

      setIsSuccessful(success);
      await update();
    } catch (error) {
      console.error(error);
      setIsSuccessful(false);
      setFeedback("Nie udało się zaktualizować danych.");
    }

    triggerAnimation();
    setEditing(false);
  };

  const handlePasswordCheck = async () => {
    try {
      setChecking(true);

      const { message, success } = await checkPassword(userPass);
      if (message) setFeedback(message);
      setIsSuccessful(success);

      if (success) {
        setTimeout(() => {
          setEditing(true);
          setIsModalOpen(false);
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
    setUserPass("");
  };

  if (status === "loading")
    <LoadingOverlay message="Ładowanie danych użytkownika..." />;

  return (
    <>
      <section className="flex justify-center items-center gap-8 flex-col lg:flex-row w-full">
        <aside className="flex flex-col justify-center items-center gap-4 border-b-2 lg:border-b-0 lg:border-r-2 border-button px-4 py-6 rounded-lg bg-akcent">
          <h2 className="sub-header">
            {editing ? "Edytuj dane" : "Twoje dane"}
          </h2>
          <div className="flex justify-center items-stretch w-full">
            <label
              htmlFor="userEmail"
              className="bg-button text-primary text-center rounded-s-lg px-4 py-2 w-1/3"
            >
              Twój email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={newEmail}
              placeholder="Puste pole = brak zmiany"
              onChange={(e) => setNewEmail(e.target.value)}
              className={`w-full p-2 text-sm md:text-base outline-none bg-primary rounded-e-lg border-2 ${
                editing ? "border-button" : "border-primary"
              }`}
              readOnly={!editing}
            />
          </div>
          <div
            className={`justify-center items-stretch w-full relative ${
              editing ? "flex" : "hidden"
            }`}
          >
            <label
              htmlFor="userPassword"
              className="bg-button text-primary text-center rounded-s-lg px-4 py-2 w-1/3"
            >
              Nowe hasło
            </label>
            <input
              id="userPassword"
              name="userPassword"
              type={`${showPassword ? "text" : "password"}`}
              className="w-full p-2 text-sm md:text-base outline-none bg-primary rounded-e-lg border-2 border-button"
              placeholder="Puste pole = brak zmiany"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <CustomEyeIcon
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              className="top-2"
            />
          </div>
          <FeedbackMessage isSuccessful={isSuccessful} animate={animate}>
            {feedback}
          </FeedbackMessage>
          {/* User buttons */}
          <nav className="flex justify-center items-center flex-col lg:flex-row gap-4 w-full border-t-2 py-4">
            <button
              className="btn btn-primary flex-1 w-full"
              onClick={() => handleEditClick()}
            >
              {editing ? "Zapisz" : "Edycja"}
            </button>
            <button
              className="btn btn-danger flex-1 w-full"
              onClick={() => signOut()}
            >
              Wyloguj
            </button>
          </nav>
        </aside>
        <aside className="flex flex-col justify-center items-center gap-4">
          <h2 className="sub-header">Ulubione wódki</h2>
          <div>Brak wódek :(</div>
        </aside>
      </section>

      {/* Modal for confirming user's password */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
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
    </>
  );
};

export default UserPage;
