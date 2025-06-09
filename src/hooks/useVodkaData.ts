import { Vodka } from "@/types/VodkaProps";
import { calculateAveragePrice } from "@/lib/utils/vodkaUtils/filter";
import { useEffect, useState } from "react";

/**
 * Custom hook for fetching selected vodka
 * @param id id of selected vodka
 * @returns {object} - Object with 'vodka' and 'loading' state
 */
export const useVodkaData = (id: string) => {
  const [vodka, setVodka] = useState<Vodka | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchVodka = async () => {
      try {
        const res = await fetch(`/api/vodkas/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: Vodka = await res.json();
        calculateAveragePrice(data);

        const vodkaWithAvg = {
          ...data,
          selectedVariant: data.variants[0] || null,
        };

        setVodka(vodkaWithAvg);
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
