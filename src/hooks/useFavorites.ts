import { Vodka } from "@/types/VodkaProps";
import { useCallback, useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/vodkas/favorites");
      if (!res.ok) throw new Error("Failed to fetch favorites.");

      const data: Vodka[] = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("useFavorites error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, refresh: fetchFavorites };
};
