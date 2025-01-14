const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center py-4 w-full underline-custom">
      <div className="flex flex-col justify-center items-center py-4">
        <h1 className="header">FlaszkoPedia</h1>
        <p className="font-bold text-slate-400 text-sm md:text-lg lg:text-2xl">
          Porównywarka cen wódki
        </p>
      </div>
    </header>
  );
};

export default Header;
