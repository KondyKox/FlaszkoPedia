import { Dispatch, SetStateAction } from "react";

interface SocialButtonProps {
  provider: "google" | "facebook";
  setFeedback: Dispatch<SetStateAction<string>>;
  setSuccessful: Dispatch<SetStateAction<boolean>>;
}

export default SocialButtonProps;
