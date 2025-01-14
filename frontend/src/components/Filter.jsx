import ArrowIcon from "./ArrowIcon";

const Filter = ({ sortBy, setSortBy, sortAscending, setSortAscending }) => {
  return (
    <div className="flex flex-col justify-between items-center">
      <span className="text-gray-400 text-sm">Sortowanie</span>
      <div className="flex justify-between items-center gap-2">
        <select
          className="py-1 px-2 rounded border-2 border-button bg-transparent transition-colors duration-300 ease-in-out hover:bg-button focus:bg-button
                      outline-none cursor-pointer min-w-min md:min-w-64"
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
