import ArrowIcon from "./ArrowIcon";

const Item = ({ vodka, selectedVodka }) => {
  const selected = vodka === selectedVodka;

  // Pobierz zdjęcie na podstawie nazwy sklepu
  const getStoreImage = (storeName) => {
    return `/stores/${storeName.toLowerCase()}.png`;
  };

  // Porównaj ceny w poszczególnych sklepach
  const comparisePrices = (store) => {
    if (!selectedVodka) return { color: "text-akcent", rotate: true };

    const selectedStore = selectedVodka.stores.find(
      (s) => s.storeName === store.storeName
    );

    if (store.price < selectedStore.price)
      return { color: "text-green-500", rotate: true }; // Cena niższa
    if (store.price > selectedStore.price)
      return { color: "text-red-500", rotate: false }; // Cena wyższa
    return { color: "text-akcent", rotate: true }; // Cena taka sama
  };

  // Porównaj średnią cenę
  const compariseAveragePrice = () => {
    if (!selectedVodka) return "text-akcent"; // Domyślny kolor, jeśli nic nie wybrano

    if (vodka.averagePrice > selectedVodka.averagePrice) return "text-red-500"; // Średnia cena wyższa
    if (vodka.averagePrice < selectedVodka.averagePrice)
      return "text-green-500"; // Średnia cena niższa
    return "text-akcent"; // Średnia cena taka sama
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-6 bg-slate-900 rounded-lg p-4 w-full transition-colors duration-300 
                    ease-in-out cursor-pointer hover:bg-slate-600 ${
                      selected && "opacity-50 pointer-events-none"
                    }`}
    >
      <div className="flex gap-4 justify-center items-center">
        <h4 className="text-purple-600">{vodka.name}</h4>
        <div className="flex justify-center items-center gap-2 font-bold">
          <span className="text-akcent">{vodka.bottleSize}L</span>
          <span className="text-orange-500">{vodka.alcoholPercentage}%</span>
        </div>
      </div>
      <ul className="grid grid-cols-2 place-items-center md:flex md:justify-center md:items-center gap-4 md:gap-10">
        {vodka.stores.map((store, storeIndex) => {
          const { color, rotate } = comparisePrices(store);
          return (
            <li
              key={storeIndex}
              className="flex flex-col justify-center items-center gap-2 text-center"
            >
              <img
                src={getStoreImage(store.storeName)}
                alt={store.storeName}
                className="w-10 h-10"
              />
              <div className="flex justify-center items-center gap-2 text-sm">
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
    </div>
  );
};

export default Item;
