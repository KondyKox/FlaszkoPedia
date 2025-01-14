import { useEffect, useState } from "react";
import Item from "./Item";
import Filter from "./Filter";
import SelectedVodka from "./SelectedVodka";
import { filterVodkas, sortVodkas } from "../utils/vodkaUtils";

const ItemList = () => {
  const [vodkas, setVodkas] = useState([]);
  const [selectedVodka, setSelectedVodka] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortAscending, setSortAscending] = useState(true);
  const [bottleSizeFilter, setBottleSizeFilter] = useState("");

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

  // Filtrowanie i sortowanie
  const filteredVodkas = filterVodkas(vodkas, search, bottleSizeFilter);
  const sortedVodkas = sortVodkas(filteredVodkas, sortBy, sortAscending);

  return (
    <>
      {selectedVodka && (
        <SelectedVodka
          selectedVodka={selectedVodka}
          setSelectedVodka={setSelectedVodka}
        />
      )}
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <h2 className="sub-header">Lista trunków wysokoprocentowych</h2>
        <Filter
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
          setBottleSizeFilter={setBottleSizeFilter}
        />
        <ul className="grid place-items-center grid-cols-1 xl:grid-cols-2 gap-2 w-full md:w-1/2 p-2">
          {sortedVodkas.map((vodka) => (
            <li
              key={vodka.id}
              onClick={() => setSelectedVodka(vodka)}
              className="w-full"
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
