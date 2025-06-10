import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
import { isValidObjectId } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET as string;

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Brak autoryzacji.", success: false },
        { status: 403 }
      );
    }

    const { vodkaId }: { vodkaId: string } = await req.json();
    if (!vodkaId || !isValidObjectId(vodkaId)) {
      return NextResponse.json(
        { message: "Brak ID wódki.", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedVodka = await Vodka.deleteOne({ _id: vodkaId });
    if (deletedVodka.deletedCount === 0) {
      return NextResponse.json(
        { message: "Nie znaleziono wódki o podanym ID.", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usunięto wódkę.", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
