import Image from "next/image";

const LoadingOverlay = ({ message = "Trwa wczytywanie danych..." }) => {
  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col justify-center items-center relative transition-opacity duration-500 ease-in-out">
        <h1 className="header absolute opacity-30 top-1/2 -translate-y-3/4">
          FlaszkoPedia
        </h1>
        <Image
          src="/logo.svg"
          alt="Ładowanie..."
          width={512}
          height={512}
          priority
          className="w-64 md:w-1/2 lg:w-2/3 xl:w-5/6 drop-shadow-logo"
        />
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="spinner w-12 h-12 border-4 border-akcent border-t-4 border-t-header rounded-full animate-spin mb-4"></div>
          <p className="font-bold text-slate-400 text-sm md:text-xl lg:text-3xl transition-opacity duration-500 ease-in-out">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
