"use client";

import FeedbackContainer from "@/components/ui/FeedbackContainer";
import { createContext, ReactNode, useState } from "react";

interface Feedback {
  id: string;
  message: string;
  isSuccessful: boolean;
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  addFeedback: (message: string, isSuccessful: boolean) => void;
  removeFeedback: (id: string) => void;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const addFeedback = (message: string, isSuccessful: boolean) => {
    const id = Date.now().toString();
    setFeedbacks((prev) => [...prev, { id, message, isSuccessful }]);

    setTimeout(() => {
      //   removeFeedback(id);
      document.dispatchEvent(new CustomEvent("hide-feedback", { detail: id }));
    }, 3000);
  };

  const removeFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, addFeedback, removeFeedback }}
    >
      {children}
      <FeedbackContainer />
    </FeedbackContext.Provider>
  );
};
