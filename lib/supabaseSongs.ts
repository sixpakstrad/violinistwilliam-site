import type { RepertoireSong } from "@/data/repertoire";

const publicSongColumns = [
  "id",
  "title",
  "artist",
  "category",
  "genres",
  "wedding",
  "funeral",
  "party",
  "wills_favorite",
  "request_fee",
  "is_public",
].join(",");

export type SupabaseSongRow = {
  id?: string | number;
  title: string | null;
  artist: string | null;
  category: string | null;
  genres: string[] | string | null;
  wedding: boolean | null;
  funeral: boolean | null;
  party: boolean | null;
  wills_favorite: boolean | null;
  request_fee: boolean | null;
  sheet_music_location?: string | null;
  backing_track_location?: string | null;
  reference_url?: string | null;
  is_public: boolean | null;
  sort_order: number | null;
};

type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

const writableSongColumns = [
  "id",
  "title",
  "artist",
  "category",
  "genres",
  "wedding",
  "funeral",
  "party",
  "wills_favorite",
  "request_fee",
  "sheet_music_location",
  "backing_track_location",
  "reference_url",
  "is_public",
  "sort_order",
];

function getSupabaseConfig() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/+$/, ""),
    serviceRoleKey,
    schema: process.env.SUPABASE_SCHEMA || "public",
  };
}

async function supabaseRest<T>(
  table: string,
  options: SupabaseRequestOptions = {},
): Promise<T | null> {
  const { supabaseUrl, serviceRoleKey, schema } = getSupabaseConfig();
  const headers: Record<string, string> = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (schema !== "public") {
    headers["Accept-Profile"] = schema;
    headers["Content-Profile"] = schema;
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${encodeURIComponent(table)}${options.query || ""}`,
    {
      method: options.method || "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
    },
  );
  const responseText = await response.text();
  let responseBody: unknown = null;

  if (responseText.trim()) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      throw new Error(
        `Supabase returned invalid JSON (${response.status} ${response.statusText}): ${responseText}`,
      );
    }
  }

  if (!response.ok) {
    const details =
      responseBody && typeof responseBody === "object"
        ? JSON.stringify(responseBody)
        : responseText || "No response body.";
    throw new Error(
      `Supabase request failed (${response.status} ${response.statusText}): ${details}`,
    );
  }

  return responseBody as T | null;
}

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function parseGenres(value: SupabaseSongRow["genres"], fallback = "") {
  if (Array.isArray(value)) {
    return value.map(String).map((genre) => genre.trim()).filter(Boolean);
  }

  const raw = normalizeText(value);
  if (!raw) {
    return fallback ? [fallback] : [];
  }

  if (raw.startsWith("{") && raw.endsWith("}")) {
    return raw
      .slice(1, -1)
      .split(",")
      .map((genre) => genre.replace(/^"|"$/g, "").trim())
      .filter(Boolean);
  }

  return raw
    .split(/[;|,]/)
    .map((genre) => genre.trim())
    .filter(Boolean);
}

export function mapSupabaseSongToRepertoireSong(
  row: SupabaseSongRow,
): RepertoireSong {
  const category = normalizeText(row.category);
  const genres = parseGenres(row.genres, category);
  const isFavorite = Boolean(row.wills_favorite);

  return {
    id: row.id,
    title: normalizeText(row.title),
    artist: normalizeText(row.artist),
    category,
    source: category,
    genre: genres[0] || category || "Pop",
    genres,
    notes: "",
    sheetMusic: normalizeText(row.sheet_music_location),
    backingTrack: normalizeText(row.backing_track_location),
    url: normalizeText(row.reference_url),
    weddingRecommended: Boolean(row.wedding),
    funeralRecommended: Boolean(row.funeral),
    partyRecommended: Boolean(row.party),
    wills_favorite: isFavorite,
    favoriteRecommended: isFavorite,
    extraCharge: Boolean(row.request_fee),
    is_public: row.is_public ?? true,
    sort_order: row.sort_order,
  };
}

export function mapRepertoireSongToSupabaseRow(
  song: RepertoireSong,
): SupabaseSongRow {
  const category = normalizeText(song.category || song.source);
  const genres = Array.isArray(song.genres)
    ? song.genres.map(String).map((genre) => genre.trim()).filter(Boolean)
    : [song.genre || category].filter(Boolean);

  return {
    id: song.id,
    title: normalizeText(song.title),
    artist: normalizeText(song.artist),
    category,
    genres,
    wedding: Boolean(song.weddingRecommended),
    funeral: Boolean(song.funeralRecommended),
    party: Boolean(song.partyRecommended),
    wills_favorite: Boolean(song.wills_favorite ?? song.favoriteRecommended),
    request_fee: Boolean(song.extraCharge),
    sheet_music_location: normalizeText(song.sheetMusic),
    backing_track_location: normalizeText(song.backingTrack),
    reference_url: normalizeText(song.url),
    is_public: song.is_public ?? true,
    sort_order: song.sort_order ?? null,
  };
}

export async function readSupabaseSongs({
  publicOnly = false,
}: {
  publicOnly?: boolean;
} = {}) {
  const columns = publicOnly ? publicSongColumns : "*";
  const query = [
    `?select=${encodeURIComponent(columns)}`,
    publicOnly ? "&is_public=eq.true" : "",
    "&order=sort_order.asc.nullslast,title.asc",
  ].join("");
  const rows = await supabaseRest<SupabaseSongRow[]>("songs", { query });

  return (rows || []).map(mapSupabaseSongToRepertoireSong);
}

async function readSupabaseSongColumns() {
  const rows = await supabaseRest<Array<Record<string, unknown>>>("songs", {
    query: "?select=*&limit=1",
  });
  const firstRow = rows?.[0] || {};

  return new Set(Object.keys(firstRow));
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
  const existingColumns = await readSupabaseSongColumns();
  const rows = songs
    .map(mapRepertoireSongToSupabaseRow)
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
    wedding: song.weddingRecommended,
    funeral: song.funeralRecommended,
    party: song.partyRecommended,
    wills_favorite: Boolean(song.wills_favorite ?? song.favoriteRecommended),
    request_fee: song.extraCharge,
    is_public: song.is_public ?? true,
  };
}
