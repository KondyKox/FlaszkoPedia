import { PriceHistory, Store, VodkaProps } from "@/types/VodkaProps";

// Porównaj ceny w poszczególnych sklepach
export const comparisePrices = (
  store: Store,
  vodka: VodkaProps,
  selectedVodka: VodkaProps | null
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

  const vodkaPrice = vodkaStore
    ? getLastPriceFromHistory(vodkaStore.priceHistory)
    : null;

  const selectedVodkaPrice = selectedVodkaStore
    ? getLastPriceFromHistory(selectedVodkaStore.priceHistory)
    : null;

  if (vodkaPrice !== null && selectedVodkaPrice !== null) {
    if (vodkaPrice < selectedVodkaPrice) return { color: "text-green-500" };
    if (vodkaPrice > selectedVodkaPrice) return { color: "text-red-500" };
  }

  return { color: "text-secondary" }; // Cena taka sama lub brak danych
};

// Porównaj średnią cenę
export const compareAveragePrice = (
  vodka: VodkaProps,
  selectedVodka: VodkaProps | null
) => {
  if (
    !selectedVodka ||
    !selectedVodka.selectedVariant ||
    !vodka.selectedVariant
  )
    return "text-secondary";

  const vodkaAvg = vodka.selectedVariant.averagePrice;
  const selectedAvg = selectedVodka.selectedVariant.averagePrice;

  if (vodkaAvg < selectedAvg) return "text-green-500";
  if (vodkaAvg > selectedAvg) return "text-red-500";

  return "text-secondary"; // Średnia cena taka sama
};

// Get current price of vodka
export const getLastPriceFromHistory = (history: PriceHistory[]): number => {
  if (!history || history.length === 0) {
    console.warn("Brak historii!", history);
    return 0;
  }
  const last = history[history.length - 1].price;
  return last;
};

// Oblicz średnią cenę wódki
export const calculateAveragePrice = (stores: Store[]) => {
  const prices = stores.map((s) => getLastPriceFromHistory(s.priceHistory));
  const sum = prices.reduce((a, b) => a + b, 0);
  return parseFloat((sum / prices.length).toFixed(2));
};
