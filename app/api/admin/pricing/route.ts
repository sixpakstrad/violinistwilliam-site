import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { pricingSchemaVersion, validatePricingContent } from "@/data/rates";
import { getAdminAccess } from "@/lib/adminAuth";
import {
  PricingRevisionConflictError,
  pricingContentCacheTag,
  publishPricingContent,
  readAdminPricingRecord,
} from "@/lib/supabaseSiteContent";

export const dynamic = "force-dynamic";

const maximumRequestBytes = 64 * 1024;

async function requireAdminAccess() {
  const access = await getAdminAccess();

  if (!access.isAllowed) {
    return {
      access,
      response: NextResponse.json({ error: "Access denied" }, { status: 403 }),
    };
  }

  return { access, response: null };
}

export async function GET() {
  try {
    const { response } = await requireAdminAccess();
    if (response) {
      return response;
    }

    const record = await readAdminPricingRecord();
    if (!record) {
      return NextResponse.json({
        exists: false,
        schemaVersion: pricingSchemaVersion,
      });
    }

    return NextResponse.json({ exists: true, ...record });
  } catch (error) {
    console.error("Admin pricing API read error:", error);
    const message =
      error instanceof Error ? error.message : "Unable to load shared pricing.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { access, response } = await requireAdminAccess();
    if (response) {
      return response;
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > maximumRequestBytes) {
      return NextResponse.json(
        { error: "Pricing payload is too large." },
        { status: 413 },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > maximumRequestBytes) {
      return NextResponse.json(
        { error: "Pricing payload is too large." },
        { status: 413 },
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body must be an object." },
        { status: 400 },
      );
    }

    const requestBody = body as Record<string, unknown>;
    if (requestBody.schemaVersion !== pricingSchemaVersion) {
      return NextResponse.json(
        { error: `schemaVersion must be ${pricingSchemaVersion}.` },
        { status: 400 },
      );
    }

    const expectedRevision = Number(requestBody.expectedRevision);
    if (!Number.isInteger(expectedRevision) || expectedRevision < 0) {
      return NextResponse.json(
        { error: "expectedRevision must be a non-negative integer." },
        { status: 400 },
      );
    }

    const validation = validatePricingContent(requestBody.pricing);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.errors.join(" ") },
        { status: 400 },
      );
    }

    const record = await publishPricingContent({
      pricing: validation.data,
      expectedRevision,
      updatedByClerkUserId: access.userId,
    });

    revalidateTag(pricingContentCacheTag);
    revalidatePath("/rates");
    revalidatePath("/weddings-and-events");

    return NextResponse.json({ exists: true, ...record });
  } catch (error) {
    console.error("Admin pricing API publish error:", error);

    if (error instanceof PricingRevisionConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to save and publish shared pricing.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
