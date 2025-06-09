import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
import { formatVodkaForFrontend } from "@/lib/utils/vodkaUtils/format";
import { NextResponse } from "next/server";

// GET /api/vodkas
export async function GET() {
  await connectToDatabase();
  const vodkas = await Vodka.find();

  if (!vodkas || vodkas.length === 0)
    return NextResponse.json({ message: "No vodkas found!" }, { status: 404 });

  const formatted = vodkas.map(formatVodkaForFrontend);
  return NextResponse.json(formatted);
}
