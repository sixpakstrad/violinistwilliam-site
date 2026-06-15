import { NextResponse } from "next/server";

import { readSupabaseUpcomingEvents } from "@/lib/supabaseUpcomingEvents";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await readSupabaseUpcomingEvents({ publicOnly: true });
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Public upcoming events API error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load upcoming events.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
