import { useState } from "react";
import LoadingText from "../loading/LoadingText";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { SocialButtonProps } from "@/types/AuthProps";

const SocialButton = ({
  provider,
  setFeedback,
  setSuccessful,
}: SocialButtonProps) => {
  const [pending, setPending] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setPending(true);
      signIn(provider, { callbackUrl: "/" });

      setFeedback(`Zalogowano przy użyciu ${provider}`);
      setSuccessful(true);
    } catch (error) {
      console.error(`Cannot sign in with ${provider}`);
      setFeedback(`Nie udało się zalogować za pomocą ${provider}`);
      setSuccessful(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <button className="btn btn-provider" onClick={handleClick} type="button">
      {pending ? (
        <LoadingText />
      ) : (
        <>
          {provider === "google" ? <FaGoogle /> : <FaFacebook />}
          <span className="hidden xl:flex">Zaloguj przez {provider}</span>
        </>
      )}
    </button>
  );
};

export default SocialButton;
