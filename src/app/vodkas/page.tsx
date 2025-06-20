"use client";

import FilterPanel from "@/components/filter/FilterPanel";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import Modal from "@/components/modal/Modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVodkas } from "@/hooks/useVodkas";
import { VodkaProps, VodkaVariant } from "@/types/VodkaProps";
import { filterVodkas, sortVodkas } from "@/lib/utils/vodkaUtils/filter";
import { useEffect, useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import Vodka from "@/components/Vodka";

const VodkasPage = () => {
  const { vodkas, loading } = useVodkas();
  const { sortBy, sortAscending, bottleSizeFilter, flavorFilter } =
    useFilters();
  const [vodkaList, setVodkaList] = useState<VodkaProps[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(1024);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Change vodka's selected variant
  const handleVariantChange = (vodkaId: string, variant: VodkaVariant) => {
    setVodkaList((prevVodkas) =>
      prevVodkas
        ? prevVodkas.map((v) =>
            v._id === vodkaId ? { ...v, selectedVariant: variant } : v
          )
        : []
    );
  };

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
      bottleSizeFilter
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
                  <Vodka vodka={vodka} />
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
