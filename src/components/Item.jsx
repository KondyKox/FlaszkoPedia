import ArrowIcon from "./ArrowIcon";

const Item = ({ vodka, selectedVodka }) => {
  const selected = vodka === selectedVodka;

  // Pobierz zdjęcie na podstawie nazwy sklepu
  const getStoreImage = (storeName) => {
    return `/stores/${storeName.toLowerCase()}.png`;
  };

  // Porównaj ceny w poszczególnych sklepach
  const comparisePrice = (store) => {
    if (!selectedVodka) return { color: "text-akcent", rotate: true };

    const selectedStore = selectedVodka.stores.find(
      (s) => s.store_name === store.store_name
    );

    if (store.price < selectedStore.price)
      return { color: "text-green-500", rotate: true }; // Cena niższa
    if (store.price > selectedStore.price)
      return { color: "text-red-500", rotate: false }; // Cena wyższa
    return { color: "text-akcent", rotate: true }; // Cena taka sama
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-6 bg-slate-900 rounded-lg p-4 w-full transition-colors duration-300 
                    ease-in-out cursor-pointer hover:bg-slate-600 ${
                      selected && "opacity-50 pointer-events-none"
                    }`}
    >
      <h4 className="text-purple-600">
        {vodka.name}{" "}
        <span className="text-akcent">{vodka.alcohol_percentage}%</span>
      </h4>
      <ul className="grid grid-cols-2 place-items-center md:flex md:justify-center md:items-center gap-4 md:gap-10">
        {vodka.stores.map((store, storeIndex) => {
          const { color, rotate } = comparisePrice(store);
          return (
            <li
              key={storeIndex}
              className="flex flex-col justify-center items-center gap-2 text-center"
            >
              <img
                src={getStoreImage(store.store_name)}
                alt={store.store_name}
                className="w-10 h-10"
              />
              <div className="flex justify-center items-center gap-2 text-sm">
                <span className={`${color}`}>{store.price}zł</span>
                {/* <img
                  src="/arrow.svg"
                  alt="Cena"
                  className={`w-6 h-6 ${color} ${rotate ? "rotate-180" : ""}`}
                /> */}
                <ArrowIcon
                  className={`${color} ${rotate ? "rotate-180" : ""}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Item;
