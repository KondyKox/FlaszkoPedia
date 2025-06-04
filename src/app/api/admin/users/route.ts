import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}, { password: 0 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Błąd podczas pobierania użytkowników", success: false },
      { status: 500 }
    );
  }
}
