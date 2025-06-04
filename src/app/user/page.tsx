"use client";

import Item from "@/components/Item";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import LoadingText from "@/components/loading/LoadingText";
import ConfirmModal from "@/components/modal/confirm-modal";
import CustomEyeIcon from "@/components/ui/CustomEyeIcon";
import FeedbackMessage from "@/components/ui/FeedbackMessage";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import { useFavorites } from "@/hooks/useFavorites";
import { updateUser } from "@/lib/utils/user";
import { FormData } from "@/types/AuthProps";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
  const { favorites, loading } = useFavorites();
  const [editing, setEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session, status, update } = useSession();
  const [formData, setFormData] = useState<FormData>({
    email: session?.user.email || "",
    password: "",
    repPassword: "",
  });
  const [feedback, setFeedback] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { animate, triggerAnimation } = useAnimateFeedback();
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: session?.user.email || "" }));
  }, [session?.user.email]);

  const handleEditClick = async () => {
    if (!editing) {
      setIsModalOpen(true);
      return;
    }

    try {
      const { message, success } = await updateUser(
        formData.email,
        formData.password
      );
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

  if (status === "loading")
    return <LoadingOverlay message="Ładowanie danych użytkownika..." />;

  if (!session?.user) router.push("/");

  console.log(session?.user.role);

  return (
    <>
      <section className="flex justify-center gap-8 flex-col lg:flex-row w-full">
        <aside className="flex flex-col items-center gap-8 w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-button px-4 py-10 rounded-lg bg-akcent">
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
              value={formData.email}
              placeholder="Puste pole = brak zmiany"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
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
        <aside className="flex flex-col justify-between items-center gap-4 w-full lg:w-1/3">
          <h2 className="sub-header-secondary w-full rounded-xl p-2">
            Ulubione wódki
          </h2>
          {loading ? (
            <div className="bg-button rounded-full py-2 w-full">
              <LoadingText />
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-1 justify-center items-center text-2xl bg-red-600 text-primary w-full rounded-2xl font-bold uppercase">
              Brak wódek 😔
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2 overflow-y-auto max-h-[500px]">
              {favorites.map((fav) => (
                <div key={fav._id} className="flex-1">
                  <Item vodka={fav} />
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>

      {/* Modal for confirming user's password */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        setEditing={setEditing}
      />
    </>
  );
};

export default UserPage;
