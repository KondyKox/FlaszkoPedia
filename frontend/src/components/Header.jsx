const Header = ({ setSearch }) => {
  return (
    <header className="flex flex-col justify-center items-center py-4 w-full">
      <div className="flex flex-col justify-center items-center py-4">
        <h1 className="header">FlaszkoPedia</h1>
        <p className="font-bold text-slate-400 text-sm md:text-lg lg:text-2xl">
          Porównywarka cen wódki
        </p>
      </div>
      <div className="flex justify-center items-center gap-2 w-full md:w-1/2 xl:w-1/3 p-2">
        <input
          type="text"
          placeholder="Nazwa wódki..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 text-sm md:text-base rounded-lg outline-none bg-gray-700 transition-colors duration-300 ease-in-out focus:bg-akcent focus:text-primary"
        />
      </div>
    </header>
  );
};

export default Header;
