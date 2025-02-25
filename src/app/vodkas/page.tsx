"use client";

import FilterOptions from "@/components/FilterOptions";
import Item from "@/components/Item";
import LoadingOverlay from "@/components/LoadingOverlay";
import Modal from "@/components/Modal";
import SelectedVodka from "@/components/SelectedVodka";
import { BOTTLE_SIZE_OPTIONS } from "@/constants/filterOptions";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useVodkas } from "@/hooks/useVodkas";
import { Vodka, VodkaVariant } from "@/types/VodkaProps";
import { filterVodkas, sortVodkas } from "@/utils/vodkaUtils";
import { useEffect, useState } from "react";

const Vodkas = () => {
  const { vodkas, loading } = useVodkas();
  const [vodkaList, setVodkaList] = useState<Vodka[] | null>(null);
  const [selectedVodka, setSelectedVodka] = useState<Vodka | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [bottleSizeFilter, setBottleSizeFilter] = useState<number>(
    BOTTLE_SIZE_OPTIONS[0].value
  );
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

    const updatedVodkas = vodkaList.map((vodka) => {
      const selectedVariant = vodka.variants.find(
        (variant) => variant.volume === bottleSizeFilter
      );

      if (selectedVariant)
        return {
          ...vodka,
          selectedVariant: selectedVariant || vodka.variants[0],
        };

      return vodka;
    });

    // Filtrowanie i sortowanie
    const filteredVodkas = filterVodkas(updatedVodkas, search);
    const sortedVodkas = sortVodkas(filteredVodkas, sortBy, sortAscending);

    setVodkaList(sortedVodkas);
  }, [bottleSizeFilter, vodkas, loading, search, sortBy, sortAscending]);

  if (loading) return <LoadingOverlay message="Wczytuję alkohol..." />;

  return (
    <section className="flex flex-col justify-center items-center gap-4 w-full py-10">
      {selectedVodka && (
        <SelectedVodka
          selectedVodka={selectedVodka}
          setSelectedVodka={setSelectedVodka}
          handleVariantChange={handleVariantChange}
        />
      )}
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
                  <h6 className="sub-header-secondary">Filtrowanie</h6>

                  <FilterOptions
                    setSearch={setSearch}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortAscending={sortAscending}
                    setSortAscending={setSortAscending}
                    setBottleSizeFilter={setBottleSizeFilter}
                    bottleSizeFilter={bottleSizeFilter}
                  />
                </div>
              </Modal>
            ))}
        </div>

        <div className="flex justify-center gap-4 w-full">
          {/* Filter panel */}
          <div className="min-w-72 hidden xl:flex flex-col justify-start items-center gap-6 bg-button rounded-lg p-4">
            <h6 className="sub-header-secondary">Filtrowanie</h6>

            <FilterOptions
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortAscending={sortAscending}
              setSortAscending={setSortAscending}
              setBottleSizeFilter={setBottleSizeFilter}
              bottleSizeFilter={bottleSizeFilter}
            />
          </div>

          {/* List of vodkas */}
          <ul className="grid place-items-center grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-4 w-full md:w-2/3">
            {vodkaList?.map((vodka) => (
              <li key={vodka._id} className="w-full">
                <Item
                  vodka={vodka}
                  selectedVodka={selectedVodka}
                  setSelectedVodka={setSelectedVodka}
                  handleVariantChange={handleVariantChange}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Vodkas;
