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
  session: Session | null
) => {
  let filteredVodkas = vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );

  if (flavorFilter && flavorFilter !== "")
    filteredVodkas = filteredVodkas.filter(
      (vodka) => vodka.flavor === flavorFilter
    );

  if (onlyFavorites && session?.user?.favorites) {
    filteredVodkas = filteredVodkas.filter((vodka) =>
      session.user.favorites?.includes(vodka._id)
    );
  }

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
