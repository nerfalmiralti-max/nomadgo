import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PLACES } from "@/lib/siteData";

const fallbackPlaces = PLACES.map((place) => ({
  id: place.id,
  name: place.name,
  description: place.desc,
  lat: place.coordinates[0],
  lng: place.coordinates[1],
  image: null,
}));

// GET - получить все места
export async function GET() {
  try {
    const places = await prisma.place.findMany();
    return NextResponse.json(places.length > 0 ? places : fallbackPlaces);
  } catch {
    return NextResponse.json(fallbackPlaces);
  }
}

// POST - создать место
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const place = await prisma.place.create({
      data: {
        name: body.name,
        description: body.description,
        lat: body.lat,
        lng: body.lng,
        image: body.image || null,
      },
    });

    return NextResponse.json(place);
  } catch {
    return NextResponse.json(
      { error: "Failed to create place" },
      { status: 500 }
    );
  }
}
