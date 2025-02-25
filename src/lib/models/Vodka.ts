import mongoose, { Schema } from "mongoose";

interface IVodka extends Document {
  name: string;
  averagePrice: number;
  alcoholPercentage: number;
  flavor: string;
  variants: [
    {
      volume: number;
      stores: {
        name: string;
        price: number;
      }[];
    }
  ];
  imageSrc: string;
}

const VodkaSchema = new Schema<IVodka>({
  name: { type: String, required: true },
  averagePrice: { type: Number, required: true },
  alcoholPercentage: { type: Number, required: true },
  flavor: { type: String, required: true },
  variants: {
    type: [
      {
        volume: { type: Number, required: true },
        stores: [
          {
            name: { type: String, required: true },
            price: { type: Number, required: true },
          },
        ],
      },
    ],
    required: true,
  },
  imageSrc: { type: String, required: true },
});

export default mongoose.models.Vodka ||
  mongoose.model<IVodka>("Vodka", VodkaSchema);
