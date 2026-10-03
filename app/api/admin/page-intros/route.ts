import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import {
  getSourcePageIntro,
  pageIntroSchemaVersion,
  validatePageIntroContent,
} from "@/data/pageContent";
import { getAdminAccess } from "@/lib/adminAuth";
import {
  PageIntroRevisionConflictError,
  pageIntroContentCacheTag,
  publishPageIntroContent,
  readAdminPageIntroRecord,
} from "@/lib/supabasePageIntros";

export const dynamic = "force-dynamic";

const maximumRequestBytes = 64 * 1024;
const pageIntroPaths = [
  "/education",
  "/music",
  "/weddings-and-events",
  "/groups",
  "/rates",
  "/contact",
  "/requests",
  "/admin",
];

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

    const record = await readAdminPageIntroRecord();
    if (!record) {
      return NextResponse.json({
        exists: false,
        schemaVersion: pageIntroSchemaVersion,
      });
    }

    return NextResponse.json({ exists: true, ...record });
  } catch (error) {
    console.error("Admin PageIntro API read error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load shared PageIntro content.";
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
        { error: "PageIntro payload is too large." },
        { status: 413 },
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > maximumRequestBytes) {
      return NextResponse.json(
        { error: "PageIntro payload is too large." },
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
    if (requestBody.schemaVersion !== pageIntroSchemaVersion) {
      return NextResponse.json(
        { error: `schemaVersion must be ${pageIntroSchemaVersion}.` },
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

    const validation = validatePageIntroContent(requestBody.pageIntros);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.errors.join(" ") },
        { status: 400 },
      );
    }

    if (expectedRevision === 0) {
      const sourcePerformance = getSourcePageIntro("performance");
      const proposedPerformance = validation.data.pages.find(
        (page) => page.key === "performance",
      );

      if (
        !proposedPerformance ||
        proposedPerformance.eyebrow !== sourcePerformance.eyebrow ||
        proposedPerformance.title !== sourcePerformance.title
      ) {
        return NextResponse.json(
          {
            error:
              "Initial PageIntro publication must use the current source eyebrow and title for Weddings & Events.",
          },
          { status: 400 },
        );
      }
    }

    const record = await publishPageIntroContent({
      pageIntros: validation.data,
      expectedRevision,
      updatedByClerkUserId: access.userId,
    });

    revalidateTag(pageIntroContentCacheTag);
    pageIntroPaths.forEach((path) => revalidatePath(path));

    return NextResponse.json({ exists: true, ...record });
  } catch (error) {
    console.error("Admin PageIntro API publish error:", error);

    if (error instanceof PageIntroRevisionConflictError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to save and publish PageIntro content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
