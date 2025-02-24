import { useState, useEffect } from "react";

export const useMediaQuery = (query: number) => {
  // Początkowy stan ustawiamy na podstawie szerokości ekranu (jeśli `window` istnieje)
  const getMatches = () =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${query}px)`).matches;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return; // Zabezpieczenie przed SSR

    const mediaQuery = window.matchMedia(`(max-width: ${query}px)`);

    // Aktualizacja stanu przy zmianie szerokości ekranu
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Nasłuchiwanie zmian
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
