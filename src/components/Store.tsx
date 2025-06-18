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
    <>
      <Image
        src={store.image}
        alt={store.name}
        width={64}
        height={64}
        className="w-8 md:w-10 h-8 md:h-10"
      />
      <div className="flex justify-center items-center text-xs">
        {!isAdmin ? (
          <span
            className={`${className} transition-all duration-500 ease-in-out group-hover:text-slate-200`}
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
    </>
  );
};

export default Store;
