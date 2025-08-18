"use client";

import FilterPanel from "@/components/filter/FilterPanel";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import Modal from "@/components/modal/Modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVodkas } from "@/hooks/useVodkas";
import { VodkaProps } from "@/types/VodkaProps";
import { filterVodkas, sortVodkas } from "@/lib/utils/vodkaUtils/filter";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { useSession } from "next-auth/react";
import VodkaCard from "@/components/vodka/VodkaCard";

const VodkasPage = () => {
  const { vodkas, loading } = useVodkas();
  const {
    sortBy,
    sortAscending,
    bottleSizeFilter,
    flavorFilter,
    onlyFavorites,
  } = useFilters();
  const [vodkaList, setVodkaList] = useState<VodkaProps[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(1024);
  const { data: session, status } = useSession();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (loading || !vodkas) return;
    setVodkaList(vodkas);
  }, [loading, vodkas]);

  // Set 'selectedVariant' equal to 'bottleSizeFilter'
  useEffect(() => {
    if (loading || !vodkas || !vodkaList) return;

    // Filtrowanie i sortowanie
    const filteredVodkas = filterVodkas(
      vodkas,
      search,
      flavorFilter,
      bottleSizeFilter,
      onlyFavorites,
      session
    );
    const sortedVodkas = sortVodkas(filteredVodkas, sortBy, sortAscending);

    setVodkaList(sortedVodkas);
  }, [
    bottleSizeFilter,
    vodkas,
    loading,
    search,
    sortBy,
    sortAscending,
    flavorFilter,
    onlyFavorites,
  ]);

  if (loading) return <LoadingOverlay message="Wczytuję alkohol..." />;

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
            <ul className="grid justify-items-center align-items-start grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 w-full">
              {vodkaList?.map((vodka) => (
                <li key={vodka._id} className="w-full">
                  <VodkaCard vodka={vodka} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default VodkasPage;
