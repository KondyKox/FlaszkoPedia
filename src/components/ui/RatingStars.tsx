import { RatingStarsProps } from "@/types/UIProps";
import { StarIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

const RatingStars = ({
  averageRating,
  ratingsCount,
  userRating = 0,
  editable = false,
  onRate,
}: RatingStarsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [localRating, setLocalRating] = useState(userRating);

  useEffect(() => {
    if (userRating && userRating > 0) setLocalRating(userRating);
    else setLocalRating(averageRating);
  });

  const handleClick = async (value: number) => {
    if (!editable || !onRate) return;
    setLocalRating(value);
    try {
      await onRate(value);
    } catch (error) {
      console.error("Error during rating submission:", error);
    }
  };

  const renderStar = (index: number) => {
    const value = index + 1;
    const filled = hovered !== null ? value <= hovered : value <= localRating;

    return (
      <span
        key={index}
        className={`text-2xl transition-all duration-100 ease-in-out cursor-${
          editable ? "pointer" : "default"
        } ${filled ? "text-yellow-500" : "text-gray-400"} ${
          editable ? "hover:scale-110 hover:text-orange-400" : ""
        }`}
        onClick={() => editable && handleClick(value)}
        onMouseEnter={() => editable && setHovered(value)}
        onMouseLeave={() => editable && setHovered(null)}
      >
        {/* Star */}
        <StarIcon className="w-6 h-6" />
      </span>
    );
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => renderStar(i))}
      <span className="text-xs text-slate-400 ml-1">({ratingsCount})</span>
    </div>
  );
};

export default RatingStars;
