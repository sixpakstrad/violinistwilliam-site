import { NextResponse } from "next/server";

import { readFeaturedLiveReviews } from "@/lib/supabaseRequests";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = await readFeaturedLiveReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Featured live reviews API error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to load featured reviews.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
