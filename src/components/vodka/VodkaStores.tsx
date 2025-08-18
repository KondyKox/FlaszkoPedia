import { VodkaProps } from "@/types/VodkaProps";
import Store from "./Store";
import { comparisePrices } from "@/lib/utils/vodkaUtils/price";
import { useSelectedVodka } from "@/hooks/useSelectedVodka";

const VodkaStores = ({ vodka }: { vodka: VodkaProps }) => {
  const { selectedVodka } = useSelectedVodka();

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2 max-h-[200px] overflow-y-auto">
      {vodka.selectedVariant?.stores.map((store, storeIndex) => {
        const { color /* rotate */ } = comparisePrices(
          store,
          vodka,
          selectedVodka
        );

        return (
          <li
            key={storeIndex}
            className="flex justify-center items-center gap-2 text-center"
          >
            <Store store={store} className={color} />
          </li>
        );
      })}
    </ul>
  );
};

export default VodkaStores;
