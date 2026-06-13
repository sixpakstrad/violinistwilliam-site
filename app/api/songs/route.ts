import { NextResponse } from "next/server";

import { readSupabaseSongs, toPublicSong } from "@/lib/supabaseSongs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const songs = await readSupabaseSongs({ publicOnly: true });
    return NextResponse.json({
      songs: songs.map(toPublicSong),
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
