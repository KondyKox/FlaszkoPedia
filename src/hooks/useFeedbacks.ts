import { FeedbackContext } from "@/context/FeedbackContext";
import { useContext } from "react";

export const useFeedbacks = () => {
  const ctx = useContext(FeedbackContext);
  if (!ctx)
    throw new Error("useFeedbacks must be used within FeedbackProvider.");
  return ctx;
};
