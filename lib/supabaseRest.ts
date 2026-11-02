type SupabaseRequestOptions = {
  method?: string;
  query?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export class SupabaseRestError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "SupabaseRestError";
  }
}

export async function supabaseRest<T>(
  path: string,
  options: SupabaseRequestOptions = {},
): Promise<T | null> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const schema = process.env.SUPABASE_SCHEMA || "public";
  if (!supabaseUrl) throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");

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

  const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/${path}${options.query || ""}`, {
    method: options.method || "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });
  const responseText = await response.text();
  let body: unknown = null;
  if (responseText.trim()) {
    try {
      body = JSON.parse(responseText);
    } catch {
      throw new SupabaseRestError(`Supabase returned invalid JSON (${response.status}).`, response.status);
    }
  }
  if (!response.ok) {
    const code = body && typeof body === "object" && "code" in body ? String(body.code) : undefined;
    throw new SupabaseRestError(
      `Supabase request failed (${response.status}): ${responseText || "No response body."}`,
      response.status,
      code,
    );
  }
  return body as T | null;
}
