"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

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

  const Icon = favorite ? HeartSolid : HeartOutline;

  return (
    <Icon
      onClick={handleClick}
      className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
      width={size}
      height={size}
      color={favorite ? "#ef4444" : "#000"} // czerwony jak ulubiony
    />
  );
};

export default FavoriteIcon;
