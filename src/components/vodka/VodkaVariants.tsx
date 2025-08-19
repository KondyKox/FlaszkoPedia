import { useVodkas } from "@/hooks/useVodkas";
import { VodkaProps } from "@/types/VodkaProps";
import { LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const VodkaVariants = ({
  vodka,
  selected,
}: {
  vodka: VodkaProps;
  selected: boolean;
}) => {
  const { handleVariantChange } = useVodkas();

  return (
    <div className="bg-gray-100 rounded-se-lg rounded-ee-lg z-10 flex flex-col justify-between items-center min-h-full overflow-hidden">
      {vodka.variants.map((variant, index) => (
        <div
          key={index}
          className={`text-sm p-2 md:p-4 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-primary w-full flex flex-1 justify-center items-center ${
            variant === vodka.selectedVariant &&
            "bg-button text-primary pointer-events-none"
          } cursor-pointer`}
          onClick={() =>
            selected || (!selected && handleVariantChange(vodka._id, variant))
          }
        >
          {variant.volume}L
        </div>
      ))}
      <Link
        href={`/vodkas/${vodka._id}`}
        className="w-full transition-colors duration-300 p-1 md:p-2 ease-in-out hover:bg-golden flex-1 border-t-2 flex justify-center items-center"
        title="Przejdź do strony wódki"
      >
        <LinkIcon className="w-6 h-6 text-header" />
      </Link>
    </div>
  );
};

export default VodkaVariants;
