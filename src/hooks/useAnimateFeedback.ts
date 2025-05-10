import { useCallback, useState } from "react";

export const useAnimateFeedback = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const triggerAnimation = useCallback(() => {
    if (animate) return;

    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  }, [animate]);

  return { animate, triggerAnimation };
};
