import "server-only";

import { unstable_cache } from "next/cache";

import {
  defaultPageIntroContent,
  getSourcePageIntro,
  pageIntroSchemaVersion,
  validatePageIntroContent,
  type PageIntroContent,
  type PageIntroPageContent,
  type PageIntroPageKey,
} from "@/data/pageContent";

type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type SupabaseSiteContentRow = {
  content_key?: unknown;
  schema_version?: unknown;
  draft?: unknown;
  published?: unknown;
  revision?: unknown;
  updated_at?: unknown;
  published_at?: unknown;
  updated_by_clerk_user_id?: unknown;
};

export type PageIntroSiteContentRecord = {
  contentKey: "page-intros";
  schemaVersion: number;
  pageIntros: PageIntroContent;
  revision: number;
  updatedAt: string;
  publishedAt: string;
  updatedByClerkUserId: string;
};

export class PageIntroRevisionConflictError extends Error {
  constructor() {
    super("Page intros were updated by another Admin. Reload before saving again.");
    this.name = "PageIntroRevisionConflictError";
  }
}

const siteContentTable = "site_content";
const pageIntroContentKey = "page-intros";
export const pageIntroContentCacheTag = "site-content:page-intros";

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
  path: string,
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
    `${supabaseUrl}/rest/v1/${path}${options.query || ""}`,
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
        `Supabase returned invalid JSON (${response.status} ${response.statusText}).`,
      );
    }
  }

  if (!response.ok) {
    const details =
      responseBody && typeof responseBody === "object"
        ? JSON.stringify(responseBody)
        : responseText || "No response body.";

    if (details.includes("page_intro_revision_conflict")) {
      throw new PageIntroRevisionConflictError();
    }

    throw new Error(
      `Supabase request failed (${response.status} ${response.statusText}): ${details}`,
    );
  }

  return responseBody as T | null;
}

function normalizeRecord(
  row: SupabaseSiteContentRow,
): PageIntroSiteContentRecord {
  if (row.content_key !== pageIntroContentKey) {
    throw new Error("Supabase returned an unexpected PageIntro content key.");
  }

  const schemaVersion = Number(row.schema_version);
  if (schemaVersion !== pageIntroSchemaVersion) {
    throw new Error(
      `Unsupported PageIntro schema version: ${String(row.schema_version)}.`,
    );
  }

  const validation = validatePageIntroContent(row.published);
  if (!validation.success) {
    throw new Error(
      `Published PageIntro content is invalid: ${validation.errors.join(" ")}`,
    );
  }

  const revision = Number(row.revision);
  if (!Number.isInteger(revision) || revision < 1) {
    throw new Error("Published PageIntro content has an invalid revision.");
  }

  return {
    contentKey: pageIntroContentKey,
    schemaVersion,
    pageIntros: validation.data,
    revision,
    updatedAt: String(row.updated_at || ""),
    publishedAt: String(row.published_at || ""),
    updatedByClerkUserId: String(row.updated_by_clerk_user_id || ""),
  };
}

async function readPageIntroRecordUncached() {
  const rows =
    (await supabaseRest<SupabaseSiteContentRow[]>(siteContentTable, {
      query:
        "?content_key=eq.page-intros&select=content_key,schema_version,draft,published,revision,updated_at,published_at,updated_by_clerk_user_id&limit=1",
    })) || [];

  if (rows.length === 0) {
    return null;
  }

  return normalizeRecord(rows[0]);
}

const readCachedPageIntroRecord = unstable_cache(
  readPageIntroRecordUncached,
  [pageIntroContentCacheTag],
  {
    tags: [pageIntroContentCacheTag],
    revalidate: 60 * 60,
  },
);

export async function readAdminPageIntroRecord() {
  return readPageIntroRecordUncached();
}

export async function readPublishedPageIntros(): Promise<PageIntroContent> {
  try {
    const record = await readCachedPageIntroRecord();
    return record?.pageIntros || defaultPageIntroContent;
  } catch (error) {
    console.error(
      "Unable to load published PageIntro content; using source defaults:",
      error,
    );
    return defaultPageIntroContent;
  }
}

export async function readPublishedPageIntro(
  key: PageIntroPageKey,
): Promise<PageIntroPageContent> {
  const content = await readPublishedPageIntros();
  return content.pages.find((page) => page.key === key) || getSourcePageIntro(key);
}

export async function publishPageIntroContent(options: {
  pageIntros: PageIntroContent;
  expectedRevision: number;
  updatedByClerkUserId: string;
}) {
  const validation = validatePageIntroContent(options.pageIntros);
  if (!validation.success) {
    throw new Error(`Invalid PageIntro content: ${validation.errors.join(" ")}`);
  }

  const response = await supabaseRest<
    SupabaseSiteContentRow | SupabaseSiteContentRow[]
  >("rpc/publish_page_intro_content", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: {
      p_schema_version: pageIntroSchemaVersion,
      p_content: validation.data,
      p_expected_revision: options.expectedRevision,
      p_updated_by_clerk_user_id: options.updatedByClerkUserId,
    },
  });
  const row = Array.isArray(response) ? response[0] : response;

  if (!row) {
    throw new Error("Supabase did not return the published PageIntro record.");
  }

  return normalizeRecord(row);
}
