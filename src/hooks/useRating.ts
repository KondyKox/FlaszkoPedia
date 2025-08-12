import { useEffect, useState } from "react";

type UseRatingResult = {
  averageRating: number;
  ratingsCount: number;
  userRating?: number;
  rate: (value: number) => Promise<void>;
  loading: boolean;
};

export const useRating = (
  vodkaId: string,
  userId?: string
): UseRatingResult => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Pobierz dane z backendu
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch(`/api/vodkas/rating/${vodkaId}`);
        if (!res.ok) throw new Error("Failed to fetch ratings");
        const data = await res.json();

        setAverageRating(data.averageRating);
        setRatingsCount(data.ratingsCount);
        if (userId) {
          const myRating = data.ratings.find(
            (r: any) => r.userId === userId
          )?.value;
          setUserRating(myRating);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [vodkaId, userId]);

  // Funkcja do oceniania
  const rate = async (value: number) => {
    try {
      setUserRating(value);
      await fetch("/api/vodkas/rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vodkaId, rating: value }),
      });
      // opcjonalny refresh danych
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  return { averageRating, ratingsCount, userRating, rate, loading };
};
