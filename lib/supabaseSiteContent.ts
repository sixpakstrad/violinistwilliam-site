import { unstable_cache } from "next/cache";

import {
  defaultPricingContent,
  pricingSchemaVersion,
  validatePricingContent,
  type PricingContent,
} from "@/data/rates";

type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export type PricingSiteContentRecord = {
  contentKey: "pricing";
  schemaVersion: number;
  pricing: PricingContent;
  revision: number;
  updatedAt: string;
  publishedAt: string;
  updatedByClerkUserId: string;
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

export class PricingRevisionConflictError extends Error {
  constructor() {
    super("Pricing was updated by another Admin. Reload before saving again.");
    this.name = "PricingRevisionConflictError";
  }
}

const siteContentTable = "site_content";
const pricingContentKey = "pricing";
export const pricingContentCacheTag = "site-content:pricing";

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

    if (details.includes("pricing_revision_conflict")) {
      throw new PricingRevisionConflictError();
    }

    throw new Error(
      `Supabase request failed (${response.status} ${response.statusText}): ${details}`,
    );
  }

  return responseBody as T | null;
}

function normalizeRecord(
  row: SupabaseSiteContentRow,
): PricingSiteContentRecord {
  if (row.content_key !== pricingContentKey) {
    throw new Error("Supabase returned an unexpected site content key.");
  }

  const schemaVersion = Number(row.schema_version);
  if (schemaVersion !== pricingSchemaVersion) {
    throw new Error(
      `Unsupported pricing schema version: ${String(row.schema_version)}.`,
    );
  }

  const validation = validatePricingContent(row.published);
  if (!validation.success) {
    throw new Error(
      `Published pricing is invalid: ${validation.errors.join(" ")}`,
    );
  }

  const revision = Number(row.revision);
  if (!Number.isInteger(revision) || revision < 1) {
    throw new Error("Published pricing has an invalid revision.");
  }

  return {
    contentKey: pricingContentKey,
    schemaVersion,
    pricing: validation.data,
    revision,
    updatedAt: String(row.updated_at || ""),
    publishedAt: String(row.published_at || ""),
    updatedByClerkUserId: String(row.updated_by_clerk_user_id || ""),
  };
}

async function readPricingRecordUncached() {
  const rows =
    (await supabaseRest<SupabaseSiteContentRow[]>(siteContentTable, {
      query:
        "?content_key=eq.pricing&select=content_key,schema_version,draft,published,revision,updated_at,published_at,updated_by_clerk_user_id&limit=1",
    })) || [];

  if (rows.length === 0) {
    return null;
  }

  return normalizeRecord(rows[0]);
}

const readCachedPricingRecord = unstable_cache(
  readPricingRecordUncached,
  [pricingContentCacheTag],
  {
    tags: [pricingContentCacheTag],
    revalidate: 60 * 60,
  },
);

export async function readAdminPricingRecord() {
  return readPricingRecordUncached();
}

export async function readPublishedPricing(): Promise<PricingContent> {
  try {
    const record = await readCachedPricingRecord();
    return record?.pricing || defaultPricingContent;
  } catch (error) {
    console.error("Unable to load published pricing; using defaults:", error);
    return defaultPricingContent;
  }
}

export async function publishPricingContent(options: {
  pricing: PricingContent;
  expectedRevision: number;
  updatedByClerkUserId: string;
}) {
  const validation = validatePricingContent(options.pricing);
  if (!validation.success) {
    throw new Error(`Invalid pricing: ${validation.errors.join(" ")}`);
  }

  const response = await supabaseRest<
    SupabaseSiteContentRow | SupabaseSiteContentRow[]
  >("rpc/publish_pricing_content", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: {
      p_schema_version: pricingSchemaVersion,
      p_content: validation.data,
      p_expected_revision: options.expectedRevision,
      p_updated_by_clerk_user_id: options.updatedByClerkUserId,
    },
  });
  const row = Array.isArray(response) ? response[0] : response;

  if (!row) {
    throw new Error("Supabase did not return the published pricing record.");
  }

  return normalizeRecord(row);
}
