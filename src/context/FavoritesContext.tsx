"use client";

import { useVodkas } from "@/hooks/useVodkas";
import { Vodka } from "@/types/VodkaProps";
import { createContext, useCallback, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: Vodka[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Vodka[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { vodkas } = useVodkas();

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/vodkas/favorites");
      if (!res.ok) throw new Error("Błąd ładowania ulubionych.");
      const data: Vodka[] = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Favorites fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const isFavorite = (id: string) =>
    favorites.some((vodka) => vodka._id === id);

  const toggleFavorite = async (id: string) => {
    const isFav = isFavorite(id);

    try {
      const res = await fetch("/api/vodkas/favorites", {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vodkaId: id }),
      });

      if (!res.ok) throw new Error("Nie udało się zmienić ulubionych");

      if (isFav) {
        setFavorites((prev) => prev.filter((vodka) => vodka._id !== id));
      } else {
        const vodkaToAdd = vodkas.find((v) => v._id === id);
        if (vodkaToAdd) {
          setFavorites((prev) => [...prev, vodkaToAdd]);
        }
      }

      // Można też zrobić re-fetch dla bezpieczeństwa
      //   await fetchFavorites();
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, loading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
