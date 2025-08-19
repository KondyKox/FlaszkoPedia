const VodkaCardSkeleton = () => {
  return (
    <div className="w-full rounded-2xl border shadow-sm p-4 animate-pulse bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-14 bg-gray-300 rounded-md" /> {/* image */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-300 rounded" /> {/* name */}
            <div className="h-4 w-12 bg-gray-300 rounded-full" /> {/* % */}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* Stores */}
        <div className="flex gap-3 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              {/* logo */}
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="h-4 w-12 bg-gray-300 rounded" /> {/* price */}
            </div>
          ))}
        </div>

        {/* Variants */}
        <div className="flex flex-col items-end gap-2 mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded" />
          <div className="h-10 w-10 bg-gray-300 rounded" />
          <div className="h-10 w-10 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Average price */}
      <div className="h-4 w-32 bg-gray-300 rounded mb-2" />

      {/* Rating + flavor */}
      <div className="flex flex-col items-start gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default VodkaCardSkeleton;
