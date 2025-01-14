import ArrowIcon from "./ArrowIcon";

const Filter = ({
  setSearch,
  sortBy,
  setSortBy,
  sortAscending,
  setSortAscending,
}) => {
  return (
    <div className="flex flex-col justify-between items-center gap-2 px-2 w-full md:w-1/2 xl:w-1/3">
      <input
        type="text"
        placeholder="Nazwa wódki..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 text-sm md:text-base rounded-lg outline-none bg-gray-700 transition-colors duration-300 ease-in-out focus:bg-akcent focus:text-primary"
      />
      <div className="flex justify-between items-center gap-2 w-full">
        <select
          className="py-1 px-2 rounded border-2 border-button bg-transparent transition-colors duration-300 ease-in-out hover:bg-button focus:bg-button
                      outline-none cursor-pointer min-w-min md:min-w-64 w-full"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Nazwa</option>
          <option value="price">Średnia cena</option>
        </select>
        <button
          className="rounded border-2 border-button p-1 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-button"
          onClick={() => setSortAscending(!sortAscending)}
        >
          <ArrowIcon className={sortAscending ? "rotate-0" : "rotate-180"} />
        </button>
      </div>
    </div>
  );
};

export default Filter;
