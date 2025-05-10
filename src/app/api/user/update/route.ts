import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { newEmail, newPassword } = await req.json();
    const updateData: { email?: string; password?: string } = {};
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) throw new Error("Failed to get user token.");
    const email = token.email;

    await connectToDatabase();

    const currentUser = await User.findOne({ email });
    if (!currentUser)
      return NextResponse.json(
        { message: "Nie znaleziono użytkownika.", success: false },
        { status: 401 }
      );

    if (newEmail && newEmail !== currentUser.email) {
      const emailTaken = await User.findOne({ email: newEmail });
      if (emailTaken)
        return NextResponse.json(
          { message: "Adres email zajęty.", success: false },
          { status: 409 }
        );

      updateData.email = newEmail;
    }

    if (newPassword) updateData.password = await bcrypt.hash(newPassword, 10);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "Brak danych do aktualizacji.", success: false },
        { status: 400 }
      );
    }

    await User.updateOne({ _id: currentUser._id }, updateData);

    return NextResponse.json(
      { message: "Zmieniono dane.", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { message: "Nie udało się zaktualizować danych.", success: false },
      { status: 500 }
    );
  }
}
