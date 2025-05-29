import { Vodka } from "@/types/VodkaProps";
import { createContext, useState } from "react";

interface SelectedVodkaContextType {
  selectedVodka: Vodka | null;
  setSelectedVodka: (vodka: Vodka | null) => void;
}

export const SelectedVodkaContext = createContext<
  SelectedVodkaContextType | undefined
>(undefined);

export const SelectedVodkaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedVodka, setSelectedVodka] = useState<Vodka | null>(null);

  return (
    <SelectedVodkaContext.Provider value={{ selectedVodka, setSelectedVodka }}>
      {children}
    </SelectedVodkaContext.Provider>
  );
};
