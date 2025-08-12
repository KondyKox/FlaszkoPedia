import mongoose, { Schema } from "mongoose";

interface PriceHistory {
  date: Date;
  price: number;
}

interface StorePrice {
  name: string;
  priceHistory: PriceHistory[];
}

interface Variant {
  volume: number;
  stores: StorePrice[];
}

export interface IVodka extends Document {
  name: string;
  alcoholPercentage: number;
  flavor: string;
  variants: Variant[];
  imageSrc: string;
  averageRating: number; // cache
  ratingsCount: number; // cache
  createdAt: Date;
  updatedAt: Date;
}

const PriceHistorySchema = new Schema<PriceHistory>({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const StorePriceSchema = new Schema<StorePrice>({
  name: { type: String, required: true },
  priceHistory: { type: [PriceHistorySchema], default: [] },
});

const VariantSchema = new Schema<Variant>({
  volume: { type: Number, required: true },
  stores: { type: [StorePriceSchema], default: [] },
});

export const VodkaSchema = new Schema<IVodka>(
  {
    name: { type: String, required: true },
    alcoholPercentage: { type: Number, required: true },
    flavor: { type: String, required: true },
    variants: { type: [VariantSchema], default: [] },
    imageSrc: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Vodka =
  mongoose.models.Vodka || mongoose.model<IVodka>("Vodka", VodkaSchema);

export default Vodka;
