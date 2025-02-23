import FilterProps from "@/types/FilterProps";
import ArrowIcon from "../ArrowIcon";
import { useState } from "react";
import Modal from "../Modal";

const FilterModal = ({
  setSearch,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
  setBottleSizeFilter,
}: FilterProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex flex-col justify-between items-center gap-2 w-full">
      {!isModalOpen ? (
        <button
          onClick={() => toggleModal()}
          className="btn btn-secondary w-full py-1"
        >
          Filtruj
        </button>
      ) : (
        <Modal isOpen={isModalOpen} onClose={() => toggleModal()}>
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            {/* Filtruj po nazwie */}
            <div className="w-full">
              <label htmlFor="sortBy" className="label">
                Nazwa wódki
              </label>
              <input
                type="text"
                placeholder="Tu wpisz nazwę..."
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-2 w-full">
              <div className="flex justify-between items-center gap-2 w-full">
                {/* Kryterium sortowania */}
                <div className="w-full">
                  <label htmlFor="sortBy" className="label">
                    Kryterium sortowania
                  </label>
                  <select
                    id="sortBy"
                    className="select w-full"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Nazwa</option>
                    <option value="price">Średnia cena</option>
                  </select>
                </div>

                {/* Kierunek sortowania */}
                <div className="mt-auto">
                  <button
                    className="btn p-1"
                    onClick={() => setSortAscending(!sortAscending)}
                    aria-label="Zmień kierunek sortowania"
                  >
                    <ArrowIcon
                      className={`text-primary ${
                        sortAscending ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Filtrowanie po pojemności */}
              <div className="w-full">
                <label htmlFor="bottleSize" className="label">
                  Pojemność
                </label>
                <select
                  id="bottleSize"
                  className="select w-full"
                  onChange={(e) => setBottleSizeFilter(e.target.value)}
                >
                  <option value="">Wszystkie</option>
                  <option value="0.5">0.5L</option>
                  <option value="0.7">0.7L</option>
                  <option value="1">1L</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FilterModal;
