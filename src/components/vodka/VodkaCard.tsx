// import ArrowIcon from "./ArrowIcon";
import { useEffect, useRef, useState } from "react";
import { useSelectedVodka } from "@/hooks/useSelectedVodka";
import VodkaHeader from "./VodkaHeader";
import VodkaStores from "./VodkaStores";
import VodkaMeta from "./VodkaMeta";
import VodkaVariants from "./VodkaVariants";
import { useVodkaData } from "@/hooks/useVodkaData";

const VodkaCard = ({ vodkaId }: { vodkaId: string }) => {
  const { vodka } = useVodkaData(vodkaId);
  const { selectedVodka, setSelectedVodka } = useSelectedVodka();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const selected = vodka === selectedVodka;
  const divRef = useRef<HTMLDivElement | null>(null);

  // Select vodka on click
  const handleVodkaClick = () => {
    if (selected) setSelectedVodka(null);
    else setSelectedVodka(vodka);
  };

  // Pretty animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (divRef.current) observer.observe(divRef.current);
    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, []);

  if (!vodka) return null;

  return (
    <div
      ref={divRef}
      className={`relative overflow-visible flex justify-between items-stretch bg-akcent rounded-lg w-full h-full transition-opacity duration-500 
                    ${selected && "opacity-50"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="flex flex-col justify-between gap-6 rounded-ss-lg rounded-es-lg w-full transition-all duration-500 
                    ease-in-out cursor-pointer hover:bg-button group flex-1 relative overflow-hidden p-4"
        onClick={handleVodkaClick}
      >
        <VodkaHeader vodka={vodka} onClick={handleVodkaClick} />
        <VodkaStores vodka={vodka} />
        <VodkaMeta vodka={vodka} />
      </div>
      <VodkaVariants vodka={vodka} />
    </div>
  );
};

export default VodkaCard;
