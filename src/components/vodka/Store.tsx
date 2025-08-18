import { formatDate } from "@/lib/utils/vodkaUtils/date";
import { StoreComponentProps } from "@/types/VodkaProps";
import Image from "next/image";
import { useEffect, useState } from "react";

const Store = ({
  store,
  className,
  isAdmin = false,
  setFormData,
  variantIndex,
}: StoreComponentProps) => {
  const [localPrice, setLocalPrice] = useState<string>(store.price.toFixed(2));

  useEffect(() => {
    setLocalPrice(store.price.toFixed(2));
  }, [store.price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrice(e.target.value);
    const parsed = parseFloat(e.target.value);

    if (!isNaN(parsed) && setFormData && variantIndex !== undefined) {
      setFormData((prev) => {
        const updatedVariants = [...prev.variants];
        const updatedStores = updatedVariants[variantIndex].stores.map((s) =>
          s.name === store.name ? { ...s, price: parsed } : s
        );

        updatedVariants[variantIndex] = {
          ...updatedVariants[variantIndex],
          stores: updatedStores,
        };

        return {
          ...prev,
          variants: updatedVariants,
        };
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-white/70 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      title={
        store.lastUpdate
          ? `Ostatnia aktualizacja: ${formatDate(store.lastUpdate)}`
          : ""
      }
    >
      <Image
        src={store.image}
        alt={store.name}
        width={64}
        height={64}
        className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-white p-2"
      />
      <div className="flex justify-center items-center text-xs">
        {!isAdmin ? (
          <span
            className={`${className} font-semibold px-2 py-0.5 rounded-md bg-slate-100 group-hover:bg-slate-200 transition-colors`}
          >
            {store.price}zł
          </span>
        ) : (
          <input
            id={`vodkaPrice-${store.name}`}
            name={`vodkaPrice-${store.name}`}
            type="number"
            className="input"
            min={0}
            step="0.01"
            required
            placeholder={`Jaka cena w ${store.name}...`}
            value={localPrice}
            onChange={(e) => handlePriceChange(e)}
          />
        )}
        {/* {selectedVodka && selectedVodka !== vodka && (
          <ArrowIcon className={`${color} ${rotate ? "rotate-180" : ""}`} />
        )} */}
      </div>
    </div>
  );
};

export default Store;
