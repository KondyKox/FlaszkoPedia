import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { message: "Missing email or password." },
        { status: 400 }
      );

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika", success: false },
        { status: 401 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Niewłaściwe dane logowania", success: false },
        { status: 401 }
      );

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Zalogowano się",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Server error!", error);
    return NextResponse.json(
      { message: "Błąd podczas logowania", success: false },
      { status: 500 }
    );
  }
}
