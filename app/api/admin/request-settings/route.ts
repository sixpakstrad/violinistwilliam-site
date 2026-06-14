import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { isApprovedAdminUserId } from "@/lib/adminAllowlist";
import { saveLiveRequestSettings } from "@/lib/supabaseRequests";

export const dynamic = "force-dynamic";

async function requireAdminAccess() {
  const user = await currentUser();
  const userId = user?.id ?? "";

  if (!isApprovedAdminUserId(userId)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return null;
}

export async function PUT(request: Request) {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const body = (await request.json()) as {
      enabled?: unknown;
      currentEvent?: unknown;
    };
    const settings = await saveLiveRequestSettings({
      enabled:
        typeof body.enabled === "boolean" ? body.enabled : undefined,
      currentEvent:
        typeof body.currentEvent === "string" ? body.currentEvent : undefined,
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Admin request settings API error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to update request settings.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
