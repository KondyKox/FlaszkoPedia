import { getStoreImage } from "@/lib/utils/vodkaUtils";
import { StoreComponentProps } from "@/types/VodkaProps";
import Image from "next/image";

const Store = ({ store, className }: StoreComponentProps) => {
  return (
    <>
      <Image
        src={getStoreImage(store.name)}
        alt={store.name}
        width={64}
        height={64}
        className="w-8 md:w-10 h-8 md:h-10"
      />
      <div className="flex justify-center items-center text-xs">
        <span
          className={`${className} transition-all duration-500 ease-in-out group-hover:text-slate-200`}
        >
          {store.price}zł
        </span>
        {/* {selectedVodka && selectedVodka !== vodka && (
          <ArrowIcon className={`${color} ${rotate ? "rotate-180" : ""}`} />
        )} */}
      </div>
    </>
  );
};

export default Store;
