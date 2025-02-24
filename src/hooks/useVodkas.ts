import Vodka from "@/types/VodkaProps";
import { useEffect, useState } from "react";

export const useVodkas = () => {
  const [vodkas, setVodkas] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Hook to collect list of vodkas from the API
   * @returns {object} - Object with 'vodkas' and 'loading' state
   */

  useEffect(() => {
    /**
     * Collect data & count average price for each vodka
     */
    const fetchVodkas = async () => {
      try {
        const response = await fetch("/api/vodkas");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data: Vodka[] = await response.json();

        const vodkasWithAverage = data.map((vodka) => {
          const total = vodka.stores.reduce(
            (sum, store) => sum + store.price,
            0
          );
          const averagePrice =
            Math.round((total / vodka.stores.length) * 100) / 100;
          return { ...vodka, averagePrice };
        });

        setVodkas(vodkasWithAverage);
      } catch (error) {
        console.error("Error fetching vodka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVodkas();
  }, []);

  return { vodkas, loading };
};
