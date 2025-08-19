import { VodkaProps } from "@/types/VodkaProps";
import { normalizeString } from "../normalizeString";
import { Session } from "next-auth";

// Filtrowanie po nazwie i po pojemności butelki
export const filterVodkas = (
  vodkas: VodkaProps[],
  search: string,
  flavorFilter: string,
  bottleSizeFilter: number,
  onlyFavorites: boolean,
  favorites: VodkaProps[]
) => {
  let filteredVodkas = vodkas.filter((v) =>
    normalizeString(v.name).includes(normalizeString(search))
  );

  if (flavorFilter)
    filteredVodkas = filteredVodkas.filter((v) => v.flavor === flavorFilter);

  if (onlyFavorites) {
    filteredVodkas = filteredVodkas.filter((v) =>
      favorites.some((fav) => fav._id === v._id)
    );
  }

  filteredVodkas = filteredVodkas.map((v) => {
    const selectedVariant =
      v.variants.find((variant) => variant.volume === bottleSizeFilter) ??
      v.variants[0];
    return { ...v, selectedVariant };
  });

  return filteredVodkas;
};

// Sortowanie flaszek
export const sortVodkas = (
  vodkas: VodkaProps[],
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
                (sum, variant) => sum + variant.averagePrice!,
                0
              ) / a.variants.length
            : 0;
        const bAveragePrice =
          b.variants.length > 0
            ? b.variants.reduce(
                (sum, variant) => sum + variant.averagePrice!,
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
