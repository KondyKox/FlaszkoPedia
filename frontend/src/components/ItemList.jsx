import { useEffect, useState } from "react";
import Item from "./Item";
import Filter from "./Filter";

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
  const [sortBy, setSortBy] = useState("name");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    fetch("/api/vodkas")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const vodkasWithAverage = data.map((vodka) => {
          const total = vodka.stores.reduce(
            (sum, store) => sum + store.price,
            0
          );
          const averagePrice =
            Math.round((total / vodka.stores.length) * 100) / 100; // Zaokrąglanie do 2 miejsc
          return { ...vodka, averagePrice };
        });
        setVodkas(vodkasWithAverage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filtrowanie po wpisanej nazwie
  const filteredVodkas = vodkas.filter((vodka) =>
    normalizeString(vodka.name).includes(normalizeString(search))
  );

  // Sortowanie flaszek
  const sortedVodkas = (search ? filteredVodkas : vodkas).sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case "name":
        result = a.name.localeCompare(b.name, "pl");
        break;
      case "price":
        result = a.averagePrice - b.averagePrice;
        break;
      default:
        break;
    }

    return sortAscending ? result : -result;
  });

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
        <Filter
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
        />
        <ul className="flex flex-col justify-center items-center lg:grid grid-cols-2 gap-2 w-full md:w-1/2 p-2">
          {sortedVodkas.map((vodka) => (
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
