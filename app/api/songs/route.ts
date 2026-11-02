import { NextResponse } from "next/server";

import { readSupabaseSongs, toPublicSong } from "@/lib/supabaseSongs";
import { readSongTaxonomy } from "@/lib/supabaseSongTaxonomy";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const taxonomy = await readSongTaxonomy();
    const songs = await readSupabaseSongs({ publicOnly: true, taxonomy });
    return NextResponse.json({
      songs: songs.map(toPublicSong),
      taxonomy,
    });
  } catch (error) {
    console.error("Public songs API error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to load songs.";
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
