import { NextResponse } from "next/server";

import { readLiveRequestSettings } from "@/lib/supabaseRequests";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await readLiveRequestSettings();

    return NextResponse.json({
      enabled: settings.enabled,
    });
  } catch (error) {
    console.error("Public request settings API error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load request settings.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
