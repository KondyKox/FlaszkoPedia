import { VodkaProps } from "@/types/VodkaProps";
import { calculateAveragePrice, getLastPriceFromHistory } from "./price";
import { getLastDateFromHistory } from "./date";

// Format vodka object
export const formatVodkaForFrontend = (vodka: VodkaProps) => {
  const variants = vodka.variants.map((variant) => {
    const stores = variant.stores.map((store) => {
      const priceHistory = store.priceHistory ?? [];

      return {
        name: store.name,
        image: `/stores/${store.name.toLowerCase()}.png`,
        priceHistory,
        price: getLastPriceFromHistory(priceHistory),
        lastUpdate: getLastDateFromHistory(priceHistory),
      };
    });

    return {
      volume: variant.volume,
      stores,
      averagePrice: calculateAveragePrice(stores),
    };
  });

  return {
    _id: vodka._id,
    name: vodka.name,
    imageSrc: vodka.imageSrc,
    alcoholPercentage: vodka.alcoholPercentage,
    flavor: vodka.flavor,
    variants,
    selectedVariant: variants[0],
    averageRating: vodka.averageRating,
    ratingsCount: vodka.ratingsCount,
  };
};
