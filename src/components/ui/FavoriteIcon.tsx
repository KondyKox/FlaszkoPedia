"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";

const FavoriteIcon = ({
  vodkaId,
  size = 24,
}: {
  vodkaId: string;
  size?: number;
}) => {
  const { isFavorite, toggleFavorite, loading } = useFavorites();
  if (loading) return null;

  const favorite = isFavorite(vodkaId);

  const handleClick = async () => {
    await toggleFavorite(vodkaId);
  };

  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill={favorite ? "#facc15" : "none"} // żółty fill jak ulubiony
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={favorite ? "#facc15" : "#000"} // zawsze żółty outline
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499c.26-.8 1.38-.8 1.64 0l2.1 6.453h6.23c.84 0 1.19 1.077.51 1.57l-5.04 3.67 1.92 6.254c.25.82-.68 1.5-1.39 1.01l-5.27-3.745-5.27 3.745c-.71.49-1.64-.19-1.39-1.01l1.92-6.254-5.04-3.67c-.68-.493-.33-1.57.51-1.57h6.23l2.1-6.453z"
      />
    </svg>
  );
};

export default FavoriteIcon;
