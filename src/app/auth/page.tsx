"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import FeedbackMessage from "@/components/ui/FeedbackMessage";
import { loginUser, registerUser } from "@/lib/utils/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthPage = () => {
  const [formType, setFormType] = useState<"login" | "register">("register");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const router = useRouter();

  // UI
  const toggleFormType = () => {
    if (formType === "register") setFormType("login");
    else if (formType === "login") setFormType("register");
  };

  const renderEyeIcon = () => {
    return showPassword ? (
      <EyeSlashIcon
        className="w-6 h-6 absolute -top-1 right-2 translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(false)}
      />
    ) : (
      <EyeIcon
        className="w-6 h-6 absolute -top-1 right-2 translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(true)}
      />
    );
  };

  const animateFeedback = () => {
    if (animate) return;

    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  };

  // Authorization
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
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

    animateFeedback();
  };

  const handleRegister = async () => {
    if (!repPassword) {
      console.warn("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      if (password !== repPassword) {
        console.error("Passwords do not match!");
        setFeedback("Hasła się nie zgadzają");
        setSuccessful(false);
        return;
      }

      const feedbackMessage = await registerUser(email, password);
      if (feedbackMessage) setFeedback(feedbackMessage);
      setSuccessful(true);

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

      const feedbackMessage = await loginUser(email, password);
      if (feedbackMessage) setFeedback(feedbackMessage);

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
        className="flex flex-col justify-center items-center gap-4 bg-akcent rounded-xl px-8 py-16 w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="sub-header">
          {formType === "register" ? "Rejestracja" : "Logowanie"}
        </h2>
        {formType === "register" ? (
          <RegisterForm
            setEmail={setEmail}
            setPassword={setPassword}
            setRepPassword={setRepPassword}
            showPassword={showPassword}
            renderEyeIcon={renderEyeIcon}
            loading={loading}
          />
        ) : (
          <LoginForm
            setEmail={setEmail}
            setPassword={setPassword}
            showPassword={showPassword}
            renderEyeIcon={renderEyeIcon}
            loading={loading}
          />
        )}
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
