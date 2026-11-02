import {
  normalizeRepertoireGenre,
  repertoireGenres,
  type RepertoireSong,
} from "@/data/repertoire";

export type SongTaxonomyKind = "genre" | "collection";

export type SongTaxonomy = {
  genres: string[];
  collections: string[];
  configured: boolean;
};

export const builtInSongCollections = [
  { field: "weddingRecommended", label: "Wedding" },
  { field: "funeralRecommended", label: "Funeral" },
  { field: "partyRecommended", label: "Party" },
  { field: "wills_favorite", label: "Favorite" },
  { field: "collection1970s", label: "1970s" },
  { field: "collection1980s", label: "1980s" },
  { field: "collection1990s", label: "1990s" },
  { field: "collection2000s", label: "2000s" },
  { field: "collection2010sNow", label: "2010s - Now" },
  { field: "oldies", label: "Oldies" },
  { field: "extraCharge", label: "Request Fee" },
] as const;

const taxonomyNameCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

const collectionPriority = new Map([
  ["favorite", 0],
  ["wedding", 1],
  ["party", 2],
  ["oldies", 3],
  ["funeral", 4],
  ["request fee", 5],
]);

export const defaultSongTaxonomy: SongTaxonomy = {
  genres: sortTaxonomyNames(repertoireGenres),
  collections: sortSongCollections(builtInSongCollections.map(({ label }) => label)),
  configured: false,
};

export function taxonomyNameKey(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function uniqueTaxonomyNames(names: readonly string[]) {
  const seen = new Set<string>();
  return names.map((name) => name.trim().replace(/\s+/g, " ")).filter((name) => {
    const key = taxonomyNameKey(name);
    if (!name || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function sortTaxonomyNames(names: readonly string[]) {
  return uniqueTaxonomyNames(names).sort(taxonomyNameCollator.compare);
}

export function sortSongCollections(names: readonly string[]) {
  return uniqueTaxonomyNames(names).sort((first, second) => {
    const firstPriority = collectionPriority.get(taxonomyNameKey(first)) ?? collectionPriority.size;
    const secondPriority = collectionPriority.get(taxonomyNameKey(second)) ?? collectionPriority.size;
    if (firstPriority !== secondPriority) return firstPriority - secondPriority;

    const firstIsNumbered = /^\d/.test(first);
    const secondIsNumbered = /^\d/.test(second);
    if (firstIsNumbered !== secondIsNumbered) return firstIsNumbered ? 1 : -1;
    return taxonomyNameCollator.compare(first, second);
  });
}

export function validateTaxonomyName(value: unknown) {
  if (typeof value !== "string") return "Enter a name.";
  const name = value.trim().replace(/\s+/g, " ");
  if (!name || name.length > 60) return "Use a name between 1 and 60 characters.";
  if (/[\u0000-\u001f\u007f]/.test(value)) return "Names cannot contain control characters.";
  if (taxonomyNameKey(name) === "all") return '"All" is reserved for the filters.';
  return null;
}

export function normalizeSongGenres(
  values: readonly string[],
  knownGenres: readonly string[] = repertoireGenres,
) {
  const known = new Map(knownGenres.map((name) => [taxonomyNameKey(name), name]));
  return uniqueTaxonomyNames(values.map((value) =>
    known.get(taxonomyNameKey(value)) || normalizeRepertoireGenre(value),
  ));
}

export function normalizeCustomCollections(
  values: readonly string[],
  knownCollections: readonly string[] = [],
) {
  const known = new Map(knownCollections.map((name) => [taxonomyNameKey(name), name]));
  return uniqueTaxonomyNames(values.map((name) => known.get(taxonomyNameKey(name)) || name));
}

export function getSongCollections(song: RepertoireSong) {
  const builtIn = builtInSongCollections.filter(({ field }) =>
    field === "wills_favorite"
      ? song.wills_favorite ?? song.favoriteRecommended
      : Boolean(song[field]),
  ).map(({ label }) => label);
  return sortSongCollections([...builtIn, ...(song.customCollections || [])]);
}

export function isBuiltInCollection(name: string) {
  return builtInSongCollections.some(({ label }) =>
    taxonomyNameKey(label) === taxonomyNameKey(name),
  );
}

export function getCollectionFilterLabel(name: string) {
  if (name === "Wedding" || name === "Funeral" || name === "Party") return `${name} recommended`;
  if (name === "Favorite") return "Will's Favorites";
  return name;
}
