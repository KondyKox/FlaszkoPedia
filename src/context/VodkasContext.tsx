"use client";

import { VodkaProps } from "@/types/VodkaProps";
import { createContext, useEffect, useState } from "react";

interface VodkasContextType {
  vodkas: VodkaProps[];
  loading: boolean;
  handleVariantChange: (vodkaId: string, volume: number) => void;
  refreshVodkas: () => Promise<void>;
  addVodka: (vodka: VodkaProps) => void;
  updateVodka: (updatedVodka: VodkaProps) => void;
  deleteVodka: (id: string) => void;
}

export const VodkasContext = createContext<VodkasContextType | undefined>(
  undefined
);

export const VodkasProvider = ({ children }: { children: React.ReactNode }) => {
  const [vodkas, setVodkas] = useState<VodkaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVodkas = async () => {
    try {
      const response = await fetch("/api/vodkas");
      if (!response.ok) throw new Error("Nie udało się pobrać wódek.");

      const data: VodkaProps[] = await response.json();

      const sorted = data.sort((a, b) =>
        a.name.localeCompare(b.name, "pl", { sensitivity: "base" })
      );

      setVodkas(sorted);
    } catch (err) {
      console.error("Błąd przy fetchowaniu wódek:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVodkas();
  }, []);

  // Change vodka variant
  const handleVariantChange = (vodkaId: string, volume: number) => {
    if (!volume || !vodkaId) return;

    setVodkas((prev) =>
      prev.map((v) => {
        if (v._id !== vodkaId) return v;

        const foundVariant = v.variants.find((vv) => vv.volume === volume);
        if (!foundVariant) return v;

        return { ...v, selectedVariant: { ...foundVariant } };
      })
    );
  };

  // Refresh vodkas list
  const refreshVodkas = async () => {
    setLoading(true);
    await fetchVodkas();
  };

  // TODO: Update in MongoDB
  const addVodka = (vodka: VodkaProps) => {
    setVodkas((prev) => [...prev, vodka]);
  };

  const updateVodka = (updated: VodkaProps) => {
    setVodkas((prev) => prev.map((v) => (v._id === updated._id ? updated : v)));
  };

  const deleteVodka = (id: string) => {
    setVodkas((prev) => prev.filter((v) => v._id !== id));
  };

  return (
    <VodkasContext.Provider
      value={{
        vodkas,
        loading,
        handleVariantChange,
        refreshVodkas,
        addVodka,
        updateVodka,
        deleteVodka,
      }}
    >
      {children}
    </VodkasContext.Provider>
  );
};
