"use client";

import FilterModal from "@/components/filter/FilterModal";
import FilterPanel from "@/components/filter/FilterPanel";
import Item from "@/components/Item";
import LoadingOverlay from "@/components/LoadingOverlay";
import SelectedVodka from "@/components/SelectedVodka";
import { BOTTLE_SIZE_OPTIONS } from "@/constants/filterOptions";
import { useMobile } from "@/hooks/useMobile";
import { useVodkas } from "@/hooks/useVodkas";
import Vodka from "@/types/VodkaProps";
import { filterVodkas, sortVodkas } from "@/utils/vodkaUtils";
import { useEffect, useState } from "react";

const Vodkas = () => {
  const { vodkas, loading } = useVodkas();
  const [selectedVodka, setSelectedVodka] = useState<Vodka | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [bottleSizeFilter, setBottleSizeFilter] = useState<number[]>([0]);
  const isMobile = useMobile();

  // Filtrowanie i sortowanie
  const filteredVodkas = filterVodkas(vodkas, search, bottleSizeFilter);
  const sortedVodkas = sortVodkas(filteredVodkas, sortBy, sortAscending);

  useEffect(() => {
    // Jeśli tablica jest pusta, ustaw domyślnie [0]
    if (bottleSizeFilter.length === 0) {
      setBottleSizeFilter([0]);
      return;
    }

    // Jeśli kliknięto cokolwiek innego niż 0, usuwamy 0
    if (bottleSizeFilter.length > 1 && bottleSizeFilter.includes(0)) {
      setBottleSizeFilter((prev) => prev.filter((size) => size !== 0));
      return;
    }

    // Jeśli kliknięto 0 i były inne opcje, zostaw tylko 0
    if (bottleSizeFilter.length >= BOTTLE_SIZE_OPTIONS.length - 1) {
      setTimeout(() => {
        setBottleSizeFilter([0]);
      }, 100);
    }
  }, [bottleSizeFilter]);

  if (loading) return <LoadingOverlay message="Wczytuję alkohol..." />;

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full py-10">
      {selectedVodka && (
        <SelectedVodka
          selectedVodka={selectedVodka}
          setSelectedVodka={setSelectedVodka}
        />
      )}
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="sub-header">Lista trunków wysokoprocentowych</h2>
          {isMobile && (
            <FilterModal
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortAscending={sortAscending}
              setSortAscending={setSortAscending}
              setBottleSizeFilter={setBottleSizeFilter}
            />
          )}
        </div>

        <div className="flex justify-center gap-4 w-full">
          {/* Filter panel */}
          <FilterPanel
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortAscending={sortAscending}
            setSortAscending={setSortAscending}
            setBottleSizeFilter={setBottleSizeFilter}
            bottleSizeFilter={bottleSizeFilter}
          />

          {/* List of vodkas */}
          <ul className="grid place-items-center grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 w-full md:w-2/3">
            {sortedVodkas.map((vodka) => (
              <li
                key={vodka._id}
                onClick={() => setSelectedVodka(vodka)}
                className="w-full"
              >
                <Item vodka={vodka} selectedVodka={selectedVodka} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Vodkas;
