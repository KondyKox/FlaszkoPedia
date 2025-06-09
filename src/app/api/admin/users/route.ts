import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET as string;

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

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Brak autoryzacji.", success: false },
        { status: 403 }
      );
    }

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "Brak ID użytkownika.", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Użytkownik nie istnieje.", success: false },
        { status: 404 }
      );
    }

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    return NextResponse.json(
      {
        message: "Zmieniono rolę użytkownika.",
        role: user.role,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /admin/users error:", error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
