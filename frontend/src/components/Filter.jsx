import ArrowIcon from "./ArrowIcon";

const Filter = ({
  setSearch,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
  setBottleSizeFilter,
}) => {
  return (
    <div className="flex flex-col justify-between items-center gap-2 px-2 w-full md:w-1/2 xl:w-1/3">
      {/* Filtruj po nazwie */}
      <input
        type="text"
        placeholder="Nazwa wódki..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 text-sm md:text-base rounded-lg outline-none bg-gray-700 transition-colors duration-300 ease-in-out focus:bg-akcent focus:text-primary"
      />

      <div className="flex justify-between items-center gap-2 w-full">
        {/* Kryterium sortowania */}
        <div className="w-full">
          <label
            htmlFor="sortBy"
            className="inline-block text-sm font-semibold text-gray-300 mb-1"
          >
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
        {/* Kierunek sortowania (malejąco / rosnąco) */}
        <div className="mt-auto">
          <button
            className="btn p-1"
            onClick={() => setSortAscending(!sortAscending)}
            aria-label="Zmień kierunek sortowania"
          >
            <ArrowIcon className={sortAscending ? "rotate-0" : "rotate-180"} />
          </button>
        </div>
      </div>

      {/* Filtrowanie po pojemności */}
      <div className="w-full">
        <label
          htmlFor="bottleSize"
          className="block text-sm font-semibold text-gray-300 mb-1"
        >
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
  );
};

export default Filter;
