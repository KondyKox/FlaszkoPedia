import Vodka from "@/lib/models/Vodka";
import VodkaRating from "@/lib/models/VodkaRating";
import mongoose from "mongoose";

export const updateVodkaRating = async (
  vodkaId: string,
  userId: string,
  rating: number
) => {
  if (!mongoose.Types.ObjectId.isValid(vodkaId)) return;

  await VodkaRating.findOneAndUpdate(
    { vodkaId, userId },
    { value: rating },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Przelicz średnią i liczbę ocen
  const stats = await VodkaRating.aggregate([
    { $match: { vodkaId: new mongoose.Types.ObjectId(vodkaId) } },
    {
      $group: {
        _id: "$vodkaId",
        averageRating: { $avg: "$value" },
        ratingsCount: { $sum: 1 },
      },
    },
  ]);

  const { averageRating, ratingsCount } = stats[0] || {
    averageRating: 0,
    ratingsCount: 0,
  };

  // Zapisz do modelu Vodka
  await Vodka.findByIdAndUpdate(vodkaId, {
    averageRating: Math.round(averageRating * 10) / 10,
    ratingsCount,
  });

  return { averageRating, ratingsCount };
};
