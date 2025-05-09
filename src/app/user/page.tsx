"use client";

import LoadingOverlay from "@/components/loading/LoadingOverlay";
import CustomEyeIcon from "@/components/ui/CustomEyeIcon";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const UserPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleEditClick = () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    setEditing(false);
  };

  if (status === "loading")
    <LoadingOverlay message="Ładowanie danych użytkownika..." />;

  return (
    <section className="flex justify-center items-center gap-8 flex-col lg:flex-row w-full">
      <aside className="flex flex-col justify-center items-center gap-4 border-r-2 border-button px-4 py-6 rounded-lg bg-akcent">
        <h2 className="sub-header">{editing ? "Edytuj dane" : "Twoje dane"}</h2>
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
            defaultValue={session?.user.email}
            className={`w-full p-2 text-sm md:text-base outline-none bg-primary rounded-e-lg border-2 ${
              editing ? "border-button" : "border-primary"
            }`}
            readOnly={!editing}
          />
        </div>
        <div className="flex justify-center items-stretch w-full relative">
          <label
            htmlFor="userPassword"
            className="bg-button text-primary text-center rounded-s-lg px-4 py-2 w-1/3"
          >
            Twoje hasło
          </label>
          <input
            id="userPassword"
            name="userPassword"
            type={`${showPassword ? "text" : "password"}`}
            defaultValue={session?.user.email}
            className={`w-full p-2 text-sm md:text-base outline-none bg-primary rounded-e-lg border-2 ${
              editing ? "border-button" : "border-primary"
            }`}
            readOnly={!editing}
          />
          <CustomEyeIcon
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            className="top-2"
          />
        </div>
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
  );
};

export default UserPage;
