import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );

    await connectToDatabase();

    const userExists = await User.findOne({ email });
    if (userExists)
      return NextResponse.json(
        { message: "Użytkownik już istnieje." },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "Zarejestrowano pomyślnie", user: { email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Rejestracja się nie udała" },
      { status: 500 }
    );
  }
}
