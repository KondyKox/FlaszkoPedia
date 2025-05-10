import { Vodka } from "@/types/VodkaProps";
import { normalizeString } from "./normalizeString";

// Filtrowanie po nazwie i po pojemności butelki
export const filterVodkas = (
  vodkas: Vodka[],
  search: string,
  flavorFilter: string,
  bottleSizeFilter: number
) => {
  let filteredVodkas = vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );

  if (flavorFilter && flavorFilter !== "")
    filteredVodkas = filteredVodkas.filter(
      (vodka) => vodka.flavor === flavorFilter
    );

  // Filtrowanie po pojemności (modyfikacja selectedVariant)
  filteredVodkas = filteredVodkas.map((vodka) => {
    const selectedVariant = vodka.variants.find(
      (variant) => variant.volume === bottleSizeFilter
    );

    return selectedVariant
      ? { ...vodka, selectedVariant: selectedVariant || vodka.variants[0] }
      : vodka;
  });

  return filteredVodkas;
};

// Sortowanie flaszek
export const sortVodkas = (
  vodkas: Vodka[],
  sortBy: string,
  sortAscending: boolean
) => {
  return vodkas.sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case "name":
        result = a.name.localeCompare(b.name, "pl");
        break;
      case "price":
        // Sortowanie po średniej cenie z wariantów
        const aAveragePrice =
          a.variants.length > 0
            ? a.variants.reduce(
                (sum, variant) => sum + variant.averagePrice,
                0
              ) / a.variants.length
            : 0;
        const bAveragePrice =
          b.variants.length > 0
            ? b.variants.reduce(
                (sum, variant) => sum + variant.averagePrice,
                0
              ) / b.variants.length
            : 0;
        result = aAveragePrice - bAveragePrice;
        break;
      default:
        break;
    }

    return sortAscending ? result : -result;
  });
};

// Oblicz średnią cenę wódki
export const calculateAveragePrice = (vodka: Vodka) => {
  vodka.variants.forEach((variant) => {
    const total = variant.stores.reduce((sum, store) => sum + store.price, 0);
    // Przypisz obliczoną średnią cenę do wariantu
    variant.averagePrice =
      Math.round((total / variant.stores.length) * 100) / 100;
  });
};

// Pobierz zdjęcie na podstawie nazwy sklepu
export const getStoreImage = (storeName: string) => {
  return `/stores/${storeName.toLowerCase()}.png`;
};
