import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) throw new Error("Failed to get user token.");

    await connectToDatabase();

    const user = await User.findOne({ email: token.email });
    if (!user)
      return NextResponse.json(
        { message: "Nie można znaleźć użytkownika.", success: false },
        { status: 401 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Hasło niepoprawne!", success: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Hasło poprawne!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to check password:", error);
    return NextResponse.json(
      {
        message: "Nie udało się sprawdzić hasła.",
        success: false,
      },
      { status: 500 }
    );
  }
}
