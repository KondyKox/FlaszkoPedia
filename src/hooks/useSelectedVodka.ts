import Vodka from "@/types/VodkaProps";
import { useEffect, useState } from "react";

/**
 * Custom hook for fetching selected vodka
 * @param id id of selected vodka
 * @returns {object} - Object with 'vodka' and 'loading' state
 */
export const useSelectedVodka = (id: string) => {
  const [vodka, setVodka] = useState<Vodka | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchVodka = async () => {
      try {
        const res = await fetch(`/api/vodkas/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: Vodka = await res.json();
        setVodka(data);
      } catch (error) {
        console.error("Error during fetching vodka.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVodka();
  }, [id]);

  return { vodka, loading };
};
