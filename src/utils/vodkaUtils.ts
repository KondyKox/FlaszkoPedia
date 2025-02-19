import Vodka from "@/types/VodkaProps";
import { normalizeString } from "./normalizeString";

// Filtrowanie po nazwie i po pojemności butelki
export const filterVodkas = (
  vodkas: Vodka[],
  search: string,
  bottleSizeFilter: string
) => {
  let filteredVodkas = vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );

  if (bottleSizeFilter) {
    const selectedSize = parseFloat(bottleSizeFilter);
    filteredVodkas = filteredVodkas.filter(
      (vodka) => Math.abs(vodka.bottleSize - selectedSize) < 0.01 // Tolerancja 0.01 dla porównania
    );
  }

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
        result = a.averagePrice - b.averagePrice;
        break;
      default:
        break;
    }

    return sortAscending ? result : -result;
  });
};
