import type { RepertoireSong } from "@/data/repertoire";
import {
  normalizeCustomCollections,
  normalizeSongGenres,
  type SongTaxonomy,
} from "@/data/songTaxonomy";
import { supabaseRest } from "@/lib/supabaseRest";
import {
  readSongTaxonomy,
  songTaxonomySetupMessage,
} from "@/lib/supabaseSongTaxonomy";

const publicSongColumns = "*";

export type SupabaseSongRow = {
  id?: string | number;
  title: string | null;
  artist: string | null;
  category: string | null;
  genres: string[] | string | null;
  custom_collections?: string[];
  wedding: boolean | null;
  funeral: boolean | null;
  party: boolean | null;
  wills_favorite: boolean | null;
  collection_1970s?: boolean | null;
  collection_1980s?: boolean | null;
  collection_1990s?: boolean | null;
  collection_2000s?: boolean | null;
  collection_2010s_now?: boolean | null;
  oldies?: boolean | null;
  request_fee: boolean | null;
  private_notes?: string | null;
  notes?: string | null;
  sheet_music_location?: string | null;
  backing_track_location?: string | null;
  reference_url?: string | null;
  is_public: boolean | null;
  sort_order: number | null;
};

const writableSongColumns = [
  "id",
  "title",
  "artist",
  "category",
  "genres",
  "custom_collections",
  "wedding",
  "funeral",
  "party",
  "wills_favorite",
  "collection_1970s",
  "collection_1980s",
  "collection_1990s",
  "collection_2000s",
  "collection_2010s_now",
  "oldies",
  "request_fee",
  "private_notes",
  "notes",
  "sheet_music_location",
  "backing_track_location",
  "reference_url",
  "is_public",
  "sort_order",
];

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function parseGenres(
  value: SupabaseSongRow["genres"],
  fallback = "",
  knownGenres?: readonly string[],
) {
  if (Array.isArray(value)) {
    return normalizeSongGenres(value.map(String), knownGenres);
  }

  const raw = normalizeText(value);
  if (!raw) {
    return fallback ? normalizeSongGenres([fallback], knownGenres) : [];
  }

  if (raw.startsWith("{") && raw.endsWith("}")) {
    return normalizeSongGenres(
      raw.slice(1, -1).split(",").map((genre) => genre.replace(/^"|"$/g, "")),
      knownGenres,
    );
  }

  return normalizeSongGenres(raw.split(/[;|,]/), knownGenres);
}

export function mapSupabaseSongToRepertoireSong(
  row: SupabaseSongRow,
  knownGenres?: readonly string[],
  knownCollections?: readonly string[],
): RepertoireSong {
  const category = normalizeText(row.category);
  const genres = parseGenres(row.genres, category, knownGenres);
  const isFavorite = Boolean(row.wills_favorite);

  return {
    id: row.id,
    title: normalizeText(row.title),
    artist: normalizeText(row.artist),
    category,
    source: category,
    genre: genres[0] || category || "Pop",
    genres,
    customCollections: Array.isArray(row.custom_collections)
      ? normalizeCustomCollections(row.custom_collections.map(String), knownCollections)
      : [],
    notes: normalizeText(row.private_notes ?? row.notes),
    sheetMusic: normalizeText(row.sheet_music_location),
    backingTrack: normalizeText(row.backing_track_location),
    url: normalizeText(row.reference_url),
    weddingRecommended: Boolean(row.wedding),
    funeralRecommended: Boolean(row.funeral),
    partyRecommended: Boolean(row.party),
    wills_favorite: isFavorite,
    favoriteRecommended: isFavorite,
    collection1970s: Boolean(row.collection_1970s),
    collection1980s: Boolean(row.collection_1980s),
    collection1990s: Boolean(row.collection_1990s),
    collection2000s: Boolean(row.collection_2000s),
    collection2010sNow: Boolean(row.collection_2010s_now),
    oldies: Boolean(row.oldies),
    extraCharge: Boolean(row.request_fee),
    is_public: row.is_public ?? true,
    sort_order: row.sort_order,
  };
}

export function mapRepertoireSongToSupabaseRow(
  song: RepertoireSong,
  knownGenres?: readonly string[],
  knownCollections?: readonly string[],
): SupabaseSongRow {
  const category = normalizeText(song.category || song.source);
  const genres = normalizeSongGenres(
    Array.isArray(song.genres) ? song.genres.map(String) : [song.genre || category],
    knownGenres,
  );

  return {
    id: song.id,
    title: normalizeText(song.title),
    artist: normalizeText(song.artist),
    category,
    genres,
    custom_collections: song.customCollections === undefined
      ? undefined
      : normalizeCustomCollections(song.customCollections, knownCollections),
    wedding: Boolean(song.weddingRecommended),
    funeral: Boolean(song.funeralRecommended),
    party: Boolean(song.partyRecommended),
    wills_favorite: Boolean(song.wills_favorite ?? song.favoriteRecommended),
    collection_1970s: Boolean(song.collection1970s),
    collection_1980s: Boolean(song.collection1980s),
    collection_1990s: Boolean(song.collection1990s),
    collection_2000s: Boolean(song.collection2000s),
    collection_2010s_now: Boolean(song.collection2010sNow),
    oldies: Boolean(song.oldies),
    request_fee: Boolean(song.extraCharge),
    private_notes: normalizeText(song.notes),
    notes: normalizeText(song.notes),
    sheet_music_location: normalizeText(song.sheetMusic),
    backing_track_location: normalizeText(song.backingTrack),
    reference_url: normalizeText(song.url),
    is_public: song.is_public ?? true,
    sort_order: song.sort_order ?? null,
  };
}

export async function readSupabaseSongs({
  publicOnly = false,
  taxonomy,
}: {
  publicOnly?: boolean;
  taxonomy?: SongTaxonomy;
} = {}) {
  const catalogue = taxonomy || (await readSongTaxonomy());
  const columns = publicOnly ? publicSongColumns : "*";
  const query = [
    `?select=${encodeURIComponent(columns)}`,
    publicOnly ? "&is_public=eq.true" : "",
    "&order=sort_order.asc.nullslast,title.asc",
  ].join("");
  const rows = await supabaseRest<SupabaseSongRow[]>("songs", { query });

  return (rows || []).map((row) =>
    mapSupabaseSongToRepertoireSong(row, catalogue.genres, catalogue.collections),
  );
}

export async function readSupabaseSongById(id: string | number) {
  const normalizedId = normalizeText(id);

  if (!normalizedId) {
    return null;
  }

  const rows = await supabaseRest<SupabaseSongRow[]>("songs", {
    query: `?select=*&id=eq.${encodeURIComponent(normalizedId)}&limit=1`,
  });

  return rows?.[0] ? mapSupabaseSongToRepertoireSong(rows[0]) : null;
}

async function readSupabaseSongColumns() {
  const rows = await supabaseRest<Array<Record<string, unknown>>>("songs", {
    query: "?select=*&limit=1",
  });
  const firstRow = rows?.[0] || {};
  if (rows?.length) return new Set(Object.keys(firstRow));

  const schema = await supabaseRest<{
    definitions?: { songs?: { properties?: Record<string, unknown> } };
  }>("");
  const columns = Object.keys(schema?.definitions?.songs?.properties || {});
  if (columns.length === 0) {
    throw new Error("Unable to read the songs table columns. Save was not sent.");
  }
  return new Set(columns);
}

function filterExistingColumns(
  row: SupabaseSongRow,
  existingColumns: Set<string>,
) {
  return Object.fromEntries(
    Object.entries(row).filter(
      ([key, value]) =>
        writableSongColumns.includes(key) &&
        existingColumns.has(key) &&
        value !== undefined,
    ),
  );
}

export async function saveSupabaseSongs(songs: RepertoireSong[]) {
  if (songs.length === 0) return;
  const taxonomy = await readSongTaxonomy();
  const existingColumns = await readSupabaseSongColumns();
  if (
    !existingColumns.has("custom_collections") &&
    songs.some((song) => song.customCollections?.length)
  ) {
    throw new Error(songTaxonomySetupMessage);
  }
  const rows = songs
    .map((song) =>
      mapRepertoireSongToSupabaseRow(song, taxonomy.genres, taxonomy.collections),
    )
    .map((row) => filterExistingColumns(row, existingColumns));
  const rowsWithId = rows.filter((row) => row.id !== undefined && row.id !== "");
  const rowsWithoutId = rows.filter(
    (row) => row.id === undefined || row.id === "",
  );

  if (rowsWithId.length > 0) {
    await supabaseRest("songs", {
      method: "POST",
      query: "?on_conflict=id",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: rowsWithId,
    });
  }

  if (rowsWithoutId.length > 0) {
    await supabaseRest("songs", {
      method: "POST",
      headers: {
        Prefer: "return=minimal",
      },
      body: rowsWithoutId,
    });
  }
}

export async function deleteSupabaseSongs(ids: Array<string | number>) {
  const safeIds = ids
    .map((id) => String(id).trim())
    .filter(Boolean)
    .map(encodeURIComponent);

  if (safeIds.length === 0) {
    return;
  }

  await supabaseRest("songs", {
    method: "DELETE",
    query: `?id=in.(${safeIds.join(",")})`,
    headers: {
      Prefer: "return=minimal",
    },
  });
}

export function toPublicSong(song: RepertoireSong) {
  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    category: song.category || song.source,
    genres: song.genres || [],
    customCollections: song.customCollections || [],
    wedding: song.weddingRecommended,
    funeral: song.funeralRecommended,
    party: song.partyRecommended,
    wills_favorite: Boolean(song.wills_favorite ?? song.favoriteRecommended),
    collection_1970s: Boolean(song.collection1970s),
    collection_1980s: Boolean(song.collection1980s),
    collection_1990s: Boolean(song.collection1990s),
    collection_2000s: Boolean(song.collection2000s),
    collection_2010s_now: Boolean(song.collection2010sNow),
    oldies: Boolean(song.oldies),
    request_fee: song.extraCharge,
    is_public: song.is_public ?? true,
  };
}
