import Vodka from "@/types/VodkaProps";
import ArrowIcon from "./ArrowIcon";
import Store from "@/types/StoreProps";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getStoreImage } from "@/utils/vodkaUtils";

const Item = ({
  vodka,
  selectedVodka,
}: {
  vodka: Vodka;
  selectedVodka?: Vodka | null;
}) => {
  const selected = vodka === selectedVodka;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  // Porównaj ceny w poszczególnych sklepach
  const comparisePrices = (store: Store) => {
    if (!selectedVodka) return { color: "text-secondary", rotate: true };

    const selectedStore = selectedVodka.stores.find(
      (s) => s.name === store.name
    );

    if (selectedStore) {
      if (store.price < selectedStore.price)
        return { color: "text-green-500", rotate: true }; // Cena niższa
      if (store.price > selectedStore.price)
        return { color: "text-red-500", rotate: false }; // Cena wyższa
    }
    return { color: "text-secondary", rotate: true }; // Cena taka sama
  };

  // Porównaj średnią cenę
  const compariseAveragePrice = () => {
    if (!selectedVodka) return "text-secondary"; // Domyślny kolor, jeśli nic nie wybrano

    if (vodka.averagePrice > selectedVodka.averagePrice) return "text-red-500"; // Średnia cena wyższa
    if (vodka.averagePrice < selectedVodka.averagePrice)
      return "text-green-500"; // Średnia cena niższa
    return "text-secondary"; // Średnia cena taka sama
  };

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
      className={`relative overflow-visible flex flex-col justify-center items-center gap-6 bg-akcent rounded-lg p-4 w-full transition-all duration-500 
                    ease-in-out cursor-pointer hover:bg-golden ${
                      selected && "opacity-50 pointer-events-none"
                    } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex md:gap-4 flex-col md:flex-row justify-center items-center">
        <h4 className="grow">{vodka.name}</h4>
        <div className="flex justify-center items-center gap-2 font-bold">
          <span className="text-primary">{vodka.bottleSize}L</span>
          <span className="text-orange-500">{vodka.alcoholPercentage}%</span>
        </div>
      </div>
      <ul className="flex justify-center items-center gap-x-4 gap-y-4 md:gap-10">
        {vodka.stores.map((store, storeIndex) => {
          const { color, rotate } = comparisePrices(store);
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
                <span className={`${color}`}>{store.price}zł</span>
                {selectedVodka && selectedVodka !== vodka && (
                  <ArrowIcon
                    className={`${color} ${rotate ? "rotate-180" : ""}`}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-slate-500">
        Średnia cena:{" "}
        <span className={`${compariseAveragePrice()}`}>
          {vodka.averagePrice}zł
        </span>
      </p>

      <div className="absolute bottom-0 right-0 bg-gray-100 rounded-ss-lg rounded-ee-lg p-1 z-10 transition-colors duration-300 ease-in-out hover:bg-orange-400">
        <Link href={`/vodkas/${vodka._id}`} className="w-full">
          <LinkIcon className="w-6 h-6 text-header" />
        </Link>
      </div>
    </div>
  );
};

export default Item;
