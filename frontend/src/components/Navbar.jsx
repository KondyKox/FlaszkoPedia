import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`flex justify-center items-center py-2 px-4 w-full ${
        isMd ? "underline-custom" : ""
      }`}
    >
      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="fixed top-5 right-5 z-10 md:hidden text-secondary bg-primary rounded-lg focus:outline-none"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Bars3Icon className="h-8 w-8" />
      </button>

      {/* Desktop Menu */}
      <div className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-6xl hidden md:flex justify-between items-center">
        <img src="/logo.svg" alt="Logo" className="w-32 drop-shadow-logo" />
        <div className="flex justify-center items-center gap-4">
          <Link to={"/"} className="link">
            Strona główna
          </Link>
          <Link to={"/vodkas"} className="link">
            Porównywarka cen
          </Link>
        </div>
        <div>
          <a href="https://github.com/KondyKox/FlaszkoPedia" target="blank">
            <img
              src="/github.png"
              alt="GitHub"
              className="animated-rounded w-12 h-12 transition-all duration-300 ease-in-out hover:drop-shadow-logo"
            />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-primary flex flex-col justify-center items-center gap-4 md:hidden">
          <img src="/logo.svg" alt="Logo" className="w-44 drop-shadow-logo" />
          <div className="underline-custom flex flex-col justify-center items-center">
            <Link
              to={"/"}
              className="link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Strona główna
            </Link>
            <Link
              to={"/vodkas"}
              className="link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Porównywarka cen
            </Link>
          </div>
          <a
            href="https://github.com/KondyKox/FlaszkoPedia"
            target="_blank"
            rel="noopener noreferrer"
            className="py-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/github.png"
              alt="GitHub"
              className="w-12 h-12 rounded-full transition-all duration-300 ease-in-out hover:rounded hover:drop-shadow-logo"
            />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
