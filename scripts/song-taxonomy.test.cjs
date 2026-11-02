const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test, afterEach } = require("node:test");
const ts = require("typescript");

// Load the same TypeScript modules as Next.js, with only Clerk access mocked.
const root = path.resolve(__dirname, "..");
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  return resolve.call(this, request.startsWith("@/") ? path.join(root, request.slice(2)) : request, ...args);
};
Module._extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
let adminAllowed = false;
const load = Module._load;
Module._load = function (request, ...args) {
  if (request === "@/lib/adminAuth") return { getAdminAccess: async () => ({ isAllowed: adminAllowed, userId: "test-admin" }) };
  return load.call(this, request, ...args);
};

process.env.SUPABASE_URL = "https://supabase.invalid";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
const taxonomyData = require("../data/songTaxonomy.ts");
const taxonomyStore = require("../lib/supabaseSongTaxonomy.ts");
const songs = require("../lib/supabaseSongs.ts");
const adminRoute = require("../app/api/admin/song-taxonomy/route.ts");
const adminSongsRoute = require("../app/api/admin/songs/route.ts");
const publicRoute = require("../app/api/songs/route.ts");
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const missingTable = () => json({ code: "PGRST205" }, 404);
const baseRow = {
  id: "song-1", title: "Test Song", artist: "Test Artist", category: "Test Show", genres: ["Movie/Game", "Bluegrass"],
  wedding: true, funeral: true, party: true, wills_favorite: true, request_fee: true,
  collection_1970s: true, collection_1980s: true, collection_1990s: true, collection_2000s: true,
  collection_2010s_now: true, oldies: true, custom_collections: ["1960s"],
  private_notes: "Private", sheet_music_location: "Private sheet", backing_track_location: "Private track",
  reference_url: "https://example.com/reference", is_public: true, sort_order: 4,
};
afterEach(() => { adminAllowed = false; });

test("new collections and existing flags survive a song round trip; public output stays private", () => {
  const song = songs.mapSupabaseSongToRepertoireSong(baseRow, [...taxonomyData.defaultSongTaxonomy.genres, "Bluegrass"]);
  assert.deepEqual(song.genres, ["Movie / TV", "Bluegrass"]);
  assert.deepEqual(song.customCollections, ["1960s"]);
  const row = songs.mapRepertoireSongToSupabaseRow(song);
  for (const field of ["wedding", "funeral", "party", "wills_favorite", "request_fee", "collection_1970s", "collection_1980s", "collection_1990s", "collection_2000s", "collection_2010s_now", "oldies"]) {
    assert.equal(row[field], baseRow[field], field);
  }
  assert.deepEqual(row.custom_collections, ["1960s"]);
  assert.equal(row.private_notes, "Private");
  const publicSong = songs.toPublicSong(song);
  assert.deepEqual(publicSong.customCollections, ["1960s"]);
  for (const field of ["notes", "private_notes", "sheetMusic", "backingTrack", "url"]) assert.equal(field in publicSong, false, field);
  assert.ok(taxonomyData.getSongCollections(song).includes("1960s"));
  assert.ok(taxonomyData.getSongCollections(song).includes("Request Fee"));
});

test("a newly registered genre takes precedence over a legacy genre alias", () => {
  assert.deepEqual(taxonomyData.normalizeSongGenres(["Blues"]), ["Jazz"]);
  assert.deepEqual(taxonomyData.normalizeSongGenres(["Blues", " blues "], ["Jazz", "Blues"]), ["Blues"]);
  const song = songs.mapSupabaseSongToRepertoireSong({ ...baseRow, genres: ["Blues"] }, ["Jazz", "Blues"]);
  assert.deepEqual(songs.mapRepertoireSongToSupabaseRow(song, ["Jazz", "Blues"]).genres, ["Blues"]);
});

test("taxonomy validation rejects blank, oversized, reserved, and control-character names", () => {
  for (const value of [null, "", "   ", "a".repeat(61), " All ", "New\nGenre"]) assert.ok(taxonomyData.validateTaxonomyName(value));
  assert.equal(taxonomyData.validateTaxonomyName("Bluegrass"), null);
  assert.deepEqual(taxonomyData.uniqueTaxonomyNames([" Pop ", "pop", "Chamber   Music", "chamber music"]), ["Pop", "Chamber Music"]);
  assert.deepEqual(taxonomyData.normalizeSongGenres(["constructor", "toString"]), ["constructor", "toString"]);
  assert.deepEqual(taxonomyData.normalizeCustomCollections([" 1960S ", "1960s"], ["1960s"]), ["1960s"]);
});

test("available names sort alphabetically with natural decade order without changing assignments", () => {
  const names = ["Wedding", "1980s", "1960s", "Funeral", "1970s", "1960S", "Oldies"];
  assert.deepEqual(taxonomyData.sortTaxonomyNames(names), ["1960s", "1970s", "1980s", "Funeral", "Oldies", "Wedding"]);
  assert.deepEqual(names, ["Wedding", "1980s", "1960s", "Funeral", "1970s", "1960S", "Oldies"]);
  assert.deepEqual(taxonomyData.sortTaxonomyNames(["Pop", "Jazz", "Bluegrass"]), ["Bluegrass", "Jazz", "Pop"]);
  assert.deepEqual(taxonomyData.normalizeSongGenres(["Pop", "Classical"]), ["Pop", "Classical"]);
});

test("missing setup keeps existing songs readable and rejects taxonomy creation without a write", async () => {
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push(options.method);
    return String(url).includes("song_taxonomy") ? missingTable() : json([{ ...baseRow, custom_collections: undefined }]);
  };
  const result = await songs.readSupabaseSongs();
  assert.equal(result.length, 1);
  assert.equal(result[0].weddingRecommended, true);
  assert.deepEqual(result[0].customCollections, []);
  await assert.rejects(taxonomyStore.addSongTaxonomyEntry({ kind: "collection", name: "1960s", userId: "admin" }), { status: 503 });
  assert.ok(calls.every((method) => method === "GET"));
});

test("real Supabase failures do not masquerade as missing setup", async () => {
  global.fetch = async () => json({ code: "42501" }, 403);
  await assert.rejects(taxonomyStore.readSongTaxonomy(), { status: 403 });
});

test("add genre and collection persist to the catalogue before any song is assigned", async () => {
  const entries = [];
  global.fetch = async (url, options) => {
    assert.ok(String(url).includes("song_taxonomy"));
    if (options.method === "POST") {
      const entry = JSON.parse(options.body);
      assert.equal(entry.created_by_clerk_user_id, "admin");
      entries.push(entry);
      return new Response(null, { status: 201 });
    }
    return json(entries);
  };
  const genreResult = await taxonomyStore.addSongTaxonomyEntry({ kind: "genre", name: " Bluegrass ", userId: "admin" });
  assert.ok(genreResult.genres.includes("Bluegrass"));
  const collectionResult = await taxonomyStore.addSongTaxonomyEntry({ kind: "collection", name: "1960s", userId: "admin" });
  assert.ok(collectionResult.collections.includes("1960s"));
  assert.ok(collectionResult.collections.includes("Wedding"));
  assert.equal(collectionResult.configured, true);
  await assert.rejects(taxonomyStore.addSongTaxonomyEntry({ kind: "genre", name: "bluegrass", userId: "admin" }), { status: 409 });
  assert.equal(entries.length, 2);
});

test("concurrent duplicate creation returns a useful conflict", async () => {
  global.fetch = async (url, options) => options.method === "POST" ? json({ code: "23505" }, 409) : json([]);
  await assert.rejects(taxonomyStore.addSongTaxonomyEntry({ kind: "genre", name: "Bluegrass", userId: "admin" }), { status: 409 });
});

test("song saves include new collections and can clear them; older clients omit the field", async () => {
  const song = songs.mapSupabaseSongToRepertoireSong(baseRow);
  const writes = [];
  global.fetch = async (url, options) => {
    if (String(url).includes("song_taxonomy")) return json([{ kind: "collection", name: "1960s" }]);
    if (options.method === "POST") { writes.push(JSON.parse(options.body)); return new Response(null, { status: 201 }); }
    return json([baseRow]);
  };
  await songs.saveSupabaseSongs([song]);
  assert.deepEqual(writes[0][0].custom_collections, ["1960s"]);
  await songs.saveSupabaseSongs([{ ...song, customCollections: [] }]);
  assert.deepEqual(writes[1][0].custom_collections, []);
  const olderSong = { ...song };
  delete olderSong.customCollections;
  await songs.saveSupabaseSongs([olderSong]);
  assert.equal("custom_collections" in writes[2][0], false);
});

test("missing collection column fails loudly before a new assignment can be lost", async () => {
  let written = false;
  global.fetch = async (url, options) => {
    if (options.method === "POST") written = true;
    return String(url).includes("song_taxonomy") ? json([]) : json([{ id: "song-1", title: "Test Song" }]);
  };
  await assert.rejects(songs.saveSupabaseSongs([songs.mapSupabaseSongToRepertoireSong(baseRow)]), /one-time Supabase setup/);
  assert.equal(written, false);
});

test("a first song in an empty table is saved using schema columns", async () => {
  let written;
  global.fetch = async (url, options) => {
    if (String(url).includes("song_taxonomy")) return json([]);
    if (options.method === "POST") { written = JSON.parse(options.body); return new Response(null, { status: 201 }); }
    if (String(url).includes("songs?")) return json([]);
    return json({ definitions: { songs: { properties: Object.fromEntries(Object.keys(baseRow).map((key) => [key, {}])) } } });
  };
  await songs.saveSupabaseSongs([{ ...songs.mapSupabaseSongToRepertoireSong(baseRow), id: undefined }]);
  assert.equal(written[0].title, "Test Song");
  assert.deepEqual(written[0].custom_collections, ["1960s"]);
});

test("Clerk-protected taxonomy endpoints deny unauthorized access before touching Supabase", async () => {
  global.fetch = async () => { throw new Error("Unauthorized database access"); };
  assert.equal((await adminRoute.GET()).status, 403);
  assert.equal((await adminRoute.POST(new Request("http://localhost/api/admin/song-taxonomy", { method: "POST", body: JSON.stringify({ kind: "genre", name: "Bluegrass" }) }))).status, 403);
});

test("invalid collection assignments are rejected before song changes or deletions", async () => {
  adminAllowed = true;
  global.fetch = async () => { throw new Error("Unexpected mutation"); };
  const response = await adminSongsRoute.PUT(new Request("http://localhost/api/admin/songs", {
    method: "PUT",
    body: JSON.stringify({ songs: [{ customCollections: "1960s" }], deletedIds: ["song-1"] }),
  }));
  assert.equal(response.status, 400);
});

test("live request song lookup keeps working independently of the new catalogue", async () => {
  global.fetch = async (url) => {
    assert.ok(String(url).includes("songs?"));
    return json([baseRow]);
  };
  const song = await songs.readSupabaseSongById("song-1");
  assert.equal(song.extraCharge, true);
  assert.equal(song.title, "Test Song");
});

test("admin endpoint validates requests and creates entries as the signed-in admin", async () => {
  adminAllowed = true;
  const invalid = await adminRoute.POST(new Request("http://localhost/api/admin/song-taxonomy", { method: "POST", body: "{" }));
  assert.equal(invalid.status, 400);
  const entries = [];
  global.fetch = async (url, options) => {
    if (options.method === "POST") { entries.push(JSON.parse(options.body)); return new Response(null, { status: 201 }); }
    return json(entries);
  };
  const response = await adminRoute.POST(new Request("http://localhost/api/admin/song-taxonomy", { method: "POST", body: JSON.stringify({ kind: "genre", name: "Bluegrass" }) }));
  assert.equal(response.status, 201);
  assert.equal(entries[0].created_by_clerk_user_id, "test-admin");
});

test("public API supplies new filter options and only public song fields", async () => {
  global.fetch = async (url) => {
    if (String(url).includes("song_taxonomy")) return json([{ kind: "genre", name: "Bluegrass" }, { kind: "collection", name: "1960s" }]);
    assert.ok(String(url).includes("is_public=eq.true"));
    return json([baseRow]);
  };
  const response = await publicRoute.GET();
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.ok(result.taxonomy.genres.includes("Bluegrass"));
  assert.ok(result.taxonomy.collections.includes("1960s"));
  assert.deepEqual(result.songs[0].customCollections, ["1960s"]);
  assert.equal("notes" in result.songs[0], false);
});
