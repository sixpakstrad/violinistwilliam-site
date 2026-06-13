#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const REQUIRED_COLUMNS = [
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
  "sort_order",
];

const BOOLEAN_DEFAULTS = {
  wedding: false,
  funeral: false,
  party: false,
  wills_favorite: false,
  request_fee: false,
  is_public: true,
};
const DEFAULT_BATCH_SIZE = 100;

function parseArgs(argv) {
  const args = {
    apply: false,
    csvPath: "",
    table: "songs",
    localValidate: false,
    batchSize: DEFAULT_BATCH_SIZE,
    insertOnly: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--apply") {
      args.apply = true;
      continue;
    }

    if (arg === "--dry-run") {
      args.apply = false;
      continue;
    }

    if (arg === "--local-validate") {
      args.localValidate = true;
      continue;
    }

    if (arg === "--insert-only") {
      args.insertOnly = true;
      continue;
    }

    if (arg === "--csv" || arg === "--file") {
      args.csvPath = argv[index + 1] || "";
      index += 1;
      continue;
    }

    if (arg === "--table") {
      args.table = argv[index + 1] || "songs";
      index += 1;
      continue;
    }

    if (arg === "--batch-size") {
      const batchSize = Number(argv[index + 1]);
      if (!Number.isInteger(batchSize) || batchSize < 1) {
        throw new Error("--batch-size must be a positive integer.");
      }
      args.batchSize = batchSize;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function loadDotEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [rawKey, ...rawValueParts] = trimmed.split("=");
    const key = rawKey.trim();
    let value = rawValueParts.join("=").trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  rows.push(row);

  return rows.filter((cells) =>
    cells.some((cell) => String(cell || "").trim().length > 0),
  );
}

function normalizeHeader(header) {
  return String(header || "").trim().toLowerCase();
}

function rowsToObjects(rows) {
  if (rows.length === 0) {
    throw new Error("CSV file is empty.");
  }

  const headers = rows[0].map(normalizeHeader);
  const missingHeaders = ["title"].filter((column) => !headers.includes(column));

  if (missingHeaders.length > 0) {
    throw new Error(`CSV is missing required header: ${missingHeaders.join(", ")}`);
  }

  return rows.slice(1).map((cells, rowIndex) => {
    const row = {};
    headers.forEach((header, cellIndex) => {
      if (header) {
        row[header] = cells[cellIndex] ?? "";
      }
    });

    return {
      row,
      rowNumber: rowIndex + 2,
    };
  });
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeKeyPart(value) {
  return normalizeText(value).replace(/\s+/g, " ").toLowerCase();
}

function songKey(song) {
  return [
    normalizeKeyPart(song.title),
    normalizeKeyPart(song.artist),
    normalizeKeyPart(song.category),
  ].join("\u0001");
}

function parseBoolean(value, fallback) {
  const normalized = normalizeText(value).toLowerCase();

  if (!normalized) {
    return fallback;
  }

  if (["true", "t", "yes", "y", "1", "x"].includes(normalized)) {
    return true;
  }

  if (["false", "f", "no", "n", "0"].includes(normalized)) {
    return false;
  }

  throw new Error(`Invalid boolean value "${value}"`);
}

function parseGenres(value, fallbackCategory = "") {
  const raw = normalizeText(value);
  const fallback = normalizeText(fallbackCategory);

  if (!raw) {
    return fallback ? [fallback] : [];
  }

  if (raw.startsWith("{") && raw.endsWith("}")) {
    return parsePostgresArrayLiteral(raw);
  }

  return raw
    .split(/[;|,]/)
    .map((genre) => genre.trim())
    .filter(Boolean);
}

function parsePostgresArrayLiteral(value) {
  const inner = value.slice(1, -1);
  const genres = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < inner.length; index += 1) {
    const char = inner[index];
    const nextChar = inner[index + 1];

    if (char === "\\" && inQuotes && nextChar) {
      current += nextChar;
      index += 1;
      continue;
    }

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      if (current.trim()) {
        genres.push(current.trim());
      }
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    genres.push(current.trim());
  }

  return genres;
}

function parseSortOrder(value) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid sort_order value "${value}"`);
  }

  return parsed;
}

function normalizeCsvRow(row) {
  const category = normalizeText(row.category);

  return {
    title: normalizeText(row.title),
    artist: normalizeText(row.artist),
    category,
    genres: parseGenres(row.genres, category),
    wedding: parseBoolean(row.wedding, BOOLEAN_DEFAULTS.wedding),
    funeral: parseBoolean(row.funeral, BOOLEAN_DEFAULTS.funeral),
    party: parseBoolean(row.party, BOOLEAN_DEFAULTS.party),
    wills_favorite: parseBoolean(
      row.wills_favorite,
      BOOLEAN_DEFAULTS.wills_favorite,
    ),
    request_fee: parseBoolean(row.request_fee, BOOLEAN_DEFAULTS.request_fee),
    is_public: parseBoolean(row.is_public, BOOLEAN_DEFAULTS.is_public),
    sort_order: parseSortOrder(row.sort_order),
  };
}

function normalizeExistingSong(row) {
  const category = normalizeText(row.category);

  return {
    title: normalizeText(row.title),
    artist: normalizeText(row.artist),
    category,
    genres: Array.isArray(row.genres)
      ? row.genres.map(String).map((genre) => genre.trim()).filter(Boolean)
      : parseGenres(row.genres, category),
    wedding: Boolean(row.wedding),
    funeral: Boolean(row.funeral),
    party: Boolean(row.party),
    wills_favorite: Boolean(row.wills_favorite),
    request_fee: Boolean(row.request_fee),
    is_public: row.is_public ?? true,
    sort_order: row.sort_order === null || row.sort_order === undefined
      ? null
      : Number(row.sort_order),
  };
}

function songsAreEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function getChangedFields(left, right) {
  return REQUIRED_COLUMNS.filter(
    (field) => JSON.stringify(left[field]) !== JSON.stringify(right[field]),
  ).map((field) => ({
    field,
    before: left[field],
    after: right[field],
  }));
}

function getSupabaseConfig() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error(
      "Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in the server environment.",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY in the server environment.",
    );
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/+$/, ""),
    serviceRoleKey,
    schema: process.env.SUPABASE_SCHEMA || "public",
  };
}

async function supabaseFetch(path, options = {}) {
  const { supabaseUrl, serviceRoleKey, schema } = getSupabaseConfig();
  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (schema !== "public") {
    headers["Accept-Profile"] = schema;
    headers["Content-Profile"] = schema;
  }

  let response;
  try {
    response = await fetch(`${supabaseUrl}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("");
    console.error(`Supabase network error while requesting ${path}:`);
    console.error(error);
    throw error;
  }
  const responseText = await response.text();
  let responseBody = null;

  if (responseText.trim()) {
    try {
      responseBody = JSON.parse(responseText);
    } catch (error) {
      throw new Error(
        `Supabase returned invalid JSON (${response.status} ${response.statusText}): ${responseText}`,
      );
    }
  }

  if (!response.ok) {
    const details =
      responseBody && typeof responseBody === "object"
        ? JSON.stringify(responseBody, null, 2)
        : responseText || "No response body.";
    throw new Error(
      `Supabase request failed (${response.status} ${response.statusText}): ${details}`,
    );
  }

  if (!responseText.trim()) {
    return null;
  }

  return responseBody;
}

async function countExistingSongs(table) {
  const { supabaseUrl, serviceRoleKey, schema } = getSupabaseConfig();
  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    Prefer: "count=exact",
  };

  if (schema !== "public") {
    headers["Accept-Profile"] = schema;
  }

  let response;
  try {
    response = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(table)}?select=title&limit=0`,
      {
        method: "HEAD",
        headers,
      },
    );
  } catch (error) {
    console.error("");
    console.error(`Supabase network error while counting ${table}:`);
    console.error(error);
    throw error;
  }

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Supabase count failed (${response.status} ${response.statusText}): ${
        responseText || "No response body."
      }`,
    );
  }

  const range = response.headers.get("content-range") || "";
  const count = Number(range.split("/")[1]);

  if (!Number.isFinite(count)) {
    throw new Error(`Could not parse Supabase table count from "${range}".`);
  }

  return count;
}

async function readExistingSongs(table) {
  const select = encodeURIComponent(REQUIRED_COLUMNS.join(","));
  const pageSize = 1000;
  const songs = [];

  for (let offset = 0; ; offset += pageSize) {
    const page = await supabaseFetch(
      `/rest/v1/${encodeURIComponent(table)}?select=${select}&limit=${pageSize}&offset=${offset}`,
      { method: "GET" },
    );

    songs.push(...page);

    if (page.length < pageSize) {
      break;
    }
  }

  return songs;
}

function buildExistingIndex(existingSongs) {
  const index = new Map();

  for (const rawSong of existingSongs) {
    const normalized = normalizeExistingSong(rawSong);
    const key = songKey(normalized);
    const matches = index.get(key) || [];
    matches.push({
      raw: rawSong,
      normalized,
    });
    index.set(key, matches);
  }

  return index;
}

function filterParam(column, value) {
  if (value === null || value === undefined) {
    return `${encodeURIComponent(column)}=is.null`;
  }

  return `${encodeURIComponent(column)}=eq.${encodeURIComponent(String(value))}`;
}

async function insertRows(table, rows) {
  if (rows.length === 0) {
    return 0;
  }

  await supabaseFetch(`/rest/v1/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(rows),
  });
  return rows.length;
}

async function updateRow(table, existingSong, payload) {
  const query = [
    filterParam(
      "title",
      existingSong.raw.title === undefined ? "" : existingSong.raw.title,
    ),
    filterParam(
      "artist",
      existingSong.raw.artist === undefined ? "" : existingSong.raw.artist,
    ),
    filterParam(
      "category",
      existingSong.raw.category === undefined ? "" : existingSong.raw.category,
    ),
  ].join("&");

  await supabaseFetch(`/rest/v1/${encodeURIComponent(table)}?${query}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  return 1;
}

function chunkArray(items, size) {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

async function applyPlan(table, plan, batchSize, { insertOnly = false } = {}) {
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalErrors = 0;

  const insertBatches = chunkArray(plan.inserts, batchSize);
  for (let index = 0; index < insertBatches.length; index += 1) {
    const batch = insertBatches[index];
    let inserted = 0;
    let errors = 0;

    try {
      inserted = await insertRows(
        table,
        batch.map((insert) => insert.payload),
      );
      totalInserted += inserted;
    } catch (error) {
      errors = batch.length;
      totalErrors += errors;
      console.error("");
      console.error(`Insert batch ${index + 1} Supabase error:`);
      console.error(error);
    }

    console.log(
      `insert batch ${index + 1}/${insertBatches.length}: attempted=${batch.length}, inserted=${inserted}, updated=0, skipped=0, errors=${errors}`,
    );

    if (errors > 0) {
      throw new Error("Import stopped after an insert batch failed.");
    }
  }

  if (insertOnly) {
    if (plan.updates.length > 0) {
      console.log(
        `insert-only mode: skipped ${plan.updates.length} update(s).`,
      );
    }

    return {
      inserted: totalInserted,
      updated: totalUpdated,
      errors: totalErrors,
    };
  }

  const updateBatches = chunkArray(plan.updates, batchSize);
  for (let index = 0; index < updateBatches.length; index += 1) {
    const batch = updateBatches[index];
    let updated = 0;
    let errors = 0;

    for (const update of batch) {
      try {
        updated += await updateRow(table, update.existingSong, update.payload);
      } catch (error) {
        errors += 1;
        totalErrors += 1;
        console.error("");
        console.error(
          `Update error for "${update.payload.title}" / "${update.payload.artist}" / "${update.payload.category}":`,
        );
        console.error(error);
      }
    }

    totalUpdated += updated;
    console.log(
      `update batch ${index + 1}/${updateBatches.length}: attempted=${batch.length}, inserted=0, updated=${updated}, skipped=${batch.length - updated - errors}, errors=${errors}`,
    );

    if (errors > 0) {
      throw new Error("Import stopped after one or more updates failed.");
    }
  }

  return {
    inserted: totalInserted,
    updated: totalUpdated,
    errors: totalErrors,
  };
}

function createPlan(csvRows, existingIndex) {
  const summary = {
    totalRowsRead: csvRows.length,
    rowsToInsert: 0,
    rowsToUpdate: 0,
    rowsSkippedAsDuplicates: 0,
    rowsWithMissingTitle: 0,
    rowsWithErrors: 0,
    rowsUnchanged: 0,
  };
  const seenCsvKeys = new Set();
  const inserts = [];
  const updates = [];
  const errors = [];

  for (const { row, rowNumber } of csvRows) {
    let payload;

    try {
      payload = normalizeCsvRow(row);
    } catch (error) {
      summary.rowsWithErrors += 1;
      errors.push(`Row ${rowNumber}: ${error.message}`);
      continue;
    }

    if (!payload.title) {
      summary.rowsWithMissingTitle += 1;
      continue;
    }

    const key = songKey(payload);
    if (seenCsvKeys.has(key)) {
      summary.rowsSkippedAsDuplicates += 1;
      errors.push(
        `Row ${rowNumber}: skipped because an earlier CSV row has the same title + artist + category.`,
      );
      continue;
    }
    seenCsvKeys.add(key);

    const existingMatches = existingIndex.get(key) || [];

    if (existingMatches.length > 1) {
      summary.rowsSkippedAsDuplicates += 1;
      errors.push(
        `Row ${rowNumber}: skipped because multiple existing songs match title + artist + category.`,
      );
      continue;
    }

    if (existingMatches.length === 0) {
      summary.rowsToInsert += 1;
      inserts.push({
        rowNumber,
        payload,
      });
      continue;
    }

    const existingSong = existingMatches[0];
    if (songsAreEqual(existingSong.normalized, payload)) {
      summary.rowsUnchanged += 1;
      continue;
    }

    summary.rowsToUpdate += 1;
    updates.push({
      rowNumber,
      existingSong,
      payload,
      changes: getChangedFields(existingSong.normalized, payload),
    });
  }

  return {
    summary,
    inserts,
    updates,
    errors,
  };
}

function printSummary(plan, mode) {
  console.log("");
  console.log(`Song CSV import ${mode}`);
  console.log("----------------------------------------");
  console.log(`total rows read: ${plan.summary.totalRowsRead}`);
  console.log(`rows that would be inserted: ${plan.summary.rowsToInsert}`);
  console.log(`rows that would be updated: ${plan.summary.rowsToUpdate}`);
  console.log(
    `rows skipped as duplicates: ${plan.summary.rowsSkippedAsDuplicates}`,
  );
  console.log(`rows with missing title: ${plan.summary.rowsWithMissingTitle}`);
  console.log(`rows with errors: ${plan.summary.rowsWithErrors}`);
  console.log(`rows unchanged: ${plan.summary.rowsUnchanged}`);

  if (plan.errors.length > 0) {
    console.log("");
    console.log("Details:");
    for (const error of plan.errors.slice(0, 30)) {
      console.log(`- ${error}`);
    }

    if (plan.errors.length > 30) {
      console.log(`- ...and ${plan.errors.length - 30} more`);
    }
  }

  if (plan.inserts.length > 0) {
    console.log("");
    console.log("Rows that would be inserted:");
    for (const insert of plan.inserts.slice(0, 30)) {
      console.log(
        `- Row ${insert.rowNumber}: "${insert.payload.title}" / "${insert.payload.artist}" / "${insert.payload.category}"`,
      );
    }

    if (plan.inserts.length > 30) {
      console.log(`- ...and ${plan.inserts.length - 30} more`);
    }
  }

  if (plan.updates.length > 0) {
    console.log("");
    console.log("Rows that would be updated:");
    for (const update of plan.updates.slice(0, 30)) {
      const changes = update.changes
        .map(
          (change) =>
            `${change.field}: ${JSON.stringify(change.before)} -> ${JSON.stringify(change.after)}`,
        )
        .join("; ");
      console.log(
        `- Row ${update.rowNumber}: "${update.payload.title}" / "${update.payload.artist}" / "${update.payload.category}" (${changes})`,
      );
    }

    if (plan.updates.length > 30) {
      console.log(`- ...and ${plan.updates.length - 30} more`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.csvPath) {
    throw new Error(
      "Please provide a CSV path, for example: --csv /Users/guillaume/Downloads/william_samorey_song_list_import.csv",
    );
  }

  loadDotEnvFile(resolve(".env.local"));
  loadDotEnvFile(resolve(".env"));

  const csvPath = resolve(args.csvPath);
  const csvText = readFileSync(csvPath, "utf8");
  const csvRows = rowsToObjects(parseCsv(csvText));
  const headerSet = new Set(Object.keys(csvRows[0]?.row || {}));
  const missingMappedColumns = REQUIRED_COLUMNS.filter(
    (column) => !headerSet.has(column),
  );

  if (missingMappedColumns.length > 0) {
    console.log(
      `CSV is missing mapped columns that will use safe defaults where possible: ${missingMappedColumns.join(", ")}`,
    );
  }

  if (args.localValidate) {
    const plan = createPlan(csvRows, new Map());
    printSummary(plan, "local validation only");
    console.log("");
    console.log("No Supabase connection was made in local validation mode.");
    return;
  }

  const existingSongs = await readExistingSongs(args.table);
  const tableCount = await countExistingSongs(args.table);
  console.log(`Current Supabase ${args.table} row count: ${tableCount}`);
  console.log(`Fetched ${existingSongs.length} existing song row(s) for comparison.`);
  const existingIndex = buildExistingIndex(existingSongs);
  const plan = createPlan(csvRows, existingIndex);
  const mode = args.apply ? "APPLY" : "DRY RUN";

  printSummary(plan, mode);

  if (args.insertOnly) {
    console.log("");
    console.log(
      "Insert-only mode is enabled. Existing rows that differ from the CSV will not be updated.",
    );
  }

  if (!args.apply) {
    console.log("");
    console.log("Dry run only. No Supabase rows were inserted or updated.");
    console.log("Run again with --apply after reviewing the counts.");
    return;
  }

  if (plan.summary.rowsWithErrors > 0) {
    throw new Error("Import stopped because the CSV contains row errors.");
  }

  const result = await applyPlan(args.table, plan, args.batchSize, {
    insertOnly: args.insertOnly,
  });
  const finalTableCount = await countExistingSongs(args.table);

  console.log("");
  console.log(
    `Import complete. Inserted ${result.inserted} row(s), updated ${result.updated} row(s), errors ${result.errors}.`,
  );
  console.log(`Final Supabase ${args.table} row count: ${finalTableCount}`);
}

main().catch((error) => {
  console.error("");
  console.error("Song import failed:");
  console.error(error);
  process.exit(1);
});
