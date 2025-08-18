"use client";

import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { VODKA_FLAVOR_OPTIONS } from "@/constants/filterOptions";
import { useVodkaData } from "@/hooks/useVodkaData";
import { VodkaVariant } from "@/types/VodkaProps";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Store from "@/components/vodka/Store";
import FavoriteIcon from "@/components/ui/FavoriteIcon";
import { useSession } from "next-auth/react";
import PriceHistoryChart from "@/components/vodka/PriceHistoryChart";
import { useRating } from "@/hooks/useRating";
import RatingStars from "@/components/ui/RatingStars";

const VodkaPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const { vodka, loading } = useVodkaData(id);
  const [selectedVariant, setSelectedVariant] = useState<VodkaVariant>();
  const { data: session, status } = useSession();
  const { averageRating, ratingsCount, userRating, rate } = useRating(
    id,
    session?.user._id
  );

  useEffect(() => {
    if (vodka && vodka.variants.length > 0) {
      setSelectedVariant(vodka.variants[0]); // Ustawiamy pierwszy wariant
    }
  }, [vodka]);

  if (loading) return <LoadingOverlay message="Wczytuję wybrany trunek..." />;
  if (!id || !vodka)
    return <h1 className="header">Nie znaleziono takiej wódki.</h1>;

  return (
    <section className="flex flex-col justify-start items-center w-full md:w-2/3 min-h-screen">
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-6 w-full py-10 border-2 border-b-0 rounded-ss-lg rounded-se-lg border-button shadow-inner-button">
        <Image
          src={vodka.imageSrc}
          alt={vodka.name}
          width={128}
          height={128}
          className="drop-shadow-logo w-24 lg:w-32 xl:w-40"
        />
        <div className="flex flex-col justify-center items-center gap-4 lg:scale-125 xl:scale-150">
          <div className="flex justify-center items-center gap-6 relative">
            <h2 className="sub-header">{vodka.name}</h2>
            <h2 className="sub-header text-orange-500 font-bold">
              {vodka.alcoholPercentage}%
            </h2>
            {status === "authenticated" && (
              <div className="flex justify-center items-center -translate-y-1">
                <FavoriteIcon vodkaId={vodka._id} />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center w-full">
            {vodka.variants.map((variant: VodkaVariant, index: number) => (
              <div
                key={index}
                className={`text-sm p-1 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-primary w-full flex flex-1 justify-center items-center ${
                  variant === selectedVariant && "bg-button text-primary"
                } cursor-pointer`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.volume}L
              </div>
            ))}
          </div>
          <ul className="flex justify-center items-center gap-x-4 lg:gap-x-6">
            {selectedVariant?.stores.map((store, index) => (
              <li
                key={index}
                className="flex flex-col justify-center items-center gap-2 text-center"
              >
                <Store store={store} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-center items-center">
            <RatingStars
              averageRating={averageRating}
              ratingsCount={ratingsCount}
              userRating={userRating}
              editable={!!session}
              onRate={rate}
            />
            <p className="text-slate-500">
              Średnia cena:{" "}
              <span className="text-red-500 font-bold">
                {selectedVariant?.averagePrice}zł
              </span>
            </p>
            <span className="text-sm text-button italic">
              {VODKA_FLAVOR_OPTIONS.find(
                (option) => vodka.flavor === option.value
              )?.label || vodka.flavor}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-button text-primary w-full p-4 flex-1 rounded-es-lg rounded-ee-lg whitespace-pre-line flex flex-col gap-4">
        <PriceHistoryChart variant={selectedVariant} />
        {/* Vodka description */}
        {/* <div className="flex flex-col border-t-2 py-4">
          <h4 className="sub-header-secondary">Opis wódki</h4>
          {vodka.description && (
            <div dangerouslySetInnerHTML={{ __html: vodka.description }} />
          )}
        </div> */}
      </div>
    </section>
  );
};

export default VodkaPage;
