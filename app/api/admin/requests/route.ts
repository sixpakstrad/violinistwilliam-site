import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { isApprovedAdminUserId } from "@/lib/adminAllowlist";
import {
  deleteLiveSongRequestsByStatus,
  readLiveRequestSettings,
  readLiveSongRequests,
  updateLiveSongRequest,
} from "@/lib/supabaseRequests";
import type { RequestStatus, ReviewStatus } from "@/data/songRequests";

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

    const [requests, settings] = await Promise.all([
      readLiveSongRequests(),
      readLiveRequestSettings(),
    ]);

    return NextResponse.json({ requests, settings });
  } catch (error) {
    console.error("Admin requests API read error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to load requests.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const body = (await request.json()) as {
      id?: unknown;
      status?: RequestStatus;
      reviewStatus?: ReviewStatus;
    };
    const id = String(body.id ?? "").trim();

    if (!id) {
      return NextResponse.json(
        { error: "Request id is required." },
        { status: 400 },
      );
    }

    await updateLiveSongRequest(id, {
      status: body.status,
      reviewStatus: body.reviewStatus,
    });

    const requests = await readLiveSongRequests();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Admin requests API update error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to update request.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const denied = await requireAdminAccess();
    if (denied) {
      return denied;
    }

    const body = (await request.json()) as {
      status?: unknown;
      eventName?: unknown;
    };
    const status = String(body.status ?? "").trim();
    const eventName = String(body.eventName ?? "").trim();

    if (status !== "played" && status !== "archived") {
      return NextResponse.json(
        { error: "Only played or archived requests can be cleared." },
        { status: 400 },
      );
    }

    if (!eventName) {
      return NextResponse.json(
        { error: "Current event name is required." },
        { status: 400 },
      );
    }

    await deleteLiveSongRequestsByStatus({ status, eventName });
    const requests = await readLiveSongRequests();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Admin requests API delete error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to delete requests.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
