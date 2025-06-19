import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
import { VodkaFormData } from "@/types/VodkaProps";
import { isValidObjectId } from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET as string;

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { message: "Brak autoryzacji.", success: false },
        { status: 403 }
      );
    }

    const { formData } = await req.json();

    await connectToDatabase();

    const vodka = await Vodka.create(formData);

    return NextResponse.json(
      { message: "Dodano nową wódkę.", vodka, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Adding vodka error:", error);
    return NextResponse.json(
      { message: "Server Error", success: false, error: String(error) },
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

    const { formData }: { formData: VodkaFormData } = await req.json();
    const vodkaId = formData._id;

    if (!vodkaId || !isValidObjectId(vodkaId)) {
      return NextResponse.json(
        { message: "Nieprawidłowe ID wódki.", success: false },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const vodka = await Vodka.findById(vodkaId);
    if (!vodka) {
      return NextResponse.json(
        { message: "Nie znaleziono wódki.", success: false },
        { status: 404 }
      );
    }

    vodka.name = formData.name;
    vodka.alcoholPercentage = formData.alcoholPercentage;
    vodka.flavor = formData.flavor;
    vodka.imageSrc = formData.imageSrc;
    vodka.description = formData.description;

    for (let i = 0; i < formData.variants.length; i++) {
      const incomingVariant = formData.variants[i];
      const existingVariant = vodka.variants[i];

      if (!existingVariant) continue;

      for (let j = 0; j < incomingVariant.stores.length; j++) {
        const existingStore = existingVariant.stores[j];
        const incomingStore = incomingVariant.stores.find(
          (s) => s.name === existingStore.name
        );

        if (!incomingStore) continue;

        const incomingPrice = incomingStore.price;

        if (incomingPrice === undefined) continue;

        const lastHistoryEntry = existingStore.priceHistory.at(-1);

        if (!lastHistoryEntry || lastHistoryEntry.price !== incomingPrice) {
          existingStore.priceHistory.push({
            price: incomingPrice,
            date: new Date(),
          });
        }
      }
    }

    await vodka.save();

    return NextResponse.json(
      { message: "Zaktualizowano wódkę.", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}

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
