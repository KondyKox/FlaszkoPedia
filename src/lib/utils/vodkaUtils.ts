import { Store, Vodka } from "@/types/VodkaProps";
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

// Porównaj ceny w poszczególnych sklepach
export const comparisePrices = (
  store: Store,
  vodka: Vodka,
  selectedVodka: Vodka | null
) => {
  if (
    !selectedVodka ||
    !selectedVodka.selectedVariant ||
    !vodka.selectedVariant
  )
    return { color: "text-secondary" };

  // Pobranie ceny wybranego wariantu porównywanej wódki
  const vodkaStore = vodka.selectedVariant.stores.find(
    (s) => s.name === store.name
  );

  // Pobranie ceny wybranego wariantu aktualnie wybranej wódki
  const selectedVodkaStore = selectedVodka.selectedVariant.stores.find(
    (s) => s.name === store.name
  );

  if (vodkaStore && selectedVodkaStore) {
    if (vodkaStore.price < selectedVodkaStore.price)
      return { color: "text-green-500" }; // Tańsza
    if (vodkaStore.price > selectedVodkaStore.price)
      return { color: "text-red-500" }; // Droższa
  }

  return { color: "text-secondary" }; // Cena taka sama lub brak danych
};

// Porównaj średnią cenę
export const compareAveragePrice = (
  vodka: Vodka,
  selectedVodka: Vodka | null
) => {
  if (
    !selectedVodka ||
    !selectedVodka.selectedVariant ||
    !vodka.selectedVariant
  )
    return "text-secondary";

  const vodkaAveragePrice = vodka.selectedVariant.averagePrice;
  const selectedVodkaAveragePrice = selectedVodka.selectedVariant.averagePrice;

  if (vodkaAveragePrice < selectedVodkaAveragePrice) return "text-green-500"; // Tańsza średnio
  if (vodkaAveragePrice > selectedVodkaAveragePrice) return "text-red-500"; // Droższa średnio

  return "text-secondary"; // Średnia cena taka sama
};

// Pobierz zdjęcie na podstawie nazwy sklepu
export const getStoreImage = (storeName: string) => {
  return `/stores/${storeName.toLowerCase()}.png`;
};
