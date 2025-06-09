"use client";

import { Vodka } from "@/types/VodkaProps";
import { createContext, useEffect, useState } from "react";

interface VodkasContextType {
  vodkas: Vodka[];
  loading: boolean;
  refreshVodkas: () => Promise<void>;
  addVodka: (vodka: Vodka) => void;
  updateVodka: (updatedVodka: Vodka) => void;
  deleteVodka: (id: string) => void;
}

export const VodkasContext = createContext<VodkasContextType | undefined>(
  undefined
);

export const VodkasProvider = ({ children }: { children: React.ReactNode }) => {
  const [vodkas, setVodkas] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchVodkas = async () => {
    try {
      const response = await fetch("/api/vodkas");
      if (!response.ok) throw new Error("Nie udało się pobrać wódek.");

      const data: Vodka[] = await response.json();
      setVodkas(data);
    } catch (err) {
      console.error("Błąd przy fetchowaniu wódek:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVodkas();
  }, []);

  const refreshVodkas = async () => {
    setLoading(true);
    await fetchVodkas();
  };

  // TODO: Update in MongoDB
  const addVodka = (vodka: Vodka) => {
    setVodkas((prev) => [...prev, vodka]);
  };

  const updateVodka = (updated: Vodka) => {
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
