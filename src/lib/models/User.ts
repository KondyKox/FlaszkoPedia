import mongoose, { Schema, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  favorites: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Vodka" }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
