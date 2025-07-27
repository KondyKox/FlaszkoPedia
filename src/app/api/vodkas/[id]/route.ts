import Vodka from "@/lib/models/Vodka";
import { connectToDatabase } from "@/lib/mongodb";
// import { getWikiDescription } from "@/lib/utils/vodkaUtils/wikipedia";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Context) {
  await connectToDatabase();

  const { id } = await params;

  if (!id)
    return NextResponse.json({ error: "No ID in params." }, { status: 400 });

  const vodka = await Vodka.findById(id);

  if (!vodka)
    return NextResponse.json({ error: "Vodka not found." }, { status: 404 });

  console.log(`Request for vodka with ID: ${id}`);

  // --- Vodka description from Wikipedia ---
  // TODO: Uncomment for vodka description from Wikipedia
  // const wikiDescription = await getWikiDescription(vodka.name);
  // const vodkaDescription = vodka.description || "Brak opisu wódki. :(";

  // const description = `${vodkaDescription}<br/><br/><span class='font-bold'>Opis z Wikipedii:</span><br/>${wikiDescription}`;

  return NextResponse.json({ ...vodka.toObject() /* description */ });
}
