import { Search } from "heroicons-react";

const Header = () => {
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
          className="w-full p-2 text-sm md:text-base rounded-lg outline-none bg-gray-700 transition-colors duration-300 ease-in-out focus:bg-akcent focus:text-primary"
        />
        <button className="rounded-lg p-2 transition-colors duration-300 ease-in-out shadow-inner-button hover:bg-akcent">
          <Search className="w-5 md:w-6 h-5 md:h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;