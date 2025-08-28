import { useFeedbacks } from "@/hooks/useFeedbacks";
import { useEffect, useState } from "react";

const FeedbackContainer = () => {
  const { feedbacks, removeFeedback } = useFeedbacks();
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const newVisibles: Record<string, boolean> = {};
    feedbacks.forEach((f) => {
      newVisibles[f.id] = true;
    });
    setVisible((prev) => ({ ...prev, ...newVisibles }));
  }, [feedbacks]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      setVisible((prev) => ({ ...prev, [custom.detail]: false }));
    };
    document.addEventListener("hide-feedback", handler);
    return () => document.removeEventListener("hide-feedback", handler);
  }, []);

  const handleAnimationEnd = (id: string) => {
    if (!visible[id]) {
      removeFeedback(id);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {feedbacks.map((f) => (
        <div
          key={f.id}
          onAnimationEnd={() => handleAnimationEnd(f.id)}
          className={`px-4 py-2 rounded-lg shadow-md text-white ${
            f.isSuccessful ? "bg-green-500" : "bg-red-500"
          } ${visible[f.id] ? "animate-slide-in" : "animate-slide-out"}`}
        >
          {f.message}
        </div>
      ))}
    </div>
  );
};

export default FeedbackContainer;
