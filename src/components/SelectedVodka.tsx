import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Item from "./Item";
import Vodka from "@/types/VodkaProps";

const SelectedVodka = ({
  selectedVodka,
  setSelectedVodka,
}: {
  selectedVodka: Vodka;
  setSelectedVodka: Dispatch<SetStateAction<Vodka | null>>;
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const stickyDiv = document.querySelector(".sticky");

      if (stickyDiv) {
        const isAtTop = stickyDiv.getBoundingClientRect().top === 0;
        setIsSticky(isAtTop); // Aktualizuj stan w zależności od pozycji
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center w-full sticky top-0 bg-primary z-10 ${
        isSticky ? "border-b border-button" : ""
      }`}
      onClick={() => setSelectedVodka(null)}
    >
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-full md:w-1/2 lg:w-1/3">
        <h2 className="sub-header">Wybrany napój bogów</h2>
        <Item vodka={selectedVodka} selectedVodka={selectedVodka} />
      </div>
    </div>
  );
};

export default SelectedVodka;
