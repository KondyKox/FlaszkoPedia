import { normalizeString } from "./normalizeString";

// Filtrowanie po nazwie
export const filterVodkasBySearch = (vodkas, search) => {
  return vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );
};

// Sortowanie flaszek
export const sortVodkas = (vodkas, sortBy, sortAscending) => {
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
