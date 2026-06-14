import { NextResponse } from "next/server";

import { createLiveSongRequest } from "@/lib/supabaseRequests";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: unknown;
      artist?: unknown;
      source?: unknown;
      genre?: unknown;
      guestName?: unknown;
      review?: unknown;
      reviewMarketingPermission?: unknown;
      reviewDisplayName?: unknown;
    };

    const songRequest = await createLiveSongRequest({
      title: String(body.title ?? ""),
      artist: String(body.artist ?? ""),
      source: String(body.source ?? ""),
      genre: String(body.genre ?? ""),
      guestName: String(body.guestName ?? ""),
      review: String(body.review ?? ""),
      reviewMarketingPermission: Boolean(body.reviewMarketingPermission),
      reviewDisplayName: String(body.reviewDisplayName ?? ""),
    });

    return NextResponse.json({ request: songRequest }, { status: 201 });
  } catch (error) {
    console.error("Public song request API error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to save request.";
    const status = message.includes("paused") ? 403 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
