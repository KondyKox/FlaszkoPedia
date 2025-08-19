import { useVodkas } from "./useVodkas";

/**
 * Custom hook for fetching selected vodka
 * @param id id of selected vodka
 * @returns {object} - Object with 'vodka' and 'loading' state
 */
export const useVodkaData = (id: string) => {
  const { vodkas, loading: vodkasLoading } = useVodkas();

  const vodka = vodkas.find((v) => v._id === id) || null;

  // loading true, jeśli context jeszcze ładuje lub wódka nie istnieje
  const loading = vodkasLoading || !vodka;

  return { vodka, loading };
};
