"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialButton from "@/components/auth/SocialButton";
import FeedbackMessage from "@/components/ui/FeedbackMessage";
import { useAnimateFeedback } from "@/hooks/useAnimateFeedback";
import { registerUser } from "@/lib/utils/auth";
import { FormData } from "@/types/AuthProps";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthPage = () => {
  const [formType, setFormType] = useState<"login" | "register">("register");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const { animate, triggerAnimation } = useAnimateFeedback();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    repPassword: "",
  });

  // UI
  const toggleFormType = () => {
    if (formType === "register") setFormType("login");
    else if (formType === "login") setFormType("register");
  };

  // Authorization
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.warn("All fields are required!");
      return;
    }

    switch (formType) {
      case "register":
        handleRegister();
        break;
      case "login":
        handleLogin();
        break;
      default:
        break;
    }

    triggerAnimation();
  };

  const handleRegister = async () => {
    if (!formData.repPassword) {
      console.warn("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      if (formData.password !== formData.repPassword) {
        console.error("Passwords do not match!");
        setFeedback("Hasła się nie zgadzają");
        setSuccessful(false);
        return;
      }

      const { message, success } = await registerUser(
        formData.email,
        formData.password
      );
      if (message) setFeedback(message);
      setSuccessful(success);

      handleLogin();
    } catch (error) {
      setFeedback("Nie udało się zarejestrować");
      setSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setFeedback(res.error || "Nie udało się zalogować.");
        setSuccessful(false);
        return;
      }

      setFeedback("Zalogowano pomyślnie");
      setSuccessful(true);

      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setFeedback("Nie udało się zalogować");
      setSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full lg:w-1/2">
      <form
        className="flex flex-col justify-center items-center gap-4 bg-akcent rounded-xl px-8 py-16 w-full shadow-[0_0_1rem_black]"
        onSubmit={handleSubmit}
      >
        <h2 className="sub-header">
          {formType === "register" ? "Rejestracja" : "Logowanie"}
        </h2>
        {formType === "register" ? (
          <RegisterForm setFormData={setFormData} loading={loading} />
        ) : (
          <LoginForm setFormData={setFormData} loading={loading} />
        )}
        <div className="flex justify-center items-center gap-4 w-full lg:w-1/2">
          <SocialButton
            provider="google"
            setFeedback={setFeedback}
            setSuccessful={setSuccessful}
          />
          <SocialButton
            provider="facebook"
            setFeedback={setFeedback}
            setSuccessful={setSuccessful}
          />
        </div>
        <FeedbackMessage isSuccessful={successful} animate={animate}>
          {feedback}
        </FeedbackMessage>
      </form>
      <button
        className="btn btn-secondary w-full py-2"
        onClick={toggleFormType}
      >
        {formType === "register"
          ? "Masz już konto? Zaloguj się tutaj!"
          : "Nie masz konta? Tu masz rejestrację!"}
      </button>
    </div>
  );
};

export default AuthPage;
