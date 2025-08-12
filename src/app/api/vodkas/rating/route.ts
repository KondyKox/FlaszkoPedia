import { connectToDatabase } from "@/lib/mongodb";
import { updateVodkaRating } from "@/lib/utils/vodkaUtils/rating";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) throw new Error("Not authenticated");

    const { vodkaId, rating } = await req.json();

    if (!vodkaId || typeof rating !== "number") {
      return NextResponse.json(
        { message: "Missing data.", success: false },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Ocena musi być między 1 & 5.", success: false },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(vodkaId)) {
      return NextResponse.json(
        { message: "Invalid vodka ID.", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const result = await updateVodkaRating(vodkaId, token.sub!, rating);

    return NextResponse.json({ ...result, success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to save review.", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
