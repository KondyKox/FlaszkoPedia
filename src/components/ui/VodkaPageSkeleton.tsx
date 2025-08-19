const VodkaPageSkeleton = () => {
  return (
    <section className="flex flex-col justify-start items-center w-full md:w-2/3">
      {/* Header + info */}
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-6 w-full min-h-[500px] py-10 px-6 border-2 border-b-0 rounded-ss-lg rounded-se-lg border-button shadow-inner-button">
        {/* Image */}
        <SkeletonBox className="w-24 lg:w-32 xl:w-44 h-48 rounded-lg" />

        <aside className="flex flex-col justify-center items-center gap-4 lg:scale-125 xl:scale-150 w-full">
          {/* Name + % + favorite */}
          <div className="flex justify-center items-center gap-6">
            <SkeletonBox className="h-8 w-32" /> {/* name */}
            <SkeletonBox className="h-8 w-12 rounded-full" /> {/* % */}
            <SkeletonBox className="h-8 w-8 rounded-full" /> {/* favorite */}
          </div>

          {/* Variants */}
          <div className="flex justify-center items-center w-full gap-2">
            <SkeletonBox className="h-6 w-12" />
            <SkeletonBox className="h-6 w-12" />
            <SkeletonBox className="h-6 w-12" />
          </div>

          {/* Stores */}
          <ul className="flex justify-center items-center gap-x-4 lg:gap-x-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <li
                key={i}
                className="flex flex-col justify-center items-center gap-2 text-center"
              >
                <SkeletonBox className="h-10 w-10 rounded-full" />
                <SkeletonBox className="h-4 w-14" />
              </li>
            ))}
          </ul>

          {/* Price, rating, flavor */}
          <div className="flex flex-col justify-center items-center gap-2">
            <SkeletonBox className="h-5 w-32" /> {/* price */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBox key={i} className="h-5 w-5 rounded" />
              ))}
            </div>
            <SkeletonBox className="h-4 w-20" /> {/* flavor */}
          </div>
        </aside>
      </div>

      {/* Chart */}
      <div className="bg-button text-primary w-full p-4 flex-1 rounded-es-lg rounded-ee-lg whitespace-pre-line flex flex-col gap-4">
        <SkeletonBox className="h-48 w-full rounded-md" />
      </div>
    </section>
  );
};

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default VodkaPageSkeleton;
