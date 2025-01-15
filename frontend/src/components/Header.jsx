const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center py-4 w-full underline-custom">
      <div className="flex flex-col justify-center items-center py-4">
        {/* <h1 className="header">FlaszkoPedia</h1> */}
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-64 md:w-80 lg:w-96 xl:w-2/3 drop-shadow-logo"
        />
        <p className="font-bold text-slate-400 text-sm md:text-lg lg:text-2xl">
          Porównywarka cen wódki
        </p>
      </div>
    </header>
  );
};

export default Header;
