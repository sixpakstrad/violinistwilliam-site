import {
  defaultSongTaxonomy,
  taxonomyNameKey,
  sortTaxonomyNames,
  validateTaxonomyName,
  type SongTaxonomy,
  type SongTaxonomyKind,
} from "@/data/songTaxonomy";
import { supabaseRest, SupabaseRestError } from "@/lib/supabaseRest";

type TaxonomyRow = { kind: SongTaxonomyKind; name: string };

export class SongTaxonomyError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
    this.name = "SongTaxonomyError";
  }
}

export const songTaxonomySetupMessage =
  "Song taxonomy needs its one-time Supabase setup. Run Docs/supabase-song-taxonomy.sql in the Supabase SQL Editor.";

export async function readSongTaxonomy(): Promise<SongTaxonomy> {
  try {
    const rows = await supabaseRest<TaxonomyRow[]>("song_taxonomy", {
      query: "?select=kind,name&order=created_at.asc,name.asc",
    });
    const names = (kind: SongTaxonomyKind) =>
      (rows || []).filter((row) => row.kind === kind).map((row) => row.name);
    return {
      genres: sortTaxonomyNames([...defaultSongTaxonomy.genres, ...names("genre")]),
      collections: sortTaxonomyNames([
        ...defaultSongTaxonomy.collections,
        ...names("collection"),
      ]),
      configured: true,
    };
  } catch (error) {
    if (
      error instanceof SupabaseRestError &&
      ["42P01", "PGRST205"].includes(error.code || "")
    ) {
      return defaultSongTaxonomy;
    }
    throw error;
  }
}

export async function addSongTaxonomyEntry(input: {
  kind: unknown;
  name: unknown;
  userId: string;
}) {
  if (input.kind !== "genre" && input.kind !== "collection") {
    throw new SongTaxonomyError("Choose a genre or collection.");
  }
  const validationError = validateTaxonomyName(input.name);
  if (validationError) throw new SongTaxonomyError(validationError);
  const name = String(input.name).trim().replace(/\s+/g, " ");
  const taxonomy = await readSongTaxonomy();
  if (!taxonomy.configured) {
    throw new SongTaxonomyError(songTaxonomySetupMessage, 503);
  }
  const names = input.kind === "genre" ? taxonomy.genres : taxonomy.collections;
  if (names.some((existing) => taxonomyNameKey(existing) === taxonomyNameKey(name))) {
    throw new SongTaxonomyError(`A ${input.kind} named "${name}" already exists.`, 409);
  }
  try {
    await supabaseRest("song_taxonomy", {
      method: "POST",
      body: { kind: input.kind, name, created_by_clerk_user_id: input.userId },
      headers: { Prefer: "return=minimal" },
    });
  } catch (error) {
    if (error instanceof SupabaseRestError && error.code === "23505") {
      throw new SongTaxonomyError(`A ${input.kind} named "${name}" already exists.`, 409);
    }
    throw error;
  }
  return readSongTaxonomy();
}
