import FeedbackMessageProps from "@/types/FeedbackMessage";

const FeedbackMessage = ({
  isSuccessful,
  animate,
  children,
}: FeedbackMessageProps) => {
  return (
    <span
      className={`transition-all duration-500 ease-in-out italic text-sm ${
        isSuccessful ? "text-green-500" : "text-red-500"
      } ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {children}
    </span>
  );
};

export default FeedbackMessage;
