import { useEffect, useState } from "react";

/**
 * Hook that returns a boolean value indicating whether the screen width is less than 768px.
 * @returns {boolean} isMobile
 */
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
