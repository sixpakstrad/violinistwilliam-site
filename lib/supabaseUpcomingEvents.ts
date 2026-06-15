import {
  normalizeUpcomingPerformance,
  type EventVisibility,
  type UpcomingPerformance,
} from "@/data/upcomingPerformances";

type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type SupabaseUpcomingEventRow = {
  id?: string;
  title?: string | null;
  venue_name?: string | null;
  event_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  city?: string | null;
  state?: string | null;
  ticket_url?: string | null;
  description?: string | null;
  visibility?: EventVisibility | string | null;
  private_event_label?: string | null;
  is_featured?: boolean | null;
  is_published?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

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

function normalizeVisibility(value: unknown): EventVisibility {
  return value === "private" || value === "hidden" ? value : "public";
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function eventToRow(event: UpcomingPerformance): SupabaseUpcomingEventRow {
  const normalizedEvent = normalizeUpcomingPerformance(event, 0);

  return {
    id: normalizedEvent.id.startsWith("performance-")
      ? undefined
      : normalizedEvent.id,
    title: normalizedEvent.eventTitle,
    venue_name: normalizedEvent.venueName,
    event_date: normalizedEvent.date || null,
    start_time: normalizedEvent.startTime || null,
    end_time: normalizedEvent.endTime || null,
    city: normalizedEvent.city,
    state: normalizedEvent.state,
    ticket_url: normalizedEvent.ticketUrl,
    description: normalizedEvent.shortDescription,
    visibility: normalizedEvent.visibility,
    private_event_label: normalizedEvent.privateEventLabel,
    is_featured: normalizedEvent.featured,
    is_published: normalizedEvent.published,
  };
}

export function mapSupabaseEventToUpcomingPerformance(
  row: SupabaseUpcomingEventRow,
  index: number,
): UpcomingPerformance {
  const visibility = normalizeVisibility(row.visibility);

  return normalizeUpcomingPerformance(
    {
      id: normalizeText(row.id) || `performance-${index + 1}`,
      eventTitle: normalizeText(row.title) || "Untitled Performance",
      date: normalizeText(row.event_date),
      startTime: normalizeText(row.start_time).slice(0, 5),
      endTime: normalizeText(row.end_time).slice(0, 5),
      venueName: normalizeText(row.venue_name),
      city: normalizeText(row.city),
      state: normalizeText(row.state),
      isPublic: visibility === "public",
      visibility,
      privateEventLabel: normalizeText(row.private_event_label) || "Private Event",
      ticketUrl: normalizeText(row.ticket_url),
      shortDescription: normalizeText(row.description),
      featured: Boolean(row.is_featured),
      published: Boolean(row.is_published),
    },
    index,
  );
}

export async function readSupabaseUpcomingEvents(options: {
  publicOnly?: boolean;
} = {}) {
  const queryParts = [
    "select=*",
    "order=event_date.asc.nullslast,start_time.asc.nullslast,created_at.asc",
  ];

  if (options.publicOnly) {
    queryParts.push("is_published=eq.true");
    queryParts.push("visibility=in.(public,private)");
    queryParts.push(`event_date=gte.${todayIsoDate()}`);
  }

  const rows =
    (await supabaseRest<SupabaseUpcomingEventRow[]>(
      "upcoming_events",
      { query: `?${queryParts.join("&")}` },
    )) || [];

  return rows.map(mapSupabaseEventToUpcomingPerformance);
}

export async function saveSupabaseUpcomingEvents(events: UpcomingPerformance[]) {
  const rows = events.map(eventToRow);

  const rowsToInsert = rows.filter((row) => !row.id);
  const rowsToUpsert = rows.filter((row) => row.id);

  if (rowsToInsert.length > 0) {
    await supabaseRest("upcoming_events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: rowsToInsert,
    });
  }

  if (rowsToUpsert.length > 0) {
    await supabaseRest("upcoming_events", {
      method: "POST",
      query: "?on_conflict=id",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: rowsToUpsert,
    });
  }
}

export async function deleteSupabaseUpcomingEvents(ids: string[]) {
  const cleanIds = ids
    .map((id) => id.trim())
    .filter((id) => id && !id.startsWith("performance-"));

  if (!cleanIds.length) {
    return;
  }

  const quotedIds = cleanIds
    .map((id) => `"${id.replace(/"/g, '\\"')}"`)
    .join(",");

  await supabaseRest("upcoming_events", {
    method: "DELETE",
    query: `?id=in.(${quotedIds})`,
  });
}
