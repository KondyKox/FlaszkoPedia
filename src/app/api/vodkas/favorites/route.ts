import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) throw new Error("Not authenticated");

    await connectToDatabase();

    const user = await User.findOne({ email: token.email }).populate(
      "favorites"
    );
    if (!user) {
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(user.favorites);
  } catch (error) {
    console.error("Failed to load favorite vodkas.");
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { vodkaId } = await req.json();
    const token = await getToken({ req, secret });

    if (!token) throw new Error("Not authenticated");

    await connectToDatabase();

    const user = await User.findOne({ email: token.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 }
      );
    }

    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(vodkaId)) {
      user.favorites.push(vodkaId);
      await user.save();
    }

    return NextResponse.json(
      { message: "Added to favorites.", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { vodkaId } = await req.json();
    const token = await getToken({ req, secret });

    if (!token) throw new Error("Not authenticated");

    await connectToDatabase();

    await User.updateOne(
      { email: token.email },
      { $pull: { favorites: vodkaId } }
    );

    return NextResponse.json(
      { message: "Deleted from favorites.", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 500 }
    );
  }
}
