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
    return NextResponse.json(
      { error: "Unable to load songs." },
      { status: 500 },
    );
  }
}
