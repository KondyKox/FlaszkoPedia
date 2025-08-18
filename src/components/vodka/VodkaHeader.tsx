import { VodkaProps } from "@/types/VodkaProps";
import { useSession } from "next-auth/react";
import FavoriteIcon from "../ui/FavoriteIcon";
import Image from "next/image";
import { ScaleIcon } from "@heroicons/react/24/outline";

const VodkaHeader = ({
  vodka,
  onClick,
}: {
  vodka: VodkaProps;
  onClick: () => void;
}) => {
  const { data: session, status } = useSession();

  const handleClick = (e: Event) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={vodka.imageSrc}
          alt={vodka.name}
          width={32}
          height={32}
          className="w-10 h-16 object-contain shadow-sm group-hover:scale-105 transition-transform duration-300 ease-in-out p-2 rounded"
        />
        <div className="flex justify-center items-center flex-wrap gap-x-2">
          <h2 className="vodka-header group-hover:text-primary transition-colors duration-300 ease-in-out">
            {vodka.name}
          </h2>
          <span className="font-semibold text-base md:text-lg bg-orange-500/90 text-primary px-2 py-0.5 rounded-full">
            {vodka.alcoholPercentage}%
          </span>
        </div>
      </div>

      {/* Favorite icon */}
      <div
        className="cursor-pointer flex justify-center items-center gap-x-2"
        onClick={(e) => e.stopPropagation()}
      >
        <ScaleIcon
          className="w-6 h-6 cursor-pointer hover:scale-110 hover:text-yellow-600 transition-all duration-300"
          title="Porównaj ceny"
          onClick={(e) => onClick()}
        />
        {status === "authenticated" && <FavoriteIcon vodkaId={vodka._id} />}
      </div>
    </div>
  );
};

export default VodkaHeader;
