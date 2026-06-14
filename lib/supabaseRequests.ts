import type {
  RequestStatus,
  ReviewStatus,
  StoredSongRequest,
} from "@/data/songRequests";
import { songRequestSettings } from "@/data/songRequestSettings";

type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type SupabaseSongRequestRow = {
  id?: string;
  event_name?: string | null;
  title?: string | null;
  artist?: string | null;
  source?: string | null;
  genre?: string | null;
  notes?: string | null;
  sheet_music?: string | null;
  backing_track?: string | null;
  url?: string | null;
  guest_name?: string | null;
  review?: string | null;
  review_marketing_permission?: boolean | null;
  review_display_name?: string | null;
  review_status?: ReviewStatus | string | null;
  requested_at?: string | null;
  status?: RequestStatus | string | null;
};

type SupabaseRequestSettingsRow = {
  id: string;
  enabled?: boolean | null;
  current_event?: string | null;
  updated_at?: string | null;
};

export type LiveRequestSettings = {
  enabled: boolean;
  currentEvent: string;
};

export type PublicSongRequestInput = {
  title: string;
  artist?: string;
  source?: string;
  genre?: string;
  guestName?: string;
  review?: string;
  reviewMarketingPermission?: boolean;
  reviewDisplayName?: string;
};

const requestSettingsId = "live_requests";
const defaultEventName = "Open Requests";
const requestStatuses = new Set<RequestStatus>([
  "new",
  "playlist",
  "played",
  "archived",
]);
const reviewStatuses = new Set<ReviewStatus>([
  "new",
  "approved",
  "featured",
  "archived",
]);

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

function createRequestId() {
  return crypto.randomUUID();
}

function normalizeRequestStatus(status: unknown): RequestStatus {
  const normalized = normalizeText(status) as RequestStatus;
  return requestStatuses.has(normalized) ? normalized : "new";
}

function normalizeReviewStatus(status: unknown): ReviewStatus {
  const normalized = normalizeText(status) as ReviewStatus;
  return reviewStatuses.has(normalized) ? normalized : "new";
}

function mapRowToSongRequest(row: SupabaseSongRequestRow): StoredSongRequest {
  return {
    id: normalizeText(row.id) || createRequestId(),
    eventName: normalizeText(row.event_name) || defaultEventName,
    title: normalizeText(row.title) || "Untitled Song",
    artist: normalizeText(row.artist),
    source: normalizeText(row.source),
    genre: normalizeText(row.genre),
    notes: normalizeText(row.notes),
    sheetMusic: normalizeText(row.sheet_music),
    backingTrack: normalizeText(row.backing_track),
    url: normalizeText(row.url),
    guestName: normalizeText(row.guest_name),
    review: normalizeText(row.review),
    reviewMarketingPermission: Boolean(row.review_marketing_permission),
    reviewDisplayName:
      normalizeText(row.review_display_name) || "First name only",
    reviewStatus: normalizeReviewStatus(row.review_status),
    requestedAt: normalizeText(row.requested_at) || new Date().toISOString(),
    status: normalizeRequestStatus(row.status),
  };
}

function mapSongRequestToRow(
  request: StoredSongRequest,
): SupabaseSongRequestRow {
  return {
    id: request.id,
    event_name: request.eventName,
    title: request.title,
    artist: request.artist,
    source: request.source,
    genre: request.genre,
    notes: request.notes,
    sheet_music: request.sheetMusic,
    backing_track: request.backingTrack,
    url: request.url,
    guest_name: request.guestName,
    review: request.review,
    review_marketing_permission: request.reviewMarketingPermission,
    review_display_name: request.reviewDisplayName,
    review_status: request.reviewStatus,
    requested_at: request.requestedAt,
    status: request.status,
  };
}

function mapSettingsRow(row?: SupabaseRequestSettingsRow): LiveRequestSettings {
  return {
    enabled: row?.enabled ?? songRequestSettings.enabled,
    currentEvent: normalizeText(row?.current_event) || defaultEventName,
  };
}

export async function readLiveRequestSettings(): Promise<LiveRequestSettings> {
  const rows = await supabaseRest<SupabaseRequestSettingsRow[]>(
    "song_request_settings",
    {
      query: `?id=eq.${encodeURIComponent(requestSettingsId)}&limit=1`,
    },
  );

  return mapSettingsRow(rows?.[0]);
}

export async function saveLiveRequestSettings(
  settings: Partial<LiveRequestSettings>,
) {
  const current = await readLiveRequestSettings();
  const next: SupabaseRequestSettingsRow = {
    id: requestSettingsId,
    enabled: settings.enabled ?? current.enabled,
    current_event:
      normalizeText(settings.currentEvent) || current.currentEvent || defaultEventName,
    updated_at: new Date().toISOString(),
  };

  await supabaseRest("song_request_settings", {
    method: "POST",
    query: "?on_conflict=id",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: [next],
  });

  return mapSettingsRow(next);
}

export async function readLiveSongRequests() {
  const rows = await supabaseRest<SupabaseSongRequestRow[]>("song_requests", {
    query: "?select=*&order=requested_at.desc",
  });

  return (rows || []).map(mapRowToSongRequest);
}

export async function createLiveSongRequest(input: PublicSongRequestInput) {
  const settings = await readLiveRequestSettings();

  if (!settings.enabled) {
    throw new Error("Live song requests are currently paused.");
  }

  const title = normalizeText(input.title);

  if (!title) {
    throw new Error("Song title is required.");
  }

  const request: StoredSongRequest = {
    id: createRequestId(),
    eventName: settings.currentEvent,
    title,
    artist: normalizeText(input.artist),
    source: normalizeText(input.source),
    genre: normalizeText(input.genre),
    notes: "",
    sheetMusic: "",
    backingTrack: "",
    url: "",
    guestName: normalizeText(input.guestName),
    review: normalizeText(input.review),
    reviewMarketingPermission: Boolean(input.reviewMarketingPermission),
    reviewDisplayName:
      normalizeText(input.reviewDisplayName) || "First name only",
    reviewStatus: "new",
    requestedAt: new Date().toISOString(),
    status: "new",
  };

  await supabaseRest("song_requests", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: [mapSongRequestToRow(request)],
  });

  return request;
}

export async function updateLiveSongRequest(
  id: string,
  updates: {
    status?: RequestStatus;
    reviewStatus?: ReviewStatus;
  },
) {
  const row: Partial<SupabaseSongRequestRow> = {};

  if (updates.status) {
    row.status = normalizeRequestStatus(updates.status);
  }

  if (updates.reviewStatus) {
    row.review_status = normalizeReviewStatus(updates.reviewStatus);
  }

  if (Object.keys(row).length === 0) {
    throw new Error("No request updates were provided.");
  }

  await supabaseRest("song_requests", {
    method: "PATCH",
    query: `?id=eq.${encodeURIComponent(id)}`,
    headers: {
      Prefer: "return=minimal",
    },
    body: row,
  });
}

export async function deleteLiveSongRequestsByStatus({
  status,
  eventName,
}: {
  status: "played" | "archived";
  eventName: string;
}) {
  const safeEventName = normalizeText(eventName) || defaultEventName;

  await supabaseRest("song_requests", {
    method: "DELETE",
    query: [
      `?status=eq.${encodeURIComponent(status)}`,
      `&event_name=eq.${encodeURIComponent(safeEventName)}`,
    ].join(""),
    headers: {
      Prefer: "return=minimal",
    },
  });
}
