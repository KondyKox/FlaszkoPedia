import { FavoritesContext } from "@/context/FavoritesContext";
import { useContext } from "react";

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider.");
  return ctx;
};
