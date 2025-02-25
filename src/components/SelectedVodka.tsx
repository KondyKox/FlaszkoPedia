import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Item from "./Item";
import { Vodka, VodkaVariant } from "@/types/VodkaProps";

const SelectedVodka = ({
  selectedVodka,
  setSelectedVodka,
  handleVariantChange,
}: {
  selectedVodka: Vodka;
  setSelectedVodka: Dispatch<SetStateAction<Vodka | null>>;
  handleVariantChange: (vodkaId: string, variant: VodkaVariant) => void;
}) => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

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
      className={`flex flex-col justify-center items-center w-full sticky top-0 bg-primary z-40 ${
        isSticky ? "border-b border-button" : ""
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-4 py-2 w-full md:w-1/2 lg:w-1/3">
        <h2 className="sub-header">Wybrany napój bogów</h2>
        <Item
          vodka={selectedVodka}
          selectedVodka={selectedVodka}
          setSelectedVodka={setSelectedVodka}
          isSelected
          handleVariantChange={handleVariantChange}
        />
      </div>
    </div>
  );
};

export default SelectedVodka;
