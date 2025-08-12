import VodkaRating from "@/lib/models/VodkaRating";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid vodka ID.", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const ratings = await VodkaRating.find({ vodkaId: id }).select(
      "userId value"
    );

    const ratingsCount = ratings.length;
    const averageRating =
      ratingsCount === 0
        ? 0
        : ratings.reduce((sum, r) => sum + r.value, 0) / ratingsCount;

    return NextResponse.json({
      ratings,
      ratingsCount,
      averageRating: Math.round(averageRating * 10) / 10,
      success: true,
    });
  } catch (error) {
    console.error("Failed to fetch ratings:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
