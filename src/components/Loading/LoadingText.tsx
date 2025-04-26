const LoadingText = () => {
  return (
    <div className="flex gap-1 justify-center items-center">
      {"...".split("").map((letter, i) => (
        <span
          key={i}
          className="text-white text-xl font-bold animate-bounce"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LoadingText;
