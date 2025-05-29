import { FilterPanelProps } from "@/types/FilterProps";
import ArrowIcon from "../ui/ArrowIcon";
import {
  BOTTLE_SIZE_OPTIONS,
  SORT_ASCENDING_OPTIONS,
  SORT_BY_OPTIONS,
  VODKA_FLAVOR_OPTIONS,
} from "@/constants/filterOptions";
import FilterList from "./FilterList";
import { useFilters } from "@/hooks/useFilters";

const FilterPanel = ({ setSearch }: FilterPanelProps) => {
  const {
    sortBy,
    sortAscending,
    bottleSizeFilter,
    flavorFilter,
    setSortBy,
    setSortAscending,
    setBottleSizeFilter,
    setFlavorFilter,
  } = useFilters();

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full">
      {/* Filtruj po nazwie */}
      <div className="w-full">
        <label htmlFor="sortBy" className="filter-label">
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
      <FilterList<string>
        id="sortBy"
        label="Kryterium sortowania"
        options={SORT_BY_OPTIONS}
        selectedValue={sortBy}
        onChange={setSortBy}
      />

      {/* Kierunek sortowania */}
      <div className="w-full">
        <label htmlFor="sortDirection" className="filter-label">
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
                  ? "bg-slate-300 text-button pointer-events-none"
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

      {/* Pojemność */}
      <FilterList<number>
        id="bottleSize"
        label="Pojemność"
        options={BOTTLE_SIZE_OPTIONS}
        selectedValue={bottleSizeFilter}
        onChange={setBottleSizeFilter}
      />

      {/* Smaki */}
      <FilterList<string>
        id="vodkaFlavor"
        label="Smak"
        options={VODKA_FLAVOR_OPTIONS}
        selectedValue={flavorFilter}
        onChange={setFlavorFilter}
      />
    </div>
  );
};

export default FilterPanel;
