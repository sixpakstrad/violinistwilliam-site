import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { isApprovedAdminUserId } from "@/lib/adminAllowlist";
import {
  deleteSupabaseSongs,
  readSupabaseSongs,
  saveSupabaseSongs,
} from "@/lib/supabaseSongs";

export const dynamic = "force-dynamic";

async function requireAdminAccess() {
  const user = await currentUser();
  const userId = user?.id ?? "";

  if (!isApprovedAdminUserId(userId)) {
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

    const songs = await readSupabaseSongs();
    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Admin songs API read error:", error);
    return NextResponse.json(
      { error: "Unable to load admin songs." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const body = (await request.json()) as {
      songs?: unknown;
      deletedIds?: unknown;
    };

    if (!Array.isArray(body.songs)) {
      return NextResponse.json(
        { error: "Request body must include a songs array." },
        { status: 400 },
      );
    }

    if (
      body.deletedIds !== undefined &&
      !Array.isArray(body.deletedIds)
    ) {
      return NextResponse.json(
        { error: "deletedIds must be an array when provided." },
        { status: 400 },
      );
    }

    if (Array.isArray(body.deletedIds) && body.deletedIds.length > 0) {
      await deleteSupabaseSongs(body.deletedIds as Array<string | number>);
    }

    await saveSupabaseSongs(body.songs as Parameters<typeof saveSupabaseSongs>[0]);
    const songs = await readSupabaseSongs();
    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Admin songs API save error:", error);
    return NextResponse.json(
      { error: "Unable to save admin songs." },
      { status: 500 },
    );
  }
}
