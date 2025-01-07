import { useEffect, useState } from "react";
import vodkaData from "../vodkas.json";
import Item from "./Item";

const ItemList = () => {
  const [vodkas, setVodkas] = useState([]);

  useEffect(() => {
    setVodkas(vodkaData.vodkas);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
        Lista trunków wysokoprocentowych
      </h2>
      <ul className="flex flex-col justify-center items-center lg:grid grid-cols-2 gap-2 w-full md:min-w-1/2 md:max-w-max p-2">
        {vodkas.map((vodka) => (
          <li
            key={vodka.id}
            className="bg-slate-900 rounded-lg py-2 px-4 w-full"
          >
            <Item vodka={vodka} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
