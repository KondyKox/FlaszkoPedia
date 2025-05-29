import { SelectedVodkaContext } from "@/context/SelectedVodkaContext";
import { useContext } from "react";

export const useSelectedVodka = () => {
  const ctx = useContext(SelectedVodkaContext);
  if (!ctx)
    throw new Error(
      "useSelectedVodka must be used within SelectedVodkaProvider."
    );
  return ctx;
};
