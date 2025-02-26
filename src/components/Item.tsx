// import ArrowIcon from "./ArrowIcon";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getStoreImage } from "@/utils/vodkaUtils";
import { Store, Vodka, VodkaVariant } from "@/types/VodkaProps";
import { VODKA_FLAVOR_OPTIONS } from "@/constants/filterOptions";

const Item = ({
  vodka,
  selectedVodka,
  setSelectedVodka,
  isSelected = false,
  handleVariantChange,
}: {
  vodka: Vodka;
  selectedVodka: Vodka | null;
  setSelectedVodka: Dispatch<SetStateAction<Vodka | null>>;
  isSelected?: boolean;
  handleVariantChange: (vodkaId: string, variant: VodkaVariant) => void;
}) => {
  const selected = vodka === selectedVodka;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  // Porównaj ceny w poszczególnych sklepach
  const comparisePrices = (store: Store) => {
    if (
      !selectedVodka ||
      !selectedVodka.selectedVariant ||
      !vodka.selectedVariant
    )
      return { color: "text-secondary" };

    // Pobranie ceny wybranego wariantu porównywanej wódki
    const vodkaStore = vodka.selectedVariant.stores.find(
      (s) => s.name === store.name
    );

    // Pobranie ceny wybranego wariantu aktualnie wybranej wódki
    const selectedVodkaStore = selectedVodka.selectedVariant.stores.find(
      (s) => s.name === store.name
    );

    if (vodkaStore && selectedVodkaStore) {
      if (vodkaStore.price < selectedVodkaStore.price)
        return { color: "text-green-500" }; // Tańsza
      if (vodkaStore.price > selectedVodkaStore.price)
        return { color: "text-red-500" }; // Droższa
    }

    return { color: "text-secondary" }; // Cena taka sama lub brak danych
  };

  // Porównaj średnią cenę
  const compareAveragePrice = () => {
    if (
      !selectedVodka ||
      !selectedVodka.selectedVariant ||
      !vodka.selectedVariant
    )
      return "text-secondary";

    const vodkaAveragePrice = vodka.selectedVariant.averagePrice;
    const selectedVodkaAveragePrice =
      selectedVodka.selectedVariant.averagePrice;

    if (vodkaAveragePrice < selectedVodkaAveragePrice) return "text-green-500"; // Tańsza średnio
    if (vodkaAveragePrice > selectedVodkaAveragePrice) return "text-red-500"; // Droższa średnio

    return "text-secondary"; // Średnia cena taka sama
  };

  // Select vodka on click
  const handleVodkaClick = (vodka: Vodka) => {
    if (!vodka) return;

    if (selectedVodka === vodka) {
      setSelectedVodka(null);
      return;
    }

    setSelectedVodka(vodka);
  };

  // Pretty animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (divRef.current) observer.observe(divRef.current);
    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={`relative overflow-visible flex justify-between items-stretch bg-akcent rounded-lg w-full transition-opacity duration-500 
                    ${
                      selected &&
                      !isSelected &&
                      "opacity-50 pointer-events-none"
                    } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className="flex flex-col justify-center items-center gap-6 rounded-ss-lg rounded-es-lg p-4 w-full transition-all duration-500 
                    ease-in-out cursor-pointer hover:bg-button group flex-1"
        onClick={() => handleVodkaClick(vodka)}
      >
        <div className="flex md:gap-4 flex-col md:flex-row justify-center items-center scale-110 md:scale-125">
          <h4 className="transition-all duration-500 ease-in-out group-hover:text-primary">
            {vodka.name}
          </h4>
          <span className="text-orange-500 font-bold">
            {vodka.alcoholPercentage}%
          </span>
        </div>
        <ul className="flex justify-center items-center gap-4 md:gap-10">
          {vodka.selectedVariant?.stores.map((store, storeIndex) => {
            const { color /* rotate */ } = comparisePrices(store);
            return (
              <li
                key={storeIndex}
                className="flex flex-col justify-center items-center gap-2 text-center"
              >
                <Image
                  src={getStoreImage(store.name)}
                  alt={store.name}
                  width={64}
                  height={64}
                  className="w-8 md:w-10 h-8 md:h-10"
                />
                <div className="flex justify-center items-center text-xs">
                  <span
                    className={`${color} transition-all duration-500 ease-in-out group-hover:text-slate-200`}
                  >
                    {store.price}zł
                  </span>
                  {/* {selectedVodka && selectedVodka !== vodka && (
                    <ArrowIcon
                      className={`${color} ${rotate ? "rotate-180" : ""}`}
                    />
                  )} */}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col justify-center items-center">
          <p className="text-slate-500 transition-all duration-500 ease-in-out group-hover:text-slate-300">
            Średnia cena:{" "}
            <span
              className={`${compareAveragePrice()} transition-all duration-500 ease-in-out group-hover:text-primary`}
            >
              {vodka.selectedVariant?.averagePrice}zł
            </span>
          </p>
          <span className="text-sm text-button italic transition-all duration-500 ease-in-out group-hover:text-golden">
            {VODKA_FLAVOR_OPTIONS.find(
              (option) => vodka.flavor === option.value
            )?.label || vodka.flavor}
          </span>
        </div>
      </div>

      <div className="bg-gray-100 rounded-se-lg rounded-ee-lg z-10 flex flex-col justify-between items-center min-h-full overflow-hidden">
        {vodka.variants.map((variant, index) => (
          <div
            key={index}
            className={`text-sm p-1 md:p-2 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-primary w-full flex flex-1 justify-center items-center ${
              variant === vodka.selectedVariant &&
              "bg-button text-primary pointer-events-none"
            } cursor-pointer`}
            onClick={() =>
              (selected && !isSelected) ||
              (!selected && handleVariantChange(vodka._id, variant))
            }
          >
            {variant.volume}L
          </div>
        ))}
        <Link
          href={`/vodkas/${vodka._id}`}
          className="w-full transition-colors duration-300 p-1 md:p-2 ease-in-out hover:bg-golden flex-1 border-t-2 flex justify-center items-center"
        >
          <LinkIcon className="w-6 h-6 text-header" />
        </Link>
      </div>
    </div>
  );
};

export default Item;
