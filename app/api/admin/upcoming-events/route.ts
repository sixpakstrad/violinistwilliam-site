import { NextResponse } from "next/server";

import { getAdminAccess } from "@/lib/adminAuth";
import {
  deleteSupabaseUpcomingEvents,
  readSupabaseUpcomingEvents,
  saveSupabaseUpcomingEvents,
} from "@/lib/supabaseUpcomingEvents";

export const dynamic = "force-dynamic";

async function requireAdminAccess() {
  const access = await getAdminAccess();

  if (!access.isAllowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return null;
}

export async function GET() {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const events = await readSupabaseUpcomingEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Admin upcoming events API read error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load upcoming events.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const body = (await request.json()) as {
      events?: unknown;
      deletedIds?: unknown;
    };

    if (!Array.isArray(body.events)) {
      return NextResponse.json(
        { error: "Request body must include an events array." },
        { status: 400 },
      );
    }

    if (body.deletedIds !== undefined && !Array.isArray(body.deletedIds)) {
      return NextResponse.json(
        { error: "deletedIds must be an array when provided." },
        { status: 400 },
      );
    }

    if (Array.isArray(body.deletedIds) && body.deletedIds.length > 0) {
      await deleteSupabaseUpcomingEvents(body.deletedIds.map(String));
    }

    await saveSupabaseUpcomingEvents(
      body.events as Parameters<typeof saveSupabaseUpcomingEvents>[0],
    );

    const events = await readSupabaseUpcomingEvents();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Admin upcoming events API save error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to save upcoming events.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
