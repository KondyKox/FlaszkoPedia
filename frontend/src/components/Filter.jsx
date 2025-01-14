import ArrowIcon from "./ArrowIcon";

const Filter = ({
  setSearch,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
  // setBottleSizeFilter,
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
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Nazwa</option>
          <option value="price">Średnia cena</option>
        </select>
        {/* Kierunek sortowania (malejąco / rosnąco) */}
        <button
          className="rounded border-2 border-button p-1 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-button"
          onClick={() => setSortAscending(!sortAscending)}
        >
          <ArrowIcon className={sortAscending ? "rotate-0" : "rotate-180"} />
        </button>
      </div>

      {/* Filtrowanie po pojemności */}
      {/* <div className="w-full text-center">
        <h3 className="text-lg font-semibold mb-2">Filtruj po pojemności</h3>
        <select
          className="select"
          onChange={(e) => setBottleSizeFilter(e.target.value)}
        >
          <option value="">Wszystkie</option>
          <option value="0.5">0.5L</option>
          <option value="0.7">0.7L</option>
          <option value="1">1L</option>
        </select>
      </div> */}
    </div>
  );
};

export default Filter;
