import { ScaleIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="flex flex-col justify-center items-center py-4 w-full">
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

      <section className="flex flex-col items-center justify-center gap-4 p-2 w-full md:w-1/2">
        <div className="flex flex-col items-center justify-center gap-8 py-12 px-4 bg-button text-golden rounded-lg w-full">
          <h2 className="sub-header-secondary">
            Dlaczego warto korzystać z FlaszkoPedi?
          </h2>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 items-stretch">
            <li className="flex flex-col items-center text-center">
              <ScaleIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Porównuj ceny</p>
              <p className="text-xs md:text-sm text-slate-200">
                Znajdź najtańsze oferty w sklepach.
              </p>
            </li>
            <li className="flex flex-col items-center text-center">
              <StarIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Podziwiaj</p>
              <p className="text-xs md:text-sm text-slate-200">
                Bo ta aplikacja jest doskonała.
              </p>
            </li>
            <li className="flex flex-col items-center text-center">
              <SparklesIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Zdrówko 🍻</p>
              <p className="text-xs md:text-sm text-slate-200">
                Bo co to za dzień bez wódki czy browara?
              </p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 bg-gray-300 rounded-lg w-full">
          <h2 className="sub-header">Zacznij teraz!</h2>
          <Link to="/vodkas" className="link">
            Porównaj ceny wybranej wódki
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
