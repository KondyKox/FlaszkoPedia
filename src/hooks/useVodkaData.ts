import { VodkaProps } from "@/types/VodkaProps";
import {
  calculateAveragePrice,
  getLastPriceFromHistory,
} from "@/lib/utils/vodkaUtils/price";
import { useEffect, useState } from "react";

/**
 * Custom hook for fetching selected vodka
 * @param id id of selected vodka
 * @returns {object} - Object with 'vodka' and 'loading' state
 */
export const useVodkaData = (id: string) => {
  const [vodka, setVodka] = useState<VodkaProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchVodka = async () => {
      try {
        const res = await fetch(`/api/vodkas/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: VodkaProps = await res.json();

        const variantsWithAvg = data.variants.map((variant) => {
          const stores = variant.stores.map((store) => ({
            ...store,
            image: `/stores/${store.name.toLowerCase()}.png`,
            priceHistory: store.priceHistory,
            price: getLastPriceFromHistory(store.priceHistory),
          }));

          return {
            ...variant,
            stores,
            averagePrice: calculateAveragePrice(stores),
          };
        });

        setVodka({
          ...data,
          variants: variantsWithAvg,
          selectedVariant: variantsWithAvg[0] || null,
        });
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
