"use client";

import { VodkaProps } from "@/types/VodkaProps";
import { createContext, useState } from "react";

interface SelectedVodkaContextType {
  selectedVodka: VodkaProps | null;
  setSelectedVodka: (vodka: VodkaProps | null) => void;
}

export const SelectedVodkaContext = createContext<
  SelectedVodkaContextType | undefined
>(undefined);

export const SelectedVodkaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedVodka, setSelectedVodka] = useState<VodkaProps | null>(null);

  return (
    <SelectedVodkaContext.Provider value={{ selectedVodka, setSelectedVodka }}>
      {children}
    </SelectedVodkaContext.Provider>
  );
};
