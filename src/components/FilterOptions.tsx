import FilterProps from "@/types/FilterProps";
import ArrowIcon from "./ArrowIcon";
import {
  BOTTLE_SIZE_OPTIONS,
  SORT_ASCENDING_OPTIONS,
  SORT_BY_OPTIONS,
} from "@/constants/filterOptions";

const FilterOptions = ({
  setSearch,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
  setBottleSizeFilter,
  bottleSizeFilter,
}: FilterProps) => {
  const handleBottleSizeFilterChange = (option: number) => {
    if (option === 0) {
      setBottleSizeFilter([0]); // Kliknięcie w 0 resetuje listę
      return;
    }

    setBottleSizeFilter(
      (prev) =>
        prev.includes(option)
          ? prev.filter((size) => size !== option) // Usuwamy zaznaczoną opcję
          : [...prev.filter((size) => size !== 0), option] // Dodajemy opcję i usuwamy 0
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
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

      {/* Kryterium sortowania */}
      <div className="w-full">
        <label htmlFor="sortBy" className="label">
          Kryterium sortowania
        </label>
        <ul
          id="sortBy"
          className="w-full flex justify-between items-stretch gap-2"
        >
          {SORT_BY_OPTIONS.map((option) => (
            <li
              key={option.value}
              value={option.value}
              onClick={() => setSortBy(option.value)}
              className={`filter ${
                sortBy === option.value
                  ? "bg-slate-300 text-button"
                  : "text-primary"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Filtrowanie po pojemności */}
      <div className="w-full">
        <label htmlFor="bottleSize" className="label">
          Pojemność
        </label>
        <ul id="bottleSize" className="grid grid-cols-2 gap-2">
          {BOTTLE_SIZE_OPTIONS.map((option) => (
            <li
              key={option.value}
              value={option.value}
              onClick={() => handleBottleSizeFilterChange(option.value)}
              className={`filter ${
                bottleSizeFilter?.includes(option.value)
                  ? "bg-slate-300 text-button"
                  : "text-primary"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Kierunek sortowania */}
      <div className="w-full">
        <label htmlFor="sortDirection" className="label">
          Kierunek sortowania
        </label>
        <ul
          id="sortDirection"
          className="flex justify-between items-stretch gap-2"
        >
          {SORT_ASCENDING_OPTIONS.map((option, index) => (
            <li
              key={index}
              onClick={() => setSortAscending(option.value)}
              className={`flex flex-col justify-center items-center filter ${
                sortAscending === option.value
                  ? "bg-slate-300 text-button"
                  : "text-primary"
              }`}
            >
              <ArrowIcon
                className={`w-6 h-6 ${
                  option.value ? "rotate-0" : "rotate-180"
                }`}
              />
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptions;
