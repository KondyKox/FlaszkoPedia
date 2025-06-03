import { Vodka } from "@/types/VodkaProps";
import { useCallback, useEffect, useState } from "react";
import { useVodkas } from "./useVodkas";

export const useFavorites = () => {
  const { vodkas } = useVodkas();
  const [favorites, setFavorites] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFavoritesIDs = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/vodkas/favorites");
      if (!res.ok) throw new Error("Failed to fetch favorites.");

      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("useFavorites error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoritesIDs();
  }, [fetchFavoritesIDs]);

  return { favorites, loading, refresh: fetchFavoritesIDs };
};
