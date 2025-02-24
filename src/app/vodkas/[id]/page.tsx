"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { useSelectedVodka } from "@/hooks/useSelectedVodka";
import { getStoreImage } from "@/utils/vodkaUtils";
import Image from "next/image";
import { useParams } from "next/navigation";

const VodkaPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const { vodka, loading } = useSelectedVodka(id);

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
          <div className="flex justify-center items-center gap-6">
            <h2 className="sub-header">{vodka.name}</h2>
            <div className="flex justify-center items-center gap-2 font-bold">
              <span className="text-secondary">{vodka.bottleSize}L</span>
              <span className="text-orange-500">
                {vodka.alcoholPercentage}%
              </span>
            </div>
          </div>
          <ul className="flex justify-center items-center gap-x-4 lg:gap-x-6">
            {vodka.stores.map((store, index) => (
              <li
                key={index}
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
                  <span className="font-bold">{store.price}zł</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-button text-primary w-full p-4 flex-1 rounded-es-lg rounded-ee-lg">
        {vodka.description ? vodka.description : "Brak opisu dla tej wódki. :("}
      </div>
    </section>
  );
};

export default VodkaPage;
