"use client";

import FilterPanel from "@/components/filter/FilterPanel";
import Modal from "@/components/modal/Modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVodkas } from "@/hooks/useVodkas";
import { VodkaProps } from "@/types/VodkaProps";
import { filterVodkas, sortVodkas } from "@/lib/utils/vodkaUtils/filter";
import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import VodkaCard from "@/components/vodka/VodkaCard";
import VodkaCardSkeleton from "@/components/ui/VodkaCardSkeleton";
import { useFavorites } from "@/hooks/useFavorites";

const VodkasPage = () => {
  const { vodkas, loading } = useVodkas();
  const { favorites } = useFavorites();
  const {
    sortBy,
    sortAscending,
    bottleSizeFilter,
    flavorFilter,
    onlyFavorites,
  } = useFilters();
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(1024);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // od razu filtrujemy i sortujemy z contextu
  const displayedVodkas: VodkaProps[] = vodkas
    ? sortVodkas(
        filterVodkas(
          vodkas,
          search,
          flavorFilter,
          bottleSizeFilter,
          onlyFavorites,
          favorites
        ),
        sortBy,
        sortAscending
      )
    : [];

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full py-10">
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="sub-header">Lista trunków wysokoprocentowych</h2>
          {isMobile &&
            (!isModalOpen ? (
              <button
                onClick={() => toggleModal()}
                className="btn btn-secondary w-full py-1"
              >
                Filtruj
              </button>
            ) : (
              <Modal isOpen={isModalOpen} onClose={() => toggleModal()}>
                <div className="w-full flex flex-col justify-start items-center gap-6 rounded-lg px-2 py-4">
                  <h3 className="sub-header-secondary">Filtrowanie</h3>

                  <FilterPanel setSearch={setSearch} />
                </div>
              </Modal>
            ))}
        </div>

        <div className="flex justify-center gap-4 w-full">
          {/* Filter panel */}
          <aside className="min-w-72 hidden xl:flex flex-col justify-start items-center gap-6 bg-button rounded-lg p-4">
            <h3 className="sub-header-secondary">Filtrowanie</h3>

            <FilterPanel setSearch={setSearch} />
          </aside>

          {/* List of vodkas */}
          <aside className="w-full md:w-2/3">
            {loading ? (
              // Wczytywanie → pokaż skeletony
              <ul className="grid justify-items-center align-items-start grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 w-full">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="w-full h-full">
                    <VodkaCardSkeleton />
                  </li>
                ))}
              </ul>
            ) : (
              // Są wyniki → normalne karty
              <ul className="grid justify-items-center align-items-start grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 w-full">
                {displayedVodkas.map((vodka) => (
                  <li key={vodka._id} className="w-full h-full">
                    <VodkaCard vodkaId={vodka._id} />
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default VodkasPage;
