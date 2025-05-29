import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET /api/vodkas
export async function GET() {
  await connectToDatabase();
  const vodkas = await Vodka.find();

  if (!vodkas || vodkas.length === 0)
    return NextResponse.json({ message: "No vodkas found!" }, { status: 404 });

  return NextResponse.json(vodkas);
}

// POST /api/vodkas
export async function POST(req: NextRequest) {
  try {
    const { name, averagePrice, bottleSize, alcoholPercentage, stores } =
      await req.json();

    await connectToDatabase();
    const newVodka = new Vodka({
      name,
      averagePrice,
      bottleSize,
      alcoholPercentage,
      stores,
    });

    await newVodka.save();
    return NextResponse.json(newVodka, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error during adding vodka." },
      { status: 500 }
    );
  }
}
