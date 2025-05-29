import { Vodka } from "@/types/VodkaProps";
import { useCallback, useEffect, useState } from "react";
import { useVodkas } from "./useVodkas";

export const useFavorites = () => {
  const { vodkas } = useVodkas();
  const [favoritesIDs, setFavoritesIDs] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFavoritesIDs = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/vodkas/favorites");
      if (!res.ok) throw new Error("Failed to fetch favorites.");

      const data: string[] = await res.json();
      setFavoritesIDs(data);
    } catch (error) {
      console.error("useFavorites error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoritesIDs();
  }, [fetchFavoritesIDs]);

  useEffect(() => {
    if (!vodkas || vodkas.length === 0 || favoritesIDs.length === 0) return;

    const favoritesVodkas = vodkas.filter((vodka) =>
      favoritesIDs.includes(vodka._id)
    );
    setFavorites(favoritesVodkas);
  }, [vodkas, favoritesIDs]);

  return { favorites, loading, refresh: fetchFavoritesIDs };
};
