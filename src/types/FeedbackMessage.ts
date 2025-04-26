import { ReactNode } from "react";

type FeedbackMessageProps = {
  isSuccessful: boolean;
  animate: boolean;
  children: ReactNode;
};

export default FeedbackMessageProps;
