import { useEffect, useState } from "react";
import vodkaData from "../vodkas.json";
import Item from "./Item";

// Funkcja do usuwania polskich znaków
const normalizeString = (str) => {
  return str
    .normalize("NFD") // Rozbija znaki na podstawowe i akcenty
    .replace(/[\u0300-\u036f]/g, "") // Usuwa akcenty
    .toLowerCase();
};

const ItemList = ({ search }) => {
  const [vodkas, setVodkas] = useState([]);
  const [selectedVodka, setSelectedVodka] = useState(null);

  useEffect(() => {
    setVodkas(vodkaData.vodkas);
  }, []);

  const filteredVodkas = vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );

  return (
    <>
      {selectedVodka && (
        <div
          className="flex flex-col justify-center items-center gap-4 w-full md:w-1/3 p-2"
          onClick={() => setSelectedVodka(null)}
        >
          <h2 className="sub-header">Wybrany napój bogów</h2>
          <Item vodka={selectedVodka} />
        </div>
      )}
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h2 className="sub-header">Lista trunków wysokoprocentowych</h2>
        <ul className="flex flex-col justify-center items-center lg:grid grid-cols-2 gap-2 w-full md:w-1/2 p-2">
          {(search ? filteredVodkas : vodkas).map((vodka) => (
            <li
              key={vodka.id}
              onClick={() => setSelectedVodka(vodka)}
              className="w-full "
            >
              <Item vodka={vodka} selectedVodka={selectedVodka} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ItemList;
