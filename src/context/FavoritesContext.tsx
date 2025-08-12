"use client";

import { useVodkas } from "@/hooks/useVodkas";
import { VodkaProps } from "@/types/VodkaProps";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: VodkaProps[];
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
  const [favorites, setFavorites] = useState<VodkaProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { vodkas } = useVodkas();
  const { data: session, status } = useSession();

  const fetchFavorites = useCallback(async () => {
    if (status !== "authenticated") {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/vodkas/favorites");
      if (!res.ok) throw new Error("Fetch favorites error.");
      const data: VodkaProps[] = await res.json();
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

      if (!res.ok) throw new Error("Failed to update favorites.");

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
