import { useContext } from "react";
import { VodkasContext } from "@/context/VodkasContext";

export const useVodkas = () => {
  const ctx = useContext(VodkasContext);
  if (!ctx) throw new Error("useVodkas must be used within VodkaProvider!");
  return ctx;
};
