import { FilterContext } from "@/context/FilterContext";
import { useContext } from "react";

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider.");
  return ctx;
};
