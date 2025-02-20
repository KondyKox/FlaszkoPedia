import mongoose, { Schema } from "mongoose";

interface IVodka extends Document {
  name: string;
  averagePrice: number;
  bottleSize: number;
  alcoholPercentage: number;
  stores: {
    name: string;
    price: number;
  }[];
}

const VodkaSchema = new Schema<IVodka>({
  name: { type: String, required: true },
  averagePrice: { type: Number, required: true },
  bottleSize: { type: Number, required: true },
  alcoholPercentage: { type: Number, required: true },
  stores: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export default mongoose.models.Vodka ||
  mongoose.model<IVodka>("Vodka", VodkaSchema);
