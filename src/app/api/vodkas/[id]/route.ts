import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = await context.params;

  if (!id)
    return NextResponse.json({ error: "No ID in params." }, { status: 400 });

  const vodka = await Vodka.findById(id);

  if (!vodka)
    return NextResponse.json({ error: "Vodka not found." }, { status: 404 });

  console.log(`Request for vodka with ID: ${id}`);
  try {
    const formattedName = `${vodka.name} (wódka)`;
    const res = await fetch(
      `https://pl.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        formattedName
      )}`
    );
    if (!res.ok) {
      console.error(
        `Error fetching description from Wikipedia. Status: ${res.status}`
      );
    }

    const data = await res.json();

    const wikiDescription = data.extract || "Brak opisu wódki z Wikipedii. :(";
    const vodkaDescription = vodka.description || "Brak opisu wódki. :(";
    const description = `${vodkaDescription}<br/><br/><span class='font-bold'>Opis z Wikipedii:</span><br/>${wikiDescription}`;

    return NextResponse.json({ ...vodka.toObject(), description });
  } catch (error) {
    return NextResponse.json({
      ...vodka.toObject(),
      description: "Brak opisu wódki z Wikipedii. :(",
    });
  }
}
