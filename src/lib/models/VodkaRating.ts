import mongoose, { Schema, Types } from "mongoose";
import Vodka from "./Vodka";

export interface IVodkaRating extends Document {
  userId: Types.ObjectId;
  vodkaId: Types.ObjectId;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

const VodkaRatingSchema = new Schema<IVodkaRating>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vodkaId: { type: Schema.Types.ObjectId, ref: "Vodka", required: true },
    value: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

VodkaRatingSchema.index({ userId: 1, vodkaId: 1 }, { unique: true });

// Update average after change
VodkaRatingSchema.post("save", async (doc) => {
  const stats = await mongoose.model<IVodkaRating>("VodkaRating").aggregate([
    { $match: { vodkaId: doc.vodkaId } },
    {
      $group: {
        _id: "$vodkaId",
        average: { $avg: "$value" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Vodka.findByIdAndUpdate(doc.vodkaId, {
      averageRating: stats[0].average,
      ratingsCount: stats[0].count,
    });
  }
});

const VodkaRating =
  mongoose.models.VodkaRating ||
  mongoose.model<IVodkaRating>("VodkaRating", VodkaRatingSchema);

export default VodkaRating;
