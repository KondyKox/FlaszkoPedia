const Item = ({ vodka }) => {
  const getStoreImage = (storeName) => {
    return `/stores/${storeName.toLowerCase()}.png`;
  };

  return (
    <>
      <h4 className="text-purple-600 pb-4 pt-2">
        {vodka.name}{" "}
        <span className="text-akcent">{vodka.alcohol_percentage}%</span>
      </h4>
      <ul className="grid grid-cols-2 place-items-center md:flex md:justify-center md:items-center gap-4 md:gap-10">
        {vodka.stores.map((store, storeIndex) => (
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
              <span className="text-akcent">{store.price}</span>
              <span className="text-button">PLN</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Item;
