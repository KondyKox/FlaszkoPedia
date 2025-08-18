import { VodkaProps } from "@/types/VodkaProps";
import RatingStars from "../ui/RatingStars";
import { compareAveragePrice } from "@/lib/utils/vodkaUtils/price";
import { VODKA_FLAVOR_OPTIONS } from "@/constants/filterOptions";
import { useSession } from "next-auth/react";
import { useSelectedVodka } from "@/hooks/useSelectedVodka";
import { useRating } from "@/hooks/useRating";

const VodkaMeta = ({ vodka }: { vodka: VodkaProps }) => {
  const { data: session, status } = useSession();
  const { selectedVodka } = useSelectedVodka();
  const { averageRating, ratingsCount, userRating, rate } = useRating(
    vodka._id,
    session?.user._id
  );

  return (
    <div
      className="flex flex-col justify-center gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Average price */}
      <p className="text-slate-700 transition-all duration-500 ease-in-out group-hover:text-slate-300">
        Średnia cena:{" "}
        <span
          className={`${compareAveragePrice(
            vodka,
            selectedVodka
          )} transition-all duration-500 ease-in-out group-hover:text-primary font-semibold`}
        >
          {vodka.selectedVariant?.averagePrice}zł
        </span>
      </p>

      {/* Rating */}
      <RatingStars
        averageRating={averageRating}
        userRating={userRating}
        ratingsCount={ratingsCount}
        editable={!!session}
        onRate={rate}
      />

      {/* Flavor */}
      <span className="text-sm text-button italic transition-all duration-500 ease-in-out group-hover:text-golden">
        {VODKA_FLAVOR_OPTIONS.find((option) => vodka.flavor === option.value)
          ?.label || vodka.flavor}
      </span>
    </div>
  );
};

export default VodkaMeta;
