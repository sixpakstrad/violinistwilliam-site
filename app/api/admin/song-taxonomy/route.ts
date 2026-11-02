import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/adminAuth";
import { addSongTaxonomyEntry, readSongTaxonomy, SongTaxonomyError } from "@/lib/supabaseSongTaxonomy";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const access = await getAdminAccess();
    if (!access.isAllowed) return NextResponse.json({ error: "Access denied" }, { status: 403 });
    return NextResponse.json({ taxonomy: await readSongTaxonomy() });
  } catch (error) {
    console.error("Admin song taxonomy load failed:", error);
    return NextResponse.json({ error: "Unable to load genres and collections. Please retry." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const access = await getAdminAccess();
    if (!access.isAllowed) return NextResponse.json({ error: "Access denied" }, { status: 403 });
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Enter a genre or collection name." }, { status: 400 });
    const taxonomy = await addSongTaxonomyEntry({ kind: body.kind, name: body.name, userId: access.userId });
    return NextResponse.json({ taxonomy }, { status: 201 });
  } catch (error) {
    if (error instanceof SongTaxonomyError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Admin song taxonomy save failed:", error);
    return NextResponse.json({ error: "Unable to save the genre or collection. Please retry." }, { status: 500 });
  }
}
