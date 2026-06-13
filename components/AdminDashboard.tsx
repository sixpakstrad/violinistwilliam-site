"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { SongRequestBoard } from "@/components/SongRequestBoard";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
  type SiteDetails,
} from "@/data/adminContent";
import {
  defaultPageContent,
  defaultSeoSettings,
  pageContentStorageKey,
  normalizeSeoSettings,
  seoStorageKey,
  type EditablePageContent,
  type EditablePageKey,
  type SeoPageSettings,
  type SeoSettings,
} from "@/data/pageContent";
import type { RepertoireSong } from "@/data/repertoire";
import { defaultAddOns, defaultRateGuides, type RateGuide } from "@/data/rates";
import {
  defaultEducationContent,
  normalizeEducationContent,
  type EducationArticleContent,
  type EducationContentData,
  type EducationPhoto,
  type LessonRate,
} from "@/data/educationContent";
import {
  defaultRepairContent,
  normalizeRepairContentData,
  type RepairContentData,
  type RepairSectionContent,
  type RepairSlideshowImage,
} from "@/data/repairContent";
import {
  createUpcomingPerformance,
  defaultUpcomingPerformances,
  normalizeUpcomingPerformance,
  type UpcomingPerformance,
} from "@/data/upcomingPerformances";
import {
  defaultMainPageContent,
  type MainPageContentData,
  type MainPageGalleryImage,
  type MainPageReview,
  type MainPageSocialLink,
} from "@/data/mainPageContent";
import {
  defaultAboutContent,
  type AboutContentData,
  type AboutPhoto,
} from "@/data/aboutContent";
import {
  defaultDonateContent,
  type DonateContentData,
} from "@/data/donateContent";
import { songRequestSettings } from "@/data/songRequestSettings";
import { storyEntries, type StoryEntry } from "@/data/stories";

type AdminTab =
  | "requests"
  | "songs"
  | "main"
  | "about"
  | "donate"
  | "pricing"
  | "upcoming"
  | "education"
  | "repairs"
  | "stories"
  | "seo"
  | "details";
type StoredRepertoireSong = Partial<RepertoireSong> & {
  recommended?: boolean;
  wedding?: boolean;
  funeral?: boolean;
  party?: boolean;
  request_fee?: boolean;
};
type StoredStoryEntry = Omit<Partial<StoryEntry>, "body"> & {
  id?: string;
  body?: string[] | string;
};

function normalizeSong(song: StoredRepertoireSong | null, index: number): RepertoireSong {
  const category = song?.category || song?.source || "";
  const genres = Array.isArray(song?.genres)
    ? song.genres.filter(Boolean)
    : [song?.genre || category || "Pop"];
  const isFavorite = song?.wills_favorite ?? song?.favoriteRecommended ?? false;

  return {
    id: song?.id,
    title: song?.title || `Untitled Song ${index + 1}`,
    artist: song?.artist || "",
    category,
    source: song?.source || category,
    genre: genres[0] || song?.genre || category || "Pop",
    genres,
    notes: song?.notes || "",
    sheetMusic: song?.sheetMusic || song?.sheet_music_location || "",
    backingTrack: song?.backingTrack || song?.backing_track_location || "",
    url: song?.url || song?.reference_url || "",
    weddingRecommended:
      song?.weddingRecommended ?? song?.recommended ?? song?.wedding ?? false,
    funeralRecommended: song?.funeralRecommended ?? song?.funeral ?? false,
    partyRecommended: song?.partyRecommended ?? song?.party ?? false,
    wills_favorite: isFavorite,
    favoriteRecommended: isFavorite,
    extraCharge: song?.extraCharge ?? song?.request_fee ?? false,
    is_public: song?.is_public ?? true,
    sort_order: song?.sort_order ?? null,
  };
}

async function fetchAdminSongs() {
  const response = await fetch("/api/admin/songs", { cache: "no-store" });
  const data = (await response.json().catch(() => ({}))) as {
    songs?: StoredRepertoireSong[];
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || `Song load failed with status ${response.status}`);
  }

  if (!Array.isArray(data.songs)) {
    throw new Error("Song load did not return a songs array.");
  }

  return data.songs.map((song, index) => normalizeSong(song, index));
}

function normalizeStory(story: StoredStoryEntry, index: number): StoryEntry {
  const rawBody = Array.isArray(story.body)
    ? story.body
    : typeof story.body === "string"
      ? story.body.split(/\n{2,}/)
      : [];

  return {
    id: story.id || `story-${index + 1}`,
    date: story.date || "",
    marker: story.marker || story.category || "Journal",
    title: story.title || "Untitled Story",
    category: story.category || "Journal",
    teaser: story.teaser || "",
    image: story.image || "",
    imagePosition: story.imagePosition || "center",
    imageFit: story.imageFit || "cover",
    imageZoom: story.imageZoom || 1,
    imageCropRatioWidth: story.imageCropRatioWidth || 3,
    imageCropRatioHeight: story.imageCropRatioHeight || 2,
    imageCustomFrameWidth: story.imageCustomFrameWidth || 1200,
    imageCustomFrameHeight: story.imageCustomFrameHeight || 800,
    imageCropPresetName: story.imageCropPresetName || "Story Header",
    published: story.published ?? true,
    body: rawBody.map((paragraph) => paragraph.trim()).filter(Boolean),
  };
}

function readStoredStories(): StoryEntry[] {
  try {
    const storedStories = readStoredValue<unknown>(
      adminStorageKeys.stories,
      storyEntries,
    );

    if (!Array.isArray(storedStories)) {
      return storyEntries;
    }

    return storedStories.map((story, index) =>
      normalizeStory((story || {}) as StoredStoryEntry, index),
    );
  } catch {
    return storyEntries;
  }
}

function removeRetiredSocialLinks(links: MainPageSocialLink[]) {
  return links.filter((link) => !link.href.includes("winspirationstudio.com"));
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function normalizePageContent(value: unknown): EditablePageContent[] {
  if (!Array.isArray(value)) {
    return defaultPageContent;
  }

  return defaultPageContent.map((defaultPage) => {
    const storedPage = value.find(
      (page): page is Partial<EditablePageContent> =>
        Boolean(page) &&
        typeof page === "object" &&
        (page as Partial<EditablePageContent>).key === defaultPage.key,
    );

    return {
      ...defaultPage,
      ...storedPage,
      key: defaultPage.key,
      label: storedPage?.label || defaultPage.label,
    };
  });
}

function saveStoredValue<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

const songEditorGenreOptions = [
  "Classical",
  "Movie/Game",
  "Musical/Opera",
  "Latin",
  "Traditional",
  "Pop",
  "Rock/Metal",
  "Oldies",
  "R&B",
  "Country",
  "Dance/Techno",
  "Jazz/Lounge",
  "Sacred",
  "Holiday",
  "Other",
];

const songEditorGenreOptionSet = new Set<string>(songEditorGenreOptions);

function getSongEditorGenres(song: RepertoireSong) {
  if (Array.isArray(song.genres) && song.genres.length > 0) {
    return song.genres.filter(Boolean);
  }

  return song.genre ? [song.genre] : [];
}

function getGenreDropdownSummary(genres: string[]) {
  if (genres.length === 0) {
    return "Select genres";
  }

  if (genres.length <= 2) {
    return genres.join(", ");
  }

  return `${genres.slice(0, 2).join(", ")} +${genres.length - 2}`;
}

function getGenreDropdownOptions(genres: string[]) {
  const savedGenres = genres.filter(
    (genre) => !songEditorGenreOptionSet.has(genre),
  );

  return {
    standard: songEditorGenreOptions,
    saved: savedGenres,
  };
}

function getExternalHref(value: string) {
  const trimmedValue = value.trim();

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^www\./i.test(trimmedValue)) {
    return `https://${trimmedValue}`;
  }

  return "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function compareExportText(firstValue: string, secondValue: string) {
  return firstValue.localeCompare(secondValue, undefined, {
    sensitivity: "base",
    numeric: true,
  });
}

function isClassicalGenre(genre: string) {
  return genre.toLowerCase() === "classical";
}

function formatPerformerFirstNameFirst(artist: string) {
  return artist
    .split(/\s*(;|\/|\||\s+&\s+|\s+and\s+)\s*/i)
    .map((part) => {
      const trimmedPart = part.trim();

      if (!trimmedPart || /^(;|\/|\||&|and)$/i.test(trimmedPart)) {
        return part;
      }

      const nameParts = trimmedPart.split(",").map((namePart) => namePart.trim());

      if (nameParts.length < 2 || !nameParts[0] || !nameParts[1]) {
        return trimmedPart;
      }

      return `${nameParts.slice(1).join(" ")} ${nameParts[0]}`.replace(
        /\s+/g,
        " ",
      );
    })
    .join("")
    .replace(/\s+([;/|])/g, " $1")
    .replace(/([;/|])\s+/g, "$1 ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExportSongGenres(song: RepertoireSong) {
  const genres = getSongEditorGenres(song);
  const uniqueGenres = Array.from(new Set(genres.map((genre) => genre.trim()).filter(Boolean)));

  return uniqueGenres.length > 0 ? uniqueGenres : ["Other"];
}

function getExportSongTags(song: RepertoireSong) {
  return [
    song.weddingRecommended ? "Wedding" : "",
    song.funeralRecommended ? "Funeral" : "",
    song.partyRecommended ? "Party" : "",
    song.favoriteRecommended ? "Favorite" : "",
    song.extraCharge ? "Request Fee" : "",
  ].filter(Boolean);
}

function createSongListExportHtml(
  songs: RepertoireSong[],
  siteDetails: SiteDetails,
) {
  const brandName =
    siteDetails.businessIdentity.publicBrandName ||
    siteDetails.businessIdentity.ownerPerformerName ||
    "William Samorey";
  const legalName = siteDetails.businessIdentity.legalBusinessName;
  const serviceArea = siteDetails.businessIdentity.primaryServiceArea;
  const generatedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const groupedSongs = songs.reduce<Record<string, RepertoireSong[]>>(
    (genreGroups, song) => {
      getExportSongGenres(song).forEach((genre) => {
        genreGroups[genre] = [...(genreGroups[genre] || []), song];
      });

      return genreGroups;
    },
    {},
  );

  const genreNames = Object.keys(groupedSongs).sort((firstGenre, secondGenre) => {
    const firstIndex = songEditorGenreOptions.indexOf(firstGenre);
    const secondIndex = songEditorGenreOptions.indexOf(secondGenre);

    if (firstIndex >= 0 && secondIndex >= 0) {
      return firstIndex - secondIndex;
    }

    if (firstIndex >= 0) {
      return -1;
    }

    if (secondIndex >= 0) {
      return 1;
    }

    return compareExportText(firstGenre, secondGenre);
  });

  const genreSections = genreNames
    .map((genre) => {
      const sortedSongs = [...groupedSongs[genre]].sort((firstSong, secondSong) => {
        if (isClassicalGenre(genre)) {
          const artistCompare = compareExportText(
            firstSong.artist || "",
            secondSong.artist || "",
          );

          if (artistCompare !== 0) {
            return artistCompare;
          }
        }

        const titleCompare = compareExportText(firstSong.title, secondSong.title);

        if (titleCompare !== 0) {
          return titleCompare;
        }

        return compareExportText(
          formatPerformerFirstNameFirst(firstSong.artist || ""),
          formatPerformerFirstNameFirst(secondSong.artist || ""),
        );
      });

      const rows = sortedSongs
        .map((song) => {
          const displayArtist = isClassicalGenre(genre)
            ? song.artist
            : formatPerformerFirstNameFirst(song.artist || "");
          const tags = getExportSongTags(song);

          return `
            <tr>
              <td class="song-title">${escapeHtml(song.title)}</td>
              <td>${escapeHtml(displayArtist || "Unknown")}</td>
              <td>${escapeHtml(song.source || "")}</td>
              <td>${tags.length > 0 ? tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("") : "&nbsp;"}</td>
            </tr>
          `;
        })
        .join("");

      return `
        <section>
          <div class="genre-heading">
            <h2>${escapeHtml(genre)}</h2>
            <p>${sortedSongs.length} ${sortedSongs.length === 1 ? "song" : "songs"}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Song Title</th>
                <th>${isClassicalGenre(genre) ? "Composer" : "Performer"}</th>
                <th>Moment / Source</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(brandName)} Song List</title>
        <style>
          :root {
            color: #332821;
            background: #f4efe7;
            font-family: "Helvetica Neue", Arial, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background:
              radial-gradient(circle at top left, rgba(182, 115, 70, 0.18), transparent 32rem),
              linear-gradient(135deg, #f9f5ee, #ebe0d2);
            color: #332821;
          }

          .page {
            max-width: 980px;
            margin: 0 auto;
            padding: 48px 36px 64px;
          }

          header {
            border-bottom: 1px solid rgba(105, 78, 50, 0.24);
            margin-bottom: 34px;
            padding-bottom: 22px;
          }

          .eyebrow,
          .genre-heading p,
          th {
            color: #b86f45;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          h1,
          h2 {
            font-family: Georgia, "Times New Roman", serif;
            font-weight: 400;
            letter-spacing: 0;
          }

          h1 {
            margin: 8px 0 10px;
            font-size: clamp(2.4rem, 6vw, 4.6rem);
            line-height: 0.95;
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 18px;
            margin: 0;
            color: rgba(51, 40, 33, 0.72);
            font-size: 0.95rem;
          }

          section {
            break-inside: avoid;
            margin: 30px 0 42px;
          }

          .genre-heading {
            align-items: end;
            border-bottom: 1px solid rgba(105, 78, 50, 0.18);
            display: flex;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 14px;
            padding-bottom: 10px;
          }

          h2 {
            margin: 0;
            color: #2c211b;
            font-size: 2rem;
          }

          .genre-heading p {
            margin: 0;
            white-space: nowrap;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(255, 252, 247, 0.68);
            box-shadow: 0 12px 36px rgba(58, 34, 22, 0.08);
          }

          th,
          td {
            border-bottom: 1px solid rgba(105, 78, 50, 0.14);
            padding: 11px 12px;
            text-align: left;
            vertical-align: top;
          }

          th {
            background: rgba(255, 252, 247, 0.82);
            font-size: 0.62rem;
          }

          td {
            font-size: 0.9rem;
            line-height: 1.35;
          }

          .song-title {
            color: #211915;
            font-weight: 700;
          }

          td span {
            border: 1px solid rgba(184, 111, 69, 0.32);
            color: #8f4f2d;
            display: inline-block;
            font-size: 0.62rem;
            letter-spacing: 0.12em;
            margin: 0 5px 5px 0;
            padding: 4px 6px;
            text-transform: uppercase;
          }

          .actions {
            margin: 0 0 28px;
          }

          button {
            background: #2c211b;
            border: 0;
            color: #fffaf2;
            cursor: pointer;
            font-size: 0.7rem;
            letter-spacing: 0.16em;
            padding: 12px 18px;
            text-transform: uppercase;
          }

          @media print {
            body {
              background: #fff;
            }

            .page {
              max-width: none;
              padding: 0;
            }

            .actions {
              display: none;
            }

            table {
              box-shadow: none;
            }
          }
        </style>
      </head>
      <body>
        <main class="page">
          <div class="actions">
            <button type="button" onclick="window.print()">Save / Print PDF</button>
          </div>
          <header>
            <div class="eyebrow">Song Library Export</div>
            <h1>${escapeHtml(brandName)} Song List</h1>
            <p class="meta">
              ${legalName ? `<span>${escapeHtml(legalName)}</span>` : ""}
              ${serviceArea ? `<span>${escapeHtml(serviceArea)}</span>` : ""}
              <span>Generated ${escapeHtml(generatedDate)}</span>
            </p>
          </header>
          ${genreSections}
        </main>
        <script>
          window.addEventListener("load", () => {
            window.setTimeout(() => window.print(), 450);
          });
        </script>
      </body>
    </html>`;
}

function GenreCheckboxDropdown({
  selectedGenres,
  isOpen,
  onOpenChange,
  onChange,
}: {
  selectedGenres: string[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onChange: (genres: string[]) => void;
}) {
  const { standard, saved } = getGenreDropdownOptions(selectedGenres);
  const summary = getGenreDropdownSummary(selectedGenres);
  const toggleGenre = (genre: string) => {
    const nextGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];

    onChange(nextGenres);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between gap-3 border border-ivory/10 bg-espresso/45 px-3 text-left text-sm text-ivory outline-none transition hover:border-gold/45"
      >
        <span className="truncate">{summary}</span>
        <span
          className={`text-gold transition ${isOpen ? "rotate-180" : ""}`}
        >
          v
        </span>
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-[120] mt-2 max-h-72 w-full min-w-56 overflow-y-auto border border-gold/30 bg-espresso p-3 shadow-2xl shadow-espresso/45">
          <div className="grid gap-2">
            {standard.map((genre) => (
              <label
                key={genre}
                className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:text-ivory"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          {saved.length > 0 ? (
            <div className="mt-3 border-t border-ivory/10 pt-3">
              <p className="mb-2 text-[0.62rem] uppercase tracking-[0.16em] text-smoke-brown">
                Saved on this song
              </p>
              <div className="grid gap-2">
                {saved.map((genre) => (
                  <label
                    key={genre}
                    className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:text-ivory"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const imagePositionOptions = [
  { label: "Centered", value: "center" },
  { label: "Higher", value: "center 18%" },
  { label: "Top", value: "center 8%" },
  { label: "Lower", value: "center 72%" },
  { label: "Left", value: "25% center" },
  { label: "Right", value: "75% center" },
];

const imagePresetStorageKey = "winspiration.admin.imageCropPresets";

type ImageCropPreset = {
  name: string;
  fit: string;
  position: string;
  zoom: number;
  cropRatioWidth: number;
  cropRatioHeight: number;
  customFrameWidth: number;
  customFrameHeight: number;
};

const defaultImageCropPresets: ImageCropPreset[] = [
  {
    name: "Homepage Hero",
    fit: "cover",
    position: "50% 35%",
    zoom: 1,
    cropRatioWidth: 16,
    cropRatioHeight: 9,
    customFrameWidth: 1600,
    customFrameHeight: 900,
  },
  {
    name: "Social Card",
    fit: "cover",
    position: "50% 35%",
    zoom: 1,
    cropRatioWidth: 1200,
    cropRatioHeight: 630,
    customFrameWidth: 1200,
    customFrameHeight: 630,
  },
  {
    name: "Story Header",
    fit: "cover",
    position: "50% 42%",
    zoom: 1,
    cropRatioWidth: 3,
    cropRatioHeight: 2,
    customFrameWidth: 1200,
    customFrameHeight: 800,
  },
  {
    name: "About Portrait",
    fit: "contain",
    position: "50% 35%",
    zoom: 1,
    cropRatioWidth: 4,
    cropRatioHeight: 5,
    customFrameWidth: 800,
    customFrameHeight: 1000,
  },
  {
    name: "Gallery Wide",
    fit: "contain",
    position: "center",
    zoom: 1,
    cropRatioWidth: 16,
    cropRatioHeight: 9,
    customFrameWidth: 1600,
    customFrameHeight: 900,
  },
  {
    name: "Mobile Hero",
    fit: "cover",
    position: "50% 35%",
    zoom: 1,
    cropRatioWidth: 9,
    cropRatioHeight: 16,
    customFrameWidth: 900,
    customFrameHeight: 1600,
  },
];

const ratioPresets = [
  { label: "1:1", width: 1, height: 1, frameWidth: 1000, frameHeight: 1000 },
  { label: "4:5", width: 4, height: 5, frameWidth: 800, frameHeight: 1000 },
  { label: "3:2", width: 3, height: 2, frameWidth: 1200, frameHeight: 800 },
  { label: "16:9", width: 16, height: 9, frameWidth: 1600, frameHeight: 900 },
  { label: "21:9", width: 21, height: 9, frameWidth: 2100, frameHeight: 900 },
  { label: "Portrait", width: 4, height: 5, frameWidth: 800, frameHeight: 1000 },
  { label: "Landscape", width: 3, height: 2, frameWidth: 1200, frameHeight: 800 },
  {
    label: "Open Graph",
    width: 1200,
    height: 630,
    frameWidth: 1200,
    frameHeight: 630,
  },
];

const cropTargets = [
  {
    label: "Page Hero / Header",
    description: "Wide page headers and hero images",
    width: 16,
    height: 9,
    frameWidth: 1600,
    frameHeight: 900,
  },
  {
    label: "Story Header",
    description: "Journal and article header images",
    width: 3,
    height: 2,
    frameWidth: 1200,
    frameHeight: 800,
  },
  {
    label: "Card Thumbnail",
    description: "Portrait cards and compact thumbnails",
    width: 4,
    height: 5,
    frameWidth: 800,
    frameHeight: 1000,
  },
  {
    label: "Social Share Image",
    description: "Google and social preview cards",
    width: 1200,
    height: 630,
    frameWidth: 1200,
    frameHeight: 630,
  },
];

function clampCropValue(value: number) {
  return Math.min(100, Math.max(0, value));
}

function readImageCropPresets(): ImageCropPreset[] {
  if (typeof window === "undefined") {
    return defaultImageCropPresets;
  }

  try {
    const raw = window.localStorage.getItem(imagePresetStorageKey);
    const saved = raw ? (JSON.parse(raw) as ImageCropPreset[]) : [];
    const names = new Set(saved.map((preset) => preset.name));
    return [
      ...defaultImageCropPresets.filter((preset) => !names.has(preset.name)),
      ...saved,
    ];
  } catch {
    return defaultImageCropPresets;
  }
}

function saveImageCropPresets(presets: ImageCropPreset[]) {
  window.localStorage.setItem(imagePresetStorageKey, JSON.stringify(presets));
}

function parsePosition(value?: string) {
  if (!value || value === "center") {
    return { x: 50, y: 50 };
  }

  const parts = value.split(/\s+/);
  const parsePart = (part: string | undefined, fallback: number) => {
    if (!part || part === "center") return fallback;
    if (part === "left" || part === "top") return 0;
    if (part === "right" || part === "bottom") return 100;
    const parsed = Number.parseFloat(part.replace("%", ""));
    return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : fallback;
  };

  if (parts.length === 1) {
    return { x: parsePart(parts[0], 50), y: 50 };
  }

  return {
    x: parsePart(parts[0], 50),
    y: parsePart(parts[1], 50),
  };
}

function formatPosition(x: number, y: number) {
  return `${Math.round(x)}% ${Math.round(y)}%`;
}

function normalizeNumber(value: number | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Could not read file."));
    };
    reader.onerror = () => reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

async function prepareImageFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return readFileAsDataUrl(file);
  }

  const rawDataUrl = await readFileAsDataUrl(file);

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const maxSize = 1800;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) {
        resolve(rawDataUrl);
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.86));
    };
    image.onerror = () => resolve(rawDataUrl);
    image.src = rawDataUrl;
  });
}

function MediaPathField({
  label,
  value,
  onChange,
  placeholder = "/media/image-name.jpg",
  altValue,
  onAltChange,
  cropValue,
  onCropChange,
  fitValue,
  onFitChange,
  zoomValue,
  onZoomChange,
  ratioWidthValue,
  ratioHeightValue,
  onRatioChange,
  frameWidthValue,
  frameHeightValue,
  onFrameChange,
  presetNameValue,
  onPresetNameChange,
  socialPreview = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  altValue?: string;
  onAltChange?: (value: string) => void;
  cropValue?: string;
  onCropChange?: (value: string) => void;
  fitValue?: string;
  onFitChange?: (value: string) => void;
  zoomValue?: number;
  onZoomChange?: (value: number) => void;
  ratioWidthValue?: number;
  ratioHeightValue?: number;
  onRatioChange?: (width: number, height: number) => void;
  frameWidthValue?: number;
  frameHeightValue?: number;
  onFrameChange?: (width: number, height: number) => void;
  presetNameValue?: string;
  onPresetNameChange?: (value: string) => void;
  socialPreview?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [presets, setPresets] = useState<ImageCropPreset[]>(() =>
    readImageCropPresets(),
  );
  const [selectedPresetName, setSelectedPresetName] = useState(
    presetNameValue || presets[0]?.name || "",
  );
  const [activeCropTarget, setActiveCropTarget] = useState(
    socialPreview ? "Social Share Image" : presetNameValue || "Page Hero / Header",
  );
  const [showOriginalCrop, setShowOriginalCrop] = useState(false);
  const [fineTuneCrop, setFineTuneCrop] = useState(false);
  const [focalPointMode, setFocalPointMode] = useState(false);
  const [newPresetName, setNewPresetName] = useState("");
  const [customRatio, setCustomRatio] = useState("");
  const [customFrame, setCustomFrame] = useState("");
  const cropFrameRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const selectedFit = fitValue === "contain" ? "contain" : "cover";
  const selectedZoom = normalizeNumber(zoomValue, 1);
  const selectedRatioWidth = normalizeNumber(
    ratioWidthValue,
    socialPreview ? 1200 : 16,
  );
  const selectedRatioHeight = normalizeNumber(
    ratioHeightValue,
    socialPreview ? 630 : 9,
  );
  const selectedFrameWidth = normalizeNumber(
    frameWidthValue,
    socialPreview ? 1200 : 1600,
  );
  const selectedFrameHeight = normalizeNumber(
    frameHeightValue,
    socialPreview ? 630 : 900,
  );
  const selectedPosition = parsePosition(cropValue);
  const activePreviewPosition = showOriginalCrop
    ? "50% 50%"
    : cropValue || "50% 35%";
  const activePositionForMarker = parsePosition(activePreviewPosition);
  const activePreviewZoom = showOriginalCrop ? 1 : selectedZoom;
  const nudgeAmount = fineTuneCrop ? 2 : 8;
  const canFrame = Boolean(onCropChange || onFitChange || onZoomChange);
  const previewObjectStyle: CSSProperties = {
    objectFit: selectedFit,
    objectPosition: activePreviewPosition,
    transform: `scale(${activePreviewZoom})`,
    transformOrigin: activePreviewPosition,
  };

  const chooseFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setIsLoading(true);
    try {
      onChange(await prepareImageFile(file));
    } finally {
      setIsLoading(false);
    }
  };

  const updatePosition = (axis: "x" | "y", nextValue: number) => {
    const nextPosition =
      axis === "x"
        ? formatPosition(clampCropValue(nextValue), selectedPosition.y)
        : formatPosition(selectedPosition.x, clampCropValue(nextValue));

    onCropChange?.(nextPosition);
  };

  const updatePositionPair = (nextX: number, nextY: number) => {
    onCropChange?.(formatPosition(clampCropValue(nextX), clampCropValue(nextY)));
  };

  const nudgeCrop = (deltaX: number, deltaY: number) => {
    updatePositionPair(selectedPosition.x + deltaX, selectedPosition.y + deltaY);
  };

  const startCropDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!onCropChange) {
      return;
    }

    const frame = event.currentTarget;
    const rect = frame.getBoundingClientRect();

    if (focalPointMode) {
      updatePositionPair(
        ((event.clientX - rect.left) / rect.width) * 100,
        ((event.clientY - rect.top) / rect.height) * 100,
      );
      setFocalPointMode(false);
      return;
    }

    frame.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: selectedPosition.x,
      startY: selectedPosition.y,
    };
  };

  const moveCropDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    const frame = cropFrameRef.current;

    if (!dragStart || !frame || dragStart.pointerId !== event.pointerId) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const deltaX = ((event.clientX - dragStart.startClientX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragStart.startClientY) / rect.height) * 100;

    updatePositionPair(dragStart.startX - deltaX, dragStart.startY - deltaY);
  };

  const endCropDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current?.pointerId === event.pointerId) {
      dragStartRef.current = null;
    }
  };

  const applyRatio = (
    width: number,
    height: number,
    frameWidth = width,
    frameHeight = height,
  ) => {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return;
    }

    onRatioChange?.(width, height);
    onFrameChange?.(frameWidth, frameHeight);
  };

  const applyCustomRatio = () => {
    const match = customRatio.trim().match(/^(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)$/i);

    if (!match) {
      return;
    }

    applyRatio(Number(match[1]), Number(match[2]), selectedFrameWidth, selectedFrameHeight);
  };

  const applyCustomFrame = () => {
    const match = customFrame.trim().match(/^(\d+)\s*[x:]\s*(\d+)$/i);

    if (!match) {
      return;
    }

    const width = Number(match[1]);
    const height = Number(match[2]);
    applyRatio(width, height, width, height);
  };

  const applyPreset = (presetName: string) => {
    const preset = presets.find((item) => item.name === presetName);

    if (!preset) {
      return;
    }

    setSelectedPresetName(preset.name);
    onPresetNameChange?.(preset.name);
    onFitChange?.(preset.fit);
    onCropChange?.(preset.position);
    onZoomChange?.(preset.zoom);
    onRatioChange?.(preset.cropRatioWidth, preset.cropRatioHeight);
    onFrameChange?.(preset.customFrameWidth, preset.customFrameHeight);
  };

  const savePreset = () => {
    const name = newPresetName.trim();

    if (!name) {
      return;
    }

    const nextPreset: ImageCropPreset = {
      name,
      fit: selectedFit,
      position: cropValue || "50% 35%",
      zoom: selectedZoom,
      cropRatioWidth: selectedRatioWidth,
      cropRatioHeight: selectedRatioHeight,
      customFrameWidth: selectedFrameWidth,
      customFrameHeight: selectedFrameHeight,
    };
    const nextPresets = [
      ...presets.filter((preset) => preset.name !== name),
      nextPreset,
    ];

    setPresets(nextPresets);
    saveImageCropPresets(nextPresets);
    setSelectedPresetName(name);
    onPresetNameChange?.(name);
    setNewPresetName("");
  };

  const resetCrop = () => {
    onFitChange?.("cover");
    onCropChange?.("50% 35%");
    onZoomChange?.(1);
  };

  const resetTargetCrop = () => {
    const target = cropTargets.find((item) => item.label === activeCropTarget);
    resetCrop();
    if (target) {
      applyRatio(target.width, target.height, target.frameWidth, target.frameHeight);
    }
  };

  const applyCropTarget = (targetLabel: string) => {
    const target = cropTargets.find((item) => item.label === targetLabel);

    if (!target) {
      return;
    }

    setActiveCropTarget(target.label);
    applyRatio(target.width, target.height, target.frameWidth, target.frameHeight);
    onPresetNameChange?.(target.label);
  };

  return (
    <div className="grid gap-4 border border-ivory/10 bg-espresso/25 p-4">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
          {label}
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex min-h-10 cursor-pointer items-center justify-center border border-gold/35 px-4 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory">
          {isLoading ? "Preparing..." : "Choose Image"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              void chooseFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onAltChange?.("");
            }}
            className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
          >
            Clear
          </button>
        ) : null}
      </div>

      {onAltChange ? (
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
            Alt Text / Image Description
          </span>
          <input
            value={altValue || ""}
            onChange={(event) => onAltChange(event.target.value)}
            placeholder="Describe the image for accessibility and search"
            className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
          />
        </label>
      ) : null}

      {canFrame ? (
        <div className="grid gap-4 border-t border-ivory/10 pt-4">
          <div className="grid gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold/80">
                Crop Target
              </p>
              <p className="mt-1 text-sm leading-6 text-ivory-muted">
                Choose the real website frame you are editing, then drag the photo in the preview below.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {cropTargets.map((target) => (
                <button
                  key={target.label}
                  type="button"
                  onClick={() => applyCropTarget(target.label)}
                  className={`border px-3 py-3 text-left transition ${
                    activeCropTarget === target.label
                      ? "border-gold bg-gold/10 text-ivory"
                      : "border-ivory/10 bg-espresso/35 text-ivory-muted hover:border-gold/50 hover:text-ivory"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-[0.16em]">
                    {target.label}
                  </span>
                  <span className="mt-2 block text-xs leading-5">
                    {target.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                Display Mode
              </span>
              <select
                value={selectedFit}
                onChange={(event) => onFitChange?.(event.target.value)}
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
              >
                <option value="cover">Fill frame / crop to frame</option>
                <option value="contain">Show full image / contain</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                Saved Crop Preset
              </span>
              <select
                value={selectedPresetName}
                onChange={(event) => applyPreset(event.target.value)}
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
              >
                {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                Zoom
              </span>
              <input
                type="range"
                min="0.75"
                max="2.5"
                step="0.01"
                value={selectedZoom}
                onChange={(event) => onZoomChange?.(Number(event.target.value))}
                className="w-full accent-gold"
              />
              <span className="mt-1 block text-xs text-ivory-muted">
                {selectedZoom.toFixed(2)}x
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowOriginalCrop((current) => !current)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                {showOriginalCrop ? "Return to Saved Crop" : "Show Original Crop"}
              </button>
              <button
                type="button"
                onClick={() => setFocalPointMode((current) => !current)}
                className={`border px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  focalPointMode
                    ? "border-gold bg-gold/10 text-ivory"
                    : "border-ivory/10 text-ivory-muted hover:border-gold/50 hover:text-ivory"
                }`}
              >
                {focalPointMode ? "Click the Subject" : "Set Focal Point"}
              </button>
              <button
                type="button"
                onClick={() => setFineTuneCrop((current) => !current)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                {fineTuneCrop ? "Fine Tune On" : "Fine Tune Off"}
              </button>
            </div>
          </div>

          <div className="grid gap-3 border border-ivory/10 bg-espresso/30 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gold/80">
              Nudge Crop
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => nudgeCrop(0, -nudgeAmount)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                Up
              </button>
              <button
                type="button"
                onClick={() => nudgeCrop(-nudgeAmount, 0)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                Left
              </button>
              <button
                type="button"
                onClick={() => nudgeCrop(nudgeAmount, 0)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                Right
              </button>
              <button
                type="button"
                onClick={() => nudgeCrop(0, nudgeAmount)}
                className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                Down
              </button>
              <button
                type="button"
                onClick={resetTargetCrop}
                className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold hover:text-ivory"
              >
                Reset This Crop
              </button>
            </div>
            <p className="text-xs leading-5 text-ivory-muted">
              Current crop: {activePreviewPosition} · Zoom {activePreviewZoom.toFixed(2)}x ·{" "}
              {activeCropTarget}
            </p>
          </div>

          <details className="group border border-ivory/10 bg-espresso/25">
            <summary className="cursor-pointer list-none px-4 py-3 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:text-ivory">
              Advanced Ratio and Preset Controls
            </summary>
            <div className="grid gap-4 border-t border-ivory/10 p-4">
              <div className="grid gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-gold/80">
                  Crop Ratio Presets
                </p>
                <div className="flex flex-wrap gap-2">
                  {ratioPresets.map((ratio) => (
                    <button
                      key={ratio.label}
                      type="button"
                      onClick={() =>
                        applyRatio(
                          ratio.width,
                          ratio.height,
                          ratio.frameWidth,
                          ratio.frameHeight,
                        )
                      }
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Horizontal Position
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={selectedPosition.x}
                    onChange={(event) => updatePosition("x", Number(event.target.value))}
                    className="w-full accent-gold"
                  />
                  <span className="mt-1 block text-xs text-ivory-muted">
                    {Math.round(selectedPosition.x)}%
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Vertical Position
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={selectedPosition.y}
                    onChange={(event) => updatePosition("y", Number(event.target.value))}
                    className="w-full accent-gold"
                  />
                  <span className="mt-1 block text-xs text-ivory-muted">
                    {Math.round(selectedPosition.y)}%
                  </span>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Custom Ratio
                  </span>
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      value={customRatio}
                      onChange={(event) => setCustomRatio(event.target.value)}
                      placeholder="5:7, 9:16, 2.39:1"
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <button
                      type="button"
                      onClick={applyCustomRatio}
                      className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                    >
                      Apply
                    </button>
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Custom Pixel Frame
                  </span>
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      value={customFrame}
                      onChange={(event) => setCustomFrame(event.target.value)}
                      placeholder="1200x630, 800x1000"
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <button
                      type="button"
                      onClick={applyCustomFrame}
                      className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                    >
                      Apply
                    </button>
                  </div>
                </label>
              </div>

              <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                <input
                  value={newPresetName}
                  onChange={(event) => setNewPresetName(event.target.value)}
                  placeholder="Save current crop as a named preset"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
                <button
                  type="button"
                  onClick={savePreset}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.14em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Save Preset
                </button>
              </div>

              <p className="text-xs leading-5 text-ivory-muted">
                Current frame: {selectedRatioWidth}:{selectedRatioHeight} ·{" "}
                {selectedFrameWidth}x{selectedFrameHeight}px
              </p>
            </div>
          </details>
        </div>
      ) : null}

      {onCropChange && !canFrame ? (
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
            Image Crop / Framing
          </span>
          <select
            value={cropValue || "center"}
            onChange={(event) => onCropChange(event.target.value)}
            className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
          >
            {imagePositionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {value ? (
        <div className="grid gap-4 border-t border-ivory/10 pt-4">
          <div>
            <p className="mb-2 text-[0.64rem] uppercase tracking-[0.18em] text-ivory-muted/80">
              Full Original Image
            </p>
            <div className="relative h-44 overflow-hidden border border-ivory/10 bg-espresso/40">
              <img
                src={value}
                alt={altValue || ""}
                className="h-full w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-4 border border-gold/45" />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-[0.64rem] uppercase tracking-[0.18em] text-ivory-muted/80">
                Website Frame Preview / Drag to Reframe
              </p>
              <div
                ref={cropFrameRef}
                onPointerDown={startCropDrag}
                onPointerMove={moveCropDrag}
                onPointerUp={endCropDrag}
                onPointerCancel={endCropDrag}
                className={`relative overflow-hidden border border-gold/55 bg-espresso/40 shadow-[inset_0_0_0_1px_rgba(251,247,239,0.08)] [touch-action:none] ${
                  focalPointMode ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"
                }`}
                style={{ aspectRatio: `${selectedRatioWidth} / ${selectedRatioHeight}` }}
              >
                <img
                  src={value}
                  alt={altValue || ""}
                  className="h-full w-full"
                  style={previewObjectStyle}
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-3 border border-ivory/35" />
                <div
                  className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-espresso/55 shadow-lg"
                  style={{
                    left: `${activePositionForMarker.x}%`,
                    top: `${activePositionForMarker.y}%`,
                  }}
                />
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-sm bg-espresso/75 px-3 py-2 text-[0.62rem] uppercase tracking-[0.14em] text-ivory">
                  {focalPointMode ? "Click the face, violin, or subject" : "Drag image to reframe"}
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[0.64rem] uppercase tracking-[0.18em] text-ivory-muted/80">
                Selected Custom Crop / Frame
              </p>
              <div
                className="relative max-h-72 overflow-hidden border border-gold/40 bg-espresso/40"
                style={{ aspectRatio: `${selectedRatioWidth} / ${selectedRatioHeight}` }}
              >
                <img
                  src={value}
                  alt={altValue || ""}
                  className="h-full w-full"
                  style={previewObjectStyle}
                />
                <div className="pointer-events-none absolute inset-3 border border-ivory/35" />
              </div>
            </div>
          </div>
          {socialPreview ? (
            <div>
              <p className="mb-2 text-[0.64rem] uppercase tracking-[0.18em] text-ivory-muted/80">
                Social Card / Open Graph Preview
              </p>
              <div className="relative aspect-[1200/630] overflow-hidden border border-gold/45 bg-espresso/40">
                <img
                  src={value}
                  alt={altValue || ""}
                  className="h-full w-full"
                  style={previewObjectStyle}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function SettingsAccordion({
  title,
  description,
  children,
  defaultOpen = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border border-ivory/10 bg-espresso/35"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4">
        <span>
          <span className="block text-sm font-medium uppercase tracking-[0.22em] text-ivory">
            {title}
          </span>
          {description ? (
            <span className="mt-2 block text-sm leading-6 text-ivory-muted">
              {description}
            </span>
          ) : null}
        </span>
        <span className="text-xl leading-none text-gold transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="grid gap-4 border-t border-ivory/10 px-5 py-5">
        {children}
      </div>
    </details>
  );
}

function SettingsInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const isDate = type === "date";

  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/40 focus:border-gold/70 ${
          isDate ? "cursor-pointer" : ""
        }`}
      />
      {isDate ? (
        <span className="mt-2 block text-xs leading-5 text-ivory-muted/70">
          Choose from the calendar, or type the date directly.
        </span>
      ) : null}
    </label>
  );
}

const adminHourOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1),
);
const adminMinuteOptions = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0"),
);
const adminPeriodOptions = ["AM", "PM"];

function parseTimeParts(value: string) {
  if (!value) {
    return { hour: "", minute: "", period: "" };
  }

  const [rawHour, rawMinute] = value.split(":");
  const hourNumber = Number(rawHour);

  if (Number.isNaN(hourNumber) || !rawMinute) {
    return { hour: "", minute: "", period: "" };
  }

  const period = hourNumber >= 12 ? "PM" : "AM";
  const displayHour = hourNumber % 12 || 12;

  return {
    hour: String(displayHour),
    minute: rawMinute,
    period,
  };
}

function buildTimeValue(hour: string, minute: string, period: string) {
  if (!hour || !minute || !period) {
    return "";
  }

  let numericHour = Number(hour);

  if (period === "AM" && numericHour === 12) {
    numericHour = 0;
  }

  if (period === "PM" && numericHour !== 12) {
    numericHour += 12;
  }

  return `${String(numericHour).padStart(2, "0")}:${minute}`;
}

function SettingsTimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const initialParts = parseTimeParts(value);
  const [hour, setHour] = useState(initialParts.hour);
  const [minute, setMinute] = useState(initialParts.minute);
  const [period, setPeriod] = useState(initialParts.period);
  const selectClass =
    "min-h-12 w-full cursor-pointer border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none transition focus:border-gold/70";

  useEffect(() => {
    const nextParts = parseTimeParts(value);
    setHour(nextParts.hour);
    setMinute(nextParts.minute);
    setPeriod(nextParts.period);
  }, [value]);

  const updateTime = (
    nextHour: string,
    nextMinute: string,
    nextPeriod: string,
  ) => {
    setHour(nextHour);
    setMinute(nextMinute);
    setPeriod(nextPeriod);

    if (!nextHour && !nextMinute && !nextPeriod) {
      onChange("");
      return;
    }

    const nextValue = buildTimeValue(nextHour, nextMinute, nextPeriod);
    if (nextValue) {
      onChange(nextValue);
    }
  };

  return (
    <fieldset>
      <legend className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
        {label}
      </legend>
      <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-2">
        <select
          aria-label={`${label} hour`}
          value={hour}
          onChange={(event) => updateTime(event.target.value, minute, period)}
          className={selectClass}
        >
          <option value="">--</option>
          {adminHourOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-lg text-ivory-muted">:</span>
        <select
          aria-label={`${label} minute`}
          value={minute}
          onChange={(event) => updateTime(hour, event.target.value, period)}
          className={selectClass}
        >
          <option value="">--</option>
          {adminMinuteOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          aria-label={`${label} AM or PM`}
          value={period}
          onChange={(event) => updateTime(hour, minute, event.target.value)}
          className={selectClass}
        >
          <option value="">--</option>
          {adminPeriodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-xs leading-5 text-ivory-muted/70">
          Select hour, minute, and AM/PM.
        </span>
        {hour || minute || period ? (
          <button
            type="button"
            onClick={() => updateTime("", "", "")}
            className="text-xs uppercase tracking-[0.16em] text-gold transition hover:text-ivory"
          >
            Clear
          </button>
        ) : null}
      </div>
    </fieldset>
  );
}

function SettingsTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none transition placeholder:text-ivory-muted/40 focus:border-gold/70"
      />
    </label>
  );
}

function SettingsToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 border border-ivory/10 bg-espresso/35 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.2em] text-ivory-muted">
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-gold"
      />
    </label>
  );
}

function seoPreviewUrl(page: SeoPageSettings) {
  if (page.canonicalUrl.trim()) {
    return page.canonicalUrl.trim();
  }

  const slug = page.urlSlug.startsWith("/") ? page.urlSlug : `/${page.urlSlug}`;
  return `https://violinistwilliam.com${slug}`;
}

function seoWarnings(page: SeoPageSettings) {
  const warnings: string[] = [];
  const title = page.pageTitle.trim();
  const description = page.metaDescription.trim();
  const keyword = page.primaryKeyword.trim().toLowerCase();
  const titleAndDescription = `${title} ${description}`.toLowerCase();

  if (title.length > 60) {
    warnings.push("Title is longer than the usual search-result comfort zone.");
  }

  if (description.length > 160) {
    warnings.push("Meta description is likely too long for search previews.");
  }

  if (description.length > 0 && description.length < 120) {
    warnings.push("Meta description may be too short to fully sell the page.");
  }

  if (keyword && !title.toLowerCase().includes(keyword)) {
    warnings.push("Primary keyword is missing from the page title.");
  }

  if (keyword && !titleAndDescription.includes(keyword)) {
    warnings.push("Primary keyword is missing from both title and description.");
  }

  return warnings;
}

function formatSeoTimestamp(value: string) {
  if (!value) {
    return "Not saved yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const tabs: { id: AdminTab; label: string }[] = [
  { id: "requests", label: "Requests" },
  { id: "songs", label: "Songs" },
  { id: "main", label: "Main Page" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "pricing", label: "Performance / Pricing" },
  { id: "upcoming", label: "Upcoming Performances" },
  { id: "repairs", label: "Repairs" },
  { id: "stories", label: "Will's Stories" },
  { id: "seo", label: "SEO" },
  { id: "details", label: "Global Settings" },
];

const songsPerPage = 50;
const standardHeroPageKeys = new Set<EditablePageKey>([
  "education",
  "music",
  "performance",
  "groups",
  "rates",
  "contact",
  "requests",
  "admin",
]);

function readTabFromHash(): AdminTab | null {
  if (typeof window === "undefined") {
    return null;
  }

  const hash = window.location.hash.replace("#", "");
  return tabs.some((tab) => tab.id === hash) ? (hash as AdminTab) : null;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("requests");
  const [songs, setSongs] = useState<RepertoireSong[]>([]);
  const [songsLoadedFromSupabase, setSongsLoadedFromSupabase] = useState(false);
  const [dirtySongIds, setDirtySongIds] = useState<Set<string>>(() => new Set());
  const [deletedSongIds, setDeletedSongIds] = useState<Array<string | number>>([]);
  const [songQuery, setSongQuery] = useState("");
  const [songPage, setSongPage] = useState(1);
  const [expandedSongDetails, setExpandedSongDetails] = useState<Set<number>>(
    () => new Set(),
  );
  const [openGenreDropdownSong, setOpenGenreDropdownSong] = useState<
    number | null
  >(null);
  const songListTopRef = useRef<HTMLDivElement | null>(null);
  const [stories, setStories] = useState<StoryEntry[]>(storyEntries);
  const [mainPageContent, setMainPageContent] =
    useState<MainPageContentData>(defaultMainPageContent);
  const [aboutContent, setAboutContent] =
    useState<AboutContentData>(defaultAboutContent);
  const [donateContent, setDonateContent] =
    useState<DonateContentData>(defaultDonateContent);
  const [educationContent, setEducationContent] =
    useState<EducationContentData>(defaultEducationContent);
  const [repairContent, setRepairContent] =
    useState<RepairContentData>(defaultRepairContent);
  const [rateGuides, setRateGuides] = useState<RateGuide[]>(defaultRateGuides);
  const [addOns, setAddOns] = useState<string[]>(defaultAddOns);
  const [upcomingPerformances, setUpcomingPerformances] = useState<
    UpcomingPerformance[]
  >(defaultUpcomingPerformances);
  const [siteDetails, setSiteDetails] =
    useState<SiteDetails>(defaultSiteDetails);
  const [pageHeroContent, setPageHeroContent] =
    useState<EditablePageContent[]>(defaultPageContent);
  const [seoSettings, setSeoSettings] =
    useState<SeoSettings>(defaultSeoSettings);
  const [savedSeoSettings, setSavedSeoSettings] =
    useState<SeoSettings>(defaultSeoSettings);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setStories(readStoredStories());
    const storedMainPageContent = readStoredValue(
      adminStorageKeys.mainPage,
      defaultMainPageContent,
    );
    setMainPageContent({
      ...storedMainPageContent,
      weddings: {
        ...storedMainPageContent.weddings,
        socialLinks: removeRetiredSocialLinks(
          storedMainPageContent.weddings.socialLinks,
        ),
      },
    });
    setAboutContent(
      readStoredValue(adminStorageKeys.about, defaultAboutContent),
    );
    setDonateContent(
      readStoredValue(adminStorageKeys.donate, defaultDonateContent),
    );
    setEducationContent(
      normalizeEducationContent(
        readStoredValue(adminStorageKeys.education, defaultEducationContent),
      ),
    );
    setRepairContent(
      normalizeRepairContentData(
        readStoredValue(adminStorageKeys.repairs, defaultRepairContent),
      ),
    );
    setRateGuides(
      readStoredValue(adminStorageKeys.rateGuides, defaultRateGuides),
    );
    setAddOns(readStoredValue(adminStorageKeys.addOns, defaultAddOns));
    const storedUpcomingPerformances = readStoredValue<unknown>(
      adminStorageKeys.upcomingPerformances,
      defaultUpcomingPerformances,
    );
    setUpcomingPerformances(
      Array.isArray(storedUpcomingPerformances)
        ? storedUpcomingPerformances.map((event, index) =>
            normalizeUpcomingPerformance(
              event as Partial<UpcomingPerformance>,
              index,
            ),
          )
        : defaultUpcomingPerformances,
    );
    setSiteDetails(
      normalizeSiteDetails(
        readStoredValue(adminStorageKeys.siteDetails, defaultSiteDetails),
      ),
    );
    setPageHeroContent(
      normalizePageContent(
        readStoredValue(pageContentStorageKey, defaultPageContent),
      ),
    );
    const storedSeoSettings = normalizeSeoSettings(
      readStoredValue(seoStorageKey, defaultSeoSettings),
    );
    setSeoSettings(storedSeoSettings);
    setSavedSeoSettings(storedSeoSettings);

    const hashedTab = readTabFromHash();
    if (hashedTab) {
      setActiveTab(hashedTab);
    }

    const syncTabToHash = () => {
      const nextTab = readTabFromHash();
      if (nextTab) {
        setActiveTab(nextTab);
      }
    };

    window.addEventListener("hashchange", syncTabToHash);
    return () => window.removeEventListener("hashchange", syncTabToHash);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadSongs() {
      try {
        const supabaseSongs = await fetchAdminSongs();
        if (isMounted) {
          setSongs(supabaseSongs);
          setSongsLoadedFromSupabase(true);
          setDirtySongIds(new Set());
          setDeletedSongIds([]);
        }
      } catch (error) {
        console.error("Unable to load songs from Supabase:", error);
        if (isMounted) {
          const message =
            error instanceof Error ? error.message : "Unknown Supabase error";
          setSongsLoadedFromSupabase(false);
          setSaveMessage(
            `Could not load Supabase songs: ${message}`,
          );
          window.setTimeout(() => setSaveMessage(""), 8000);
        }
      }
    }

    loadSongs();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSongs = useMemo(() => {
    const normalizedQuery = songQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return songs;
    }

    return songs.filter((song) =>
      [
        song.title,
        song.artist,
        song.source,
        song.genre,
        ...(Array.isArray(song.genres) ? song.genres : []),
        song.notes,
        song.sheetMusic,
        song.backingTrack,
        song.url,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [songQuery, songs]);

  const songPageCount = Math.max(
    1,
    Math.ceil(filteredSongs.length / songsPerPage),
  );
  const currentSongPage = Math.min(songPage, songPageCount);
  const songPageStart = (currentSongPage - 1) * songsPerPage;
  const songPageEnd = Math.min(songPageStart + songsPerPage, filteredSongs.length);
  const paginatedSongs = filteredSongs.slice(songPageStart, songPageEnd);

  useEffect(() => {
    setSongPage((page) => Math.min(page, songPageCount));
  }, [songPageCount]);

  const goToSongPage = (page: number) => {
    setSongPage(Math.min(Math.max(1, page), songPageCount));
    window.requestAnimationFrame(() => {
      songListTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const renderSongPagination = () => {
    if (filteredSongs.length <= songsPerPage) {
      return (
        <p className="text-sm leading-7 text-ivory-muted">
          Showing {filteredSongs.length} song
          {filteredSongs.length === 1 ? "" : "s"}.
        </p>
      );
    }

    return (
      <div className="elegant-surface flex flex-col gap-4 border border-ivory/10 p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-7 text-ivory-muted">
          Showing {songPageStart + 1}-{songPageEnd} of {filteredSongs.length}{" "}
          songs
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => goToSongPage(currentSongPage - 1)}
            disabled={currentSongPage === 1}
            className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
          >
            Previous
          </button>
          {Array.from({ length: songPageCount }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToSongPage(page)}
                className={`min-w-10 border px-3 py-2 text-xs uppercase tracking-[0.12em] transition ${
                  currentSongPage === page
                    ? "border-gold bg-gold/15 text-ivory"
                    : "border-ivory/10 text-ivory-muted hover:border-gold/50 hover:text-ivory"
                }`}
              >
                {page}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => goToSongPage(currentSongPage + 1)}
            disabled={currentSongPage === songPageCount}
            className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const showSaved = (message: string) => {
    setSaveMessage(message);
    window.setTimeout(() => setSaveMessage(""), 2600);
  };

  const saveSongs = async () => {
    if (!songsLoadedFromSupabase) {
      showSaved("Songs are not loaded from Supabase yet. Save was not sent.");
      return;
    }

    const songsToSave = songs.filter(
      (song) => !song.id || dirtySongIds.has(String(song.id)),
    );

    if (songsToSave.length === 0 && deletedSongIds.length === 0) {
      showSaved("No Supabase song changes to save.");
      return;
    }

    try {
      const response = await fetch("/api/admin/songs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songs: songsToSave,
          deletedIds: deletedSongIds,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        songs?: StoredRepertoireSong[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || `Save failed with status ${response.status}`);
      }

      if (Array.isArray(data.songs)) {
        setSongs(data.songs.map((song, index) => normalizeSong(song, index)));
      }
      setSongsLoadedFromSupabase(true);
      setDirtySongIds(new Set());
      setDeletedSongIds([]);

      showSaved("Song list saved to Supabase.");
    } catch (error) {
      console.error("Unable to save songs to Supabase:", error);
      showSaved("Song list could not be saved to Supabase.");
    }
  };

  const exportSongsAsPdf = () => {
    const exportWindow = window.open("", "_blank");

    if (!exportWindow) {
      showSaved("Please allow pop-ups so the PDF export window can open.");
      return;
    }

    exportWindow.document.open();
    exportWindow.document.write(createSongListExportHtml(songs, siteDetails));
    exportWindow.document.close();
    showSaved("Song list export opened. Choose Save as PDF in the print window.");
  };

  const resetSongs = async () => {
    try {
      const supabaseSongs = await fetchAdminSongs();
      setSongs(supabaseSongs);
      setSongsLoadedFromSupabase(true);
      setDirtySongIds(new Set());
      setDeletedSongIds([]);
      setSongPage(1);
      setExpandedSongDetails(new Set());
      showSaved("Song list reloaded from Supabase.");
    } catch (error) {
      console.error("Unable to reload songs from Supabase:", error);
      setSongsLoadedFromSupabase(false);
      showSaved("Could not reload songs from Supabase.");
    }
  };

  const updateSong = (
    index: number,
    field: keyof RepertoireSong,
    value: string | string[] | boolean,
  ) => {
    setSongs((currentSongs) =>
      currentSongs.map((song, songIndex) =>
        songIndex === index
          ? {
              ...song,
              [field]: value,
              ...(field === "source" ? { category: String(value) } : {}),
              ...(field === "wills_favorite"
                ? { favoriteRecommended: Boolean(value) }
                : {}),
            }
          : song,
      ),
    );
    const songId = songs[index]?.id;
    if (songId) {
      setDirtySongIds((currentIds) => new Set(currentIds).add(String(songId)));
    }
  };

  const updateSongGenres = (index: number, genres: string[]) => {
    const nextGenres = genres.filter(Boolean);

    setSongs((currentSongs) =>
      currentSongs.map((song, songIndex) =>
        songIndex === index
          ? { ...song, genre: nextGenres[0] || "", genres: nextGenres }
          : song,
      ),
    );
    const songId = songs[index]?.id;
    if (songId) {
      setDirtySongIds((currentIds) => new Set(currentIds).add(String(songId)));
    }
  };

  const toggleSongDetails = (index: number) => {
    setExpandedSongDetails((currentDetails) => {
      const nextDetails = new Set(currentDetails);

      if (nextDetails.has(index)) {
        nextDetails.delete(index);
      } else {
        nextDetails.add(index);
      }

      return nextDetails;
    });
  };

  const addSong = () => {
    setSongPage(1);
    setExpandedSongDetails(new Set());
    setSongs((currentSongs) => [
      {
        title: "New Song",
        artist: "",
        category: "",
        source: "",
        genre: "Pop",
        genres: ["Pop"],
        notes: "",
        sheetMusic: "",
        backingTrack: "",
        url: "",
        weddingRecommended: false,
        funeralRecommended: false,
        partyRecommended: false,
        wills_favorite: false,
        favoriteRecommended: false,
        extraCharge: false,
        is_public: true,
        sort_order: null,
      },
      ...currentSongs,
    ]);
  };

  const removeSong = (index: number) => {
    const songId = songs[index]?.id;
    if (songId) {
      setDeletedSongIds((currentIds) => [...currentIds, songId]);
      setDirtySongIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(String(songId));
        return nextIds;
      });
    }
    setSongs((currentSongs) =>
      currentSongs.filter((_, songIndex) => songIndex !== index),
    );
    setExpandedSongDetails((currentDetails) => {
      const nextDetails = new Set<number>();
      currentDetails.forEach((songIndex) => {
        if (songIndex < index) {
          nextDetails.add(songIndex);
        }

        if (songIndex > index) {
          nextDetails.add(songIndex - 1);
        }
      });
      return nextDetails;
    });
  };

  const saveMainPage = () => {
    saveStoredValue(adminStorageKeys.mainPage, mainPageContent);
    showSaved("Main page saved in this browser.");
  };

  const resetMainPage = () => {
    setMainPageContent(defaultMainPageContent);
    window.localStorage.removeItem(adminStorageKeys.mainPage);
    showSaved("Main page reset to the original website content.");
  };

  const saveAbout = () => {
    saveStoredValue(adminStorageKeys.about, aboutContent);
    showSaved("About page saved in this browser.");
  };

  const resetAbout = () => {
    setAboutContent(defaultAboutContent);
    window.localStorage.removeItem(adminStorageKeys.about);
    showSaved("About page reset to the original website content.");
  };

  const updateAboutIntro = (
    field: keyof AboutContentData["intro"],
    value: string,
  ) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      intro: { ...currentContent.intro, [field]: value },
    }));
  };

  const updateAboutPortrait = (
    field: keyof AboutContentData["portrait"],
    value: string | number,
  ) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      portrait: { ...currentContent.portrait, [field]: value },
    }));
  };

  const updateAboutBio = (
    field: keyof AboutContentData["bio"],
    value: string | string[],
  ) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      bio: { ...currentContent.bio, [field]: value },
    }));
  };

  const updateAboutInstrumentLoan = (
    field: keyof AboutContentData["instrumentLoan"],
    value: string | string[],
  ) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      instrumentLoan: { ...currentContent.instrumentLoan, [field]: value },
    }));
  };

  const updateAboutPhoto = (
    index: number,
    field: keyof AboutPhoto,
    value: string | number,
  ) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      photos: currentContent.photos.map((photo, photoIndex) =>
        photoIndex === index ? { ...photo, [field]: value } : photo,
      ),
    }));
  };

  const addAboutPhoto = () => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      photos: [
        {
          src: "/media/image-name.jpg",
          alt: "About page photo",
          position: "center",
          fit: "contain",
          zoom: 1,
          cropRatioWidth: 16,
          cropRatioHeight: 9,
          customFrameWidth: 1600,
          customFrameHeight: 900,
          cropPresetName: "Gallery Wide",
        },
        ...currentContent.photos,
      ],
    }));
  };

  const removeAboutPhoto = (index: number) => {
    setAboutContent((currentContent) => ({
      ...currentContent,
      photos: currentContent.photos.filter(
        (_, photoIndex) => photoIndex !== index,
      ),
    }));
  };

  const saveDonate = () => {
    saveStoredValue(adminStorageKeys.donate, donateContent);
    showSaved("Instrument Fund page saved in this browser.");
  };

  const resetDonate = () => {
    setDonateContent(defaultDonateContent);
    window.localStorage.removeItem(adminStorageKeys.donate);
    showSaved("Instrument Fund page reset to the original website content.");
  };

  const updateDonateIntro = (
    field: keyof DonateContentData["intro"],
    value: string,
  ) => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      intro: { ...currentContent.intro, [field]: value },
    }));
  };

  const updateDonatePrimary = (
    field: keyof DonateContentData["primary"],
    value: string | string[],
  ) => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      primary: { ...currentContent.primary, [field]: value },
    }));
  };

  const updateDonateSupport = (
    field: keyof DonateContentData["support"],
    value: string | string[],
  ) => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      support: { ...currentContent.support, [field]: value },
    }));
  };

  const updateDonateSupportItem = (index: number, value: string) => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      support: {
        ...currentContent.support,
        items: currentContent.support.items.map((item, itemIndex) =>
          itemIndex === index ? value : item,
        ),
      },
    }));
  };

  const addDonateSupportItem = () => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      support: {
        ...currentContent.support,
        items: [...currentContent.support.items, "New support item"],
      },
    }));
  };

  const removeDonateSupportItem = (index: number) => {
    setDonateContent((currentContent) => ({
      ...currentContent,
      support: {
        ...currentContent.support,
        items: currentContent.support.items.filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      },
    }));
  };

  const updateMainHero = (
    field: keyof MainPageContentData["hero"],
    value: string | string[] | number,
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      hero: { ...currentContent.hero, [field]: value },
    }));
  };

  const updateMainWeddings = (
    field: keyof MainPageContentData["weddings"],
    value: string | string[] | MainPageSocialLink[],
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      weddings: { ...currentContent.weddings, [field]: value },
    }));
  };

  const updateMainExperience = (
    field: keyof MainPageContentData["experience"],
    value: string | string[] | number,
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      experience: { ...currentContent.experience, [field]: value },
    }));
  };

  const updateFeaturedPerformance = (
    field: keyof MainPageContentData["featuredPerformance"],
    value: string,
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      featuredPerformance: {
        ...currentContent.featuredPerformance,
        [field]: value,
      },
    }));
  };

  const updateMainReviews = (
    field: keyof MainPageContentData["reviews"],
    value: string | MainPageReview[],
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      reviews: { ...currentContent.reviews, [field]: value },
    }));
  };

  const updateMainGallery = (
    field: keyof MainPageContentData["gallery"],
    value: string | MainPageGalleryImage[],
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      gallery: { ...currentContent.gallery, [field]: value },
    }));
  };

  const updateMainFinalCta = (
    field: keyof MainPageContentData["finalCta"],
    value: string,
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      finalCta: { ...currentContent.finalCta, [field]: value },
    }));
  };

  const updateMainSocialLink = (
    index: number,
    field: keyof MainPageSocialLink,
    value: string,
  ) => {
    setMainPageContent((currentContent) => ({
      ...currentContent,
      weddings: {
        ...currentContent.weddings,
        socialLinks: currentContent.weddings.socialLinks.map((link, linkIndex) =>
          linkIndex === index ? { ...link, [field]: value } : link,
        ),
      },
    }));
  };

  const addMainSocialLink = () => {
    updateMainWeddings("socialLinks", [
      ...mainPageContent.weddings.socialLinks,
      { label: "New Link", href: "https://" },
    ]);
  };

  const removeMainSocialLink = (index: number) => {
    updateMainWeddings(
      "socialLinks",
      mainPageContent.weddings.socialLinks.filter(
        (_, linkIndex) => linkIndex !== index,
      ),
    );
  };

  const updateMainReview = (
    index: number,
    field: keyof MainPageReview,
    value: string,
  ) => {
    updateMainReviews(
      "items",
      mainPageContent.reviews.items.map((review, reviewIndex) =>
        reviewIndex === index ? { ...review, [field]: value } : review,
      ),
    );
  };

  const addMainReview = () => {
    updateMainReviews("items", [
      ...mainPageContent.reviews.items,
      { quote: "New review quote.", source: "Guest", label: "5-Star Review" },
    ]);
  };

  const removeMainReview = (index: number) => {
    updateMainReviews(
      "items",
      mainPageContent.reviews.items.filter(
        (_, reviewIndex) => reviewIndex !== index,
      ),
    );
  };

  const updateMainGalleryImage = (
    index: number,
    field: keyof MainPageGalleryImage,
    value: string | number,
  ) => {
    updateMainGallery(
      "images",
      mainPageContent.gallery.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, [field]: value } : image,
      ),
    );
  };

  const addMainGalleryImage = () => {
    updateMainGallery("images", [
      {
        src: "/media/image-name.jpg",
        alt: "Image description",
        position: "center",
        fit: "contain",
        zoom: 1,
        cropRatioWidth: 16,
        cropRatioHeight: 9,
        customFrameWidth: 1600,
        customFrameHeight: 900,
        cropPresetName: "Gallery Wide",
      },
      ...mainPageContent.gallery.images,
    ]);
  };

  const removeMainGalleryImage = (index: number) => {
    updateMainGallery(
      "images",
      mainPageContent.gallery.images.filter(
        (_, imageIndex) => imageIndex !== index,
      ),
    );
  };

  const saveStories = () => {
    saveStoredValue(adminStorageKeys.stories, stories);
    showSaved("Stories saved in this browser.");
  };

  const resetStories = () => {
    setStories(storyEntries);
    window.localStorage.removeItem(adminStorageKeys.stories);
    showSaved("Stories reset to the original placeholders.");
  };

  const addStory = () => {
    setStories((currentStories) => [
      {
        id: `story-${Date.now()}`,
        date: "",
        marker: "Journal",
        title: "New Story",
        category: "Journal",
        teaser: "",
        image: "",
        imagePosition: "center",
        imageFit: "cover",
        imageZoom: 1,
        imageCropRatioWidth: 3,
        imageCropRatioHeight: 2,
        imageCustomFrameWidth: 1200,
        imageCustomFrameHeight: 800,
        imageCropPresetName: "Story Header",
        published: false,
        body: ["Write the full story here."],
      },
      ...currentStories,
    ]);
  };

  const updateStory = (
    index: number,
    field: keyof StoryEntry,
    value: string | boolean | string[] | number,
  ) => {
    setStories((currentStories) =>
      currentStories.map((story, storyIndex) =>
        storyIndex === index ? { ...story, [field]: value } : story,
      ),
    );
  };

  const removeStory = (index: number) => {
    setStories((currentStories) =>
      currentStories.filter((_, storyIndex) => storyIndex !== index),
    );
  };

  const saveEducation = () => {
    saveStoredValue(adminStorageKeys.education, educationContent);
    showSaved("Education page saved in this browser.");
  };

  const resetEducation = () => {
    setEducationContent(defaultEducationContent);
    window.localStorage.removeItem(adminStorageKeys.education);
    showSaved("Education page reset to the original website content.");
  };

  const updateEducationArticle = (
    index: number,
    field: keyof EducationArticleContent,
    value: string | string[],
  ) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      articles: currentContent.articles.map((article, articleIndex) =>
        articleIndex === index ? { ...article, [field]: value } : article,
      ),
    }));
  };

  const updateEducationPhoto = (
    index: number,
    field: keyof EducationPhoto,
    value: string | number,
  ) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      photos: currentContent.photos.map((photo, photoIndex) =>
        photoIndex === index ? { ...photo, [field]: value } : photo,
      ),
    }));
  };

  const addEducationPhoto = () => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      photos: [
        {
          src: "/media/image-name.jpg",
          alt: "Education page photo",
          position: "center",
          fit: "cover",
          zoom: 1,
          cropRatioWidth: 16,
          cropRatioHeight: 9,
          customFrameWidth: 1600,
          customFrameHeight: 900,
          cropPresetName: "Gallery Wide",
        },
        ...currentContent.photos,
      ],
    }));
  };

  const removeEducationPhoto = (index: number) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      photos: currentContent.photos.filter(
        (_, photoIndex) => photoIndex !== index,
      ),
    }));
  };

  const updateFirstLessonItem = (index: number, value: string) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      firstLessonItems: currentContent.firstLessonItems.map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  };

  const addFirstLessonItem = () => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      firstLessonItems: [...currentContent.firstLessonItems, "New item"],
    }));
  };

  const removeFirstLessonItem = (index: number) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      firstLessonItems: currentContent.firstLessonItems.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const updateLessonRate = (
    index: number,
    field: keyof LessonRate,
    value: string,
  ) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      lessonRates: currentContent.lessonRates.map((rate, rateIndex) =>
        rateIndex === index ? { ...rate, [field]: value } : rate,
      ),
    }));
  };

  const addLessonRate = () => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      lessonRates: [
        ...currentContent.lessonRates,
        { level: "New lesson option", length: "", price: "" },
      ],
    }));
  };

  const removeLessonRate = (index: number) => {
    setEducationContent((currentContent) => ({
      ...currentContent,
      lessonRates: currentContent.lessonRates.filter(
        (_, rateIndex) => rateIndex !== index,
      ),
    }));
  };

  const saveRepairs = () => {
    saveStoredValue(adminStorageKeys.repairs, repairContent);
    showSaved("Repairs page saved in this browser.");
  };

  const resetRepairs = () => {
    setRepairContent(defaultRepairContent);
    window.localStorage.removeItem(adminStorageKeys.repairs);
    showSaved("Repairs page reset to the original website content.");
  };

  const updateRepairHero = (
    field: keyof RepairContentData["hero"],
    value: string | string[],
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      hero: { ...currentContent.hero, [field]: value },
    }));
  };

  const updateRepairBench = (
    field: keyof RepairSectionContent,
    value: string | string[],
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      bench: { ...currentContent.bench, [field]: value },
    }));
  };

  const updateRepairSlideshowImage = <K extends keyof RepairSlideshowImage>(
    index: number,
    field: K,
    value: RepairSlideshowImage[K],
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      slideshowImages: currentContent.slideshowImages.map((image, imageIndex) =>
        imageIndex === index ? { ...image, [field]: value } : image,
      ),
    }));
  };

  const addRepairSlideshowImage = () => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      slideshowImages: [
        {
          src: "",
          alt: "",
          objectFit: "cover",
          objectPosition: "50% 50%",
          zoom: 1,
          cropRatioWidth: 16,
          cropRatioHeight: 9,
          customFrameWidth: 1600,
          customFrameHeight: 900,
          cropPresetName: "",
        },
        ...currentContent.slideshowImages,
      ],
    }));
  };

  const removeRepairSlideshowImage = (index: number) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      slideshowImages: currentContent.slideshowImages.filter(
        (_, imageIndex) => imageIndex !== index,
      ),
    }));
  };

  const updateRepairSection = (
    index: number,
    field: keyof RepairSectionContent,
    value: string | string[],
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      sections: currentContent.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section,
      ),
    }));
  };

  const updateRepairListItem = (
    sectionIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      sections: currentContent.sections.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              listItems: (section.listItems || []).map((item, currentItemIndex) =>
                currentItemIndex === itemIndex ? value : item,
              ),
            }
          : section,
      ),
    }));
  };

  const addRepairListItem = (sectionIndex: number) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      sections: currentContent.sections.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              listItems: [...(section.listItems || []), "New item"],
            }
          : section,
      ),
    }));
  };

  const removeRepairListItem = (sectionIndex: number, itemIndex: number) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      sections: currentContent.sections.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              listItems: (section.listItems || []).filter(
                (_, currentItemIndex) => currentItemIndex !== itemIndex,
              ),
            }
          : section,
      ),
    }));
  };

  const updateRepairFinalCta = (
    field: keyof RepairContentData["finalCta"],
    value: string,
  ) => {
    setRepairContent((currentContent) => ({
      ...currentContent,
      finalCta: { ...currentContent.finalCta, [field]: value },
    }));
  };

  const savePricing = () => {
    saveStoredValue(adminStorageKeys.rateGuides, rateGuides);
    saveStoredValue(adminStorageKeys.addOns, addOns);
    showSaved("Pricing saved in this browser.");
  };

  const resetPricing = () => {
    setRateGuides(defaultRateGuides);
    setAddOns(defaultAddOns);
    window.localStorage.removeItem(adminStorageKeys.rateGuides);
    window.localStorage.removeItem(adminStorageKeys.addOns);
    showSaved("Pricing reset to the original website content.");
  };

  const saveUpcomingPerformances = () => {
    saveStoredValue(
      adminStorageKeys.upcomingPerformances,
      upcomingPerformances,
    );
    showSaved("Upcoming performances saved in this browser.");
  };

  const resetUpcomingPerformances = () => {
    setUpcomingPerformances(defaultUpcomingPerformances);
    window.localStorage.removeItem(adminStorageKeys.upcomingPerformances);
    showSaved("Upcoming performances reset.");
  };

  const addUpcomingPerformance = () => {
    setUpcomingPerformances((currentEvents) => [
      createUpcomingPerformance(),
      ...currentEvents,
    ]);
  };

  const updateUpcomingPerformance = <Field extends keyof UpcomingPerformance>(
    index: number,
    field: Field,
    value: UpcomingPerformance[Field],
  ) => {
    setUpcomingPerformances((currentEvents) =>
      currentEvents.map((event, eventIndex) =>
        eventIndex === index ? { ...event, [field]: value } : event,
      ),
    );
  };

  const removeUpcomingPerformance = (index: number) => {
    setUpcomingPerformances((currentEvents) =>
      currentEvents.filter((_, eventIndex) => eventIndex !== index),
    );
  };

  const moveUpcomingPerformance = (index: number, direction: -1 | 1) => {
    setUpcomingPerformances((currentEvents) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= currentEvents.length) {
        return currentEvents;
      }

      const reorderedEvents = [...currentEvents];
      const [event] = reorderedEvents.splice(index, 1);
      reorderedEvents.splice(nextIndex, 0, event);
      return reorderedEvents;
    });
  };

  const updateSiteDetail = <Section extends keyof SiteDetails>(
    section: Section,
    field: keyof SiteDetails[Section],
    value: string | boolean,
  ) => {
    setSiteDetails((currentDetails) => ({
      ...currentDetails,
      [section]: {
        ...currentDetails[section],
        [field]: value,
      },
    }));
  };

  const saveSiteDetails = () => {
    saveStoredValue(adminStorageKeys.siteDetails, siteDetails);
    saveStoredValue(pageContentStorageKey, pageHeroContent);
    saveStoredValue(seoStorageKey, seoSettings);
    setSavedSeoSettings(seoSettings);
    showSaved("Global settings saved in this browser.");
  };

  const resetSiteDetails = () => {
    setSiteDetails(defaultSiteDetails);
    setPageHeroContent(defaultPageContent);
    setSeoSettings(defaultSeoSettings);
    setSavedSeoSettings(defaultSeoSettings);
    window.localStorage.removeItem(adminStorageKeys.siteDetails);
    window.localStorage.removeItem(pageContentStorageKey);
    window.localStorage.removeItem(seoStorageKey);
    showSaved("Global settings reset to defaults.");
  };

  const updatePageHeroContent = (
    key: EditablePageKey,
    field: keyof EditablePageContent,
    value: string,
  ) => {
    setPageHeroContent((currentPages) =>
      currentPages.map((page) =>
        page.key === key ? { ...page, [field]: value } : page,
      ),
    );
  };

  const saveSeoSettings = () => {
    saveStoredValue(seoStorageKey, seoSettings);
    setSavedSeoSettings(seoSettings);
    showSaved("SEO settings saved in this browser.");
  };

  const resetSeoSettings = () => {
    setSeoSettings(defaultSeoSettings);
    setSavedSeoSettings(defaultSeoSettings);
    window.localStorage.removeItem(seoStorageKey);
    showSaved("SEO settings reset to defaults.");
  };

  const updateSeoPage = <Field extends keyof SeoPageSettings>(
    pageKey: SeoPageSettings["key"],
    field: Field,
    value: SeoPageSettings[Field],
  ) => {
    setSeoSettings((currentSettings) => ({
      ...currentSettings,
      pages: currentSettings.pages.map((page) =>
        page.key === pageKey ? { ...page, [field]: value } : page,
      ),
    }));
  };

  const isSeoPageUnsaved = (page: SeoPageSettings) => {
    const savedPage = savedSeoSettings.pages.find(
      (saved) => saved.key === page.key,
    );

    return JSON.stringify(page) !== JSON.stringify(savedPage);
  };

  const saveSeoPage = (pageKey: SeoPageSettings["key"]) => {
    let pageLabel = "Page";
    const lastUpdated = new Date().toISOString();
    const nextSettings = {
      ...seoSettings,
      pages: seoSettings.pages.map((page) => {
        if (page.key !== pageKey) {
          return page;
        }

        pageLabel = page.label;
        return { ...page, lastUpdated };
      }),
    };

    setSeoSettings(nextSettings);
    setSavedSeoSettings(nextSettings);
    saveStoredValue(seoStorageKey, nextSettings);
    showSaved(`${pageLabel} SEO saved in this browser.`);
  };

  return (
    <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border px-4 py-3 text-xs uppercase tracking-[0.18em] transition ${
                  activeTab === tab.id
                    ? "border-gold bg-[#2f2923] text-[#fffaf3] shadow-[0_10px_28px_rgba(40,32,26,0.18)]"
                    : "border-ivory/70 bg-[#fffaf3] text-[#2f2923] shadow-[0_8px_22px_rgba(40,32,26,0.1)] hover:border-gold hover:bg-[#fbf7ef]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {saveMessage ? (
              <p className="text-sm leading-7 text-gold/85">{saveMessage}</p>
            ) : null}
            <button
              type="button"
              onClick={exportSongsAsPdf}
              className="border border-gold bg-gold/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-espresso"
            >
              Export Song PDF
            </button>
          </div>
        </div>

        {activeTab === "requests" ? <SongRequestBoard /> : null}

        {activeTab === "songs" ? (
          <div className="space-y-6">
            <div ref={songListTopRef} className="scroll-mt-32" />
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <label className="block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                    Search Songs
                  </span>
                  <input
                    value={songQuery}
                    onChange={(event) => {
                      setSongQuery(event.target.value);
                      setSongPage(1);
                    }}
                    className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none transition focus:border-gold/70"
                  />
                </label>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ivory-muted">
                  {songsLoadedFromSupabase
                    ? `Loaded ${songs.length} songs from Supabase`
                    : "Supabase songs not loaded"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addSong}
                  className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Song
                </button>
                <button
                  type="button"
                  onClick={saveSongs}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Songs
                </button>
                <button
                  type="button"
                  onClick={exportSongsAsPdf}
                  className="border border-gold/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition hover:bg-gold hover:text-espresso"
                >
                  Export Song PDF
                </button>
                <button
                  type="button"
                  onClick={resetSongs}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            {renderSongPagination()}

            <div className="grid gap-4">
              {paginatedSongs.map((song) => {
                const songIndex = songs.indexOf(song);
                const songGenres = getSongEditorGenres(song);
                const isDetailsExpanded = expandedSongDetails.has(songIndex);
                const isGenreDropdownOpen =
                  openGenreDropdownSong === songIndex;
                const referenceHref = getExternalHref(song.url || "");

                return (
                  <article
                    key={`admin-song-${songIndex}`}
                    className={`elegant-surface relative border border-ivory/10 p-4 sm:p-5 ${
                      isGenreDropdownOpen ? "z-[90]" : "z-0"
                    }`}
                  >
                    <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
                      <label className="block">
                        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                          Song Title
                        </span>
                        <input
                          value={song.title}
                          onChange={(event) =>
                            updateSong(songIndex, "title", event.target.value)
                          }
                          className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                          Artist / Composer
                        </span>
                        <input
                          value={song.artist}
                          onChange={(event) =>
                            updateSong(songIndex, "artist", event.target.value)
                          }
                          placeholder="Artist or composer"
                          className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                          Reference / Soundtrack
                        </span>
                        <input
                          value={song.source}
                          onChange={(event) =>
                            updateSong(songIndex, "source", event.target.value)
                          }
                          placeholder="Ceremony, cocktail hour, movie..."
                          className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                        />
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(15rem,0.8fr)_1fr_auto] lg:items-start">
                      <div className="block">
                        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                          Genres
                        </span>
                        <GenreCheckboxDropdown
                          selectedGenres={songGenres}
                          isOpen={isGenreDropdownOpen}
                          onOpenChange={(isOpen) =>
                            setOpenGenreDropdownSong(
                              isOpen ? songIndex : null,
                            )
                          }
                          onChange={(genres) =>
                            updateSongGenres(songIndex, genres)
                          }
                        />
                      </div>

                      <fieldset>
                        <legend className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                          Event Tags
                        </legend>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                          {[
                            ["weddingRecommended", "Wedding"],
                            ["funeralRecommended", "Funeral"],
                            ["partyRecommended", "Party"],
                            ["wills_favorite", "Favorite"],
                            ["extraCharge", "Request Fee"],
                          ].map(([field, label]) => (
                            <label
                              key={field}
                              className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ivory-muted"
                            >
                              <input
                                type="checkbox"
                                checked={Boolean(
                                  field === "wills_favorite"
                                    ? song.wills_favorite ??
                                        song.favoriteRecommended
                                    : song[field as keyof RepertoireSong],
                                )}
                                onChange={(event) =>
                                  updateSong(
                                    songIndex,
                                    field as keyof RepertoireSong,
                                    event.target.checked,
                                  )
                                }
                              />
                              {label}
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        <button
                          type="button"
                          onClick={() => toggleSongDetails(songIndex)}
                          className="border border-gold/30 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                        >
                          {isDetailsExpanded
                            ? "Hide Admin Details"
                            : "Show Admin Details"}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSong(songIndex)}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {isDetailsExpanded ? (
                      <div className="mt-5 grid gap-4 border-t border-ivory/10 pt-5 lg:grid-cols-3">
                        <label className="block">
                          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                            Sheet Music Location
                          </span>
                          <input
                            value={song.sheetMusic || ""}
                            onChange={(event) =>
                              updateSong(
                                songIndex,
                                "sheetMusic",
                                event.target.value,
                              )
                            }
                            placeholder="ForScore, Musicnotes, Google Drive, binder, iPad folder, paper copy..."
                            className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                            Backing Track Location
                          </span>
                          <input
                            value={song.backingTrack || ""}
                            onChange={(event) =>
                              updateSong(
                                songIndex,
                                "backingTrack",
                                event.target.value,
                              )
                            }
                            placeholder="Prime, YouTube, Google Drive, Tracks folder, iPad playlist..."
                            className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                            Reference / URL
                          </span>
                          <input
                            value={song.url || ""}
                            onChange={(event) =>
                              updateSong(songIndex, "url", event.target.value)
                            }
                            placeholder="Paste YouTube link, chart link, cloud link, arrangement source, or reference note..."
                            className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                          />
                          {song.url ? (
                            <span className="mt-2 block text-xs leading-5 text-ivory-muted">
                              {referenceHref ? (
                                <a
                                  href={referenceHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gold underline-offset-4 hover:underline"
                                >
                                  Open Reference ↗
                                </a>
                              ) : (
                                song.url
                              )}
                            </span>
                          ) : null}
                        </label>
                        <label className="block lg:col-span-3">
                          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">
                            Private Notes
                          </span>
                          <textarea
                            value={song.notes || ""}
                            onChange={(event) =>
                              updateSong(songIndex, "notes", event.target.value)
                            }
                            placeholder="Arrangement notes, key, cue points, playlist prep..."
                            className="min-h-20 w-full border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                          />
                        </label>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            {renderSongPagination()}
          </div>
        ) : null}

        {activeTab === "stories" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Will&apos;s Stories
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Add journal entries, keep drafts unpublished, and choose
                  which stories appear on the public Stories page.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addStory}
                  className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Story
                </button>
                <button
                  type="button"
                  onClick={saveStories}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Stories
                </button>
                <button
                  type="button"
                  onClick={resetStories}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid gap-5">
              {stories.map((story, index) => (
                <article
                  key={story.id}
                  className="elegant-surface grid gap-4 border border-ivory/10 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ivory-muted">
                      <input
                        type="checkbox"
                        checked={story.published}
                        onChange={(event) =>
                          updateStory(index, "published", event.target.checked)
                        }
                      />
                      Published / Visible
                    </label>
                    <button
                      type="button"
                      onClick={() => removeStory(index)}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                    >
                      Delete Story
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Title
                      </span>
                      <input
                        value={story.title}
                        onChange={(event) =>
                          updateStory(index, "title", event.target.value)
                        }
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Category / Tag
                      </span>
                      <input
                        value={story.category}
                        onChange={(event) =>
                          updateStory(index, "category", event.target.value)
                        }
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Optional Date
                      </span>
                      <input
                        value={story.date || ""}
                        onChange={(event) =>
                          updateStory(index, "date", event.target.value)
                        }
                        placeholder="May 12, 2024"
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                    <MediaPathField
                      label="Optional Image"
                      value={story.image || ""}
                      onChange={(value) => updateStory(index, "image", value)}
                      cropValue={story.imagePosition || "center"}
                      onCropChange={(value) =>
                        updateStory(index, "imagePosition", value)
                      }
                      fitValue={story.imageFit || "cover"}
                      onFitChange={(value) =>
                        updateStory(index, "imageFit", value)
                      }
                      zoomValue={story.imageZoom || 1}
                      onZoomChange={(value) =>
                        updateStory(index, "imageZoom", value)
                      }
                      ratioWidthValue={story.imageCropRatioWidth || 3}
                      ratioHeightValue={story.imageCropRatioHeight || 2}
                      onRatioChange={(width, height) => {
                        updateStory(index, "imageCropRatioWidth", width);
                        updateStory(index, "imageCropRatioHeight", height);
                      }}
                      frameWidthValue={story.imageCustomFrameWidth || 1200}
                      frameHeightValue={story.imageCustomFrameHeight || 800}
                      onFrameChange={(width, height) => {
                        updateStory(index, "imageCustomFrameWidth", width);
                        updateStory(index, "imageCustomFrameHeight", height);
                      }}
                      presetNameValue={story.imageCropPresetName || "Story Header"}
                      onPresetNameChange={(value) =>
                        updateStory(index, "imageCropPresetName", value)
                      }
                    />
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Teaser / Preview
                    </span>
                    <input
                      value={story.teaser}
                      onChange={(event) =>
                        updateStory(index, "teaser", event.target.value)
                      }
                      className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Full Article
                    </span>
                    <textarea
                      value={story.body.join("\n\n")}
                      onChange={(event) =>
                        updateStory(
                          index,
                          "body",
                          event.target.value
                            .split(/\n{2,}/)
                            .map((paragraph) => paragraph.trim())
                            .filter(Boolean),
                        )
                      }
                      rows={8}
                      className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <span className="mt-2 block text-xs leading-6 text-smoke-brown">
                      Separate paragraphs with a blank line.
                    </span>
                  </label>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "education" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Education Page
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Edit the lesson articles, first-lesson supply list, and
                  lesson pricing rows shown on the public Education page.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveEducation}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Education
                </button>
                <button
                  type="button"
                  onClick={resetEducation}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="elegant-surface border border-ivory/10 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                    Education Photos
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ivory-muted">
                    Edit the images shown near the top of the public Education
                    page. Newly added photos appear first.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addEducationPhoto}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Photo
                </button>
              </div>

              {educationContent.photos.length ? (
                <div className="grid gap-5">
                  {educationContent.photos.map((photo, index) => (
                    <div
                      key={`${photo.src}-${index}`}
                      className="border border-ivory/10 bg-espresso/30 p-4"
                    >
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-smoke-brown">
                          Photo {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeEducationPhoto(index)}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                        >
                          Delete
                        </button>
                      </div>
                      <MediaPathField
                        label={`Education Photo ${index + 1}`}
                        value={photo.src}
                        onChange={(value) =>
                          updateEducationPhoto(index, "src", value)
                        }
                        altValue={photo.alt}
                        onAltChange={(value) =>
                          updateEducationPhoto(index, "alt", value)
                        }
                        cropValue={photo.position || "center"}
                        onCropChange={(value) =>
                          updateEducationPhoto(index, "position", value)
                        }
                        fitValue={photo.fit || "cover"}
                        onFitChange={(value) =>
                          updateEducationPhoto(index, "fit", value)
                        }
                        zoomValue={photo.zoom || 1}
                        onZoomChange={(value) =>
                          updateEducationPhoto(index, "zoom", value)
                        }
                        ratioWidthValue={photo.cropRatioWidth || 16}
                        ratioHeightValue={photo.cropRatioHeight || 9}
                        onRatioChange={(width, height) => {
                          updateEducationPhoto(index, "cropRatioWidth", width);
                          updateEducationPhoto(index, "cropRatioHeight", height);
                        }}
                        frameWidthValue={photo.customFrameWidth || 1600}
                        frameHeightValue={photo.customFrameHeight || 900}
                        onFrameChange={(width, height) => {
                          updateEducationPhoto(index, "customFrameWidth", width);
                          updateEducationPhoto(
                            index,
                            "customFrameHeight",
                            height,
                          );
                        }}
                        presetNameValue={photo.cropPresetName || ""}
                        onPresetNameChange={(value) =>
                          updateEducationPhoto(index, "cropPresetName", value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-ivory-muted">
                  No Education photos are currently set. Add a photo to place
                  one near the top of the public Education page.
                </p>
              )}
            </div>

            <div className="grid gap-5">
              {educationContent.articles.map((article, index) => (
                <article
                  key={article.id}
                  className="elegant-surface grid gap-4 border border-ivory/10 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                      {article.navLabel}
                    </p>
                    <span className="text-xs uppercase tracking-[0.16em] text-smoke-brown">
                      #{article.id}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Menu Label
                      </span>
                      <input
                        value={article.navLabel}
                        onChange={(event) =>
                          updateEducationArticle(
                            index,
                            "navLabel",
                            event.target.value,
                          )
                        }
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Eyebrow
                      </span>
                      <input
                        value={article.eyebrow}
                        onChange={(event) =>
                          updateEducationArticle(
                            index,
                            "eyebrow",
                            event.target.value,
                          )
                        }
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Article Title
                    </span>
                    <input
                      value={article.title}
                      onChange={(event) =>
                        updateEducationArticle(index, "title", event.target.value)
                      }
                      className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Article Body
                    </span>
                    <textarea
                      value={article.body.join("\n\n")}
                      onChange={(event) =>
                        updateEducationArticle(
                          index,
                          "body",
                          event.target.value
                            .split(/\n{2,}/)
                            .map((paragraph) => paragraph.trim())
                            .filter(Boolean),
                        )
                      }
                      rows={7}
                      className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <span className="mt-2 block text-xs leading-6 text-smoke-brown">
                      Separate paragraphs with a blank line.
                    </span>
                  </label>

                  {article.secondaryTitle !== undefined ? (
                    <>
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                          Secondary Title
                        </span>
                        <input
                          value={article.secondaryTitle}
                          onChange={(event) =>
                            updateEducationArticle(
                              index,
                              "secondaryTitle",
                              event.target.value,
                            )
                          }
                          className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                          Secondary Body
                        </span>
                        <textarea
                          value={(article.secondaryBody || []).join("\n\n")}
                          onChange={(event) =>
                            updateEducationArticle(
                              index,
                              "secondaryBody",
                              event.target.value
                                .split(/\n{2,}/)
                                .map((paragraph) => paragraph.trim())
                                .filter(Boolean),
                            )
                          }
                          rows={9}
                          className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                        />
                      </label>
                    </>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="elegant-surface border border-ivory/10 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                  First Lesson Supply List
                </p>
                <button
                  type="button"
                  onClick={addFirstLessonItem}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Item
                </button>
              </div>
              <div className="grid gap-3">
                {educationContent.firstLessonItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      value={item}
                      onChange={(event) =>
                        updateFirstLessonItem(index, event.target.value)
                      }
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <button
                      type="button"
                      onClick={() => removeFirstLessonItem(index)}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="elegant-surface border border-ivory/10 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                  Lesson Pricing Rows
                </p>
                <button
                  type="button"
                  onClick={addLessonRate}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Row
                </button>
              </div>
              <div className="grid gap-3">
                {educationContent.lessonRates.map((rate, index) => (
                  <div
                    key={`${rate.level}-${index}`}
                    className="grid gap-2 lg:grid-cols-[1fr_1fr_0.5fr_auto]"
                  >
                    <input
                      value={rate.level}
                      onChange={(event) =>
                        updateLessonRate(index, "level", event.target.value)
                      }
                      placeholder="Lesson level"
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <input
                      value={rate.length}
                      onChange={(event) =>
                        updateLessonRate(index, "length", event.target.value)
                      }
                      placeholder="Lesson length"
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <input
                      value={rate.price}
                      onChange={(event) =>
                        updateLessonRate(index, "price", event.target.value)
                      }
                      placeholder="Price"
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <button
                      type="button"
                      onClick={() => removeLessonRate(index)}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Pricing Note
                </span>
                <input
                  value={educationContent.pricingNote}
                  onChange={(event) =>
                    setEducationContent((currentContent) => ({
                      ...currentContent,
                      pricingNote: event.target.value,
                    }))
                  }
                  className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
            </div>
          </div>
        ) : null}

        {activeTab === "repairs" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Repairs Page
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Edit the repair page hero, service sections, service lists,
                  and final call-to-action.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveRepairs}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Repairs
                </button>
                <button
                  type="button"
                  onClick={resetRepairs}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Hero
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Eyebrow
                  </span>
                  <input
                    value={repairContent.hero.eyebrow}
                    onChange={(event) =>
                      updateRepairHero("eyebrow", event.target.value)
                    }
                    className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                    Button Label
                  </span>
                  <input
                    value={repairContent.hero.ctaLabel}
                    onChange={(event) =>
                      updateRepairHero("ctaLabel", event.target.value)
                    }
                    className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Hero Title
                </span>
                <input
                  value={repairContent.hero.title}
                  onChange={(event) =>
                    updateRepairHero("title", event.target.value)
                  }
                  className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Subtitle
                </span>
                <input
                  value={repairContent.hero.subtitle}
                  onChange={(event) =>
                    updateRepairHero("subtitle", event.target.value)
                  }
                  className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-4">
                <input
                  value={repairContent.hero.titleSize || ""}
                  onChange={(event) =>
                    updateRepairHero("titleSize", event.target.value)
                  }
                  placeholder="Title size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={repairContent.hero.titleColor || ""}
                  onChange={(event) =>
                    updateRepairHero("titleColor", event.target.value)
                  }
                  placeholder="Title color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={repairContent.hero.subtitleSize || ""}
                  onChange={(event) =>
                    updateRepairHero("subtitleSize", event.target.value)
                  }
                  placeholder="Subtitle size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={repairContent.hero.subtitleColor || ""}
                  onChange={(event) =>
                    updateRepairHero("subtitleColor", event.target.value)
                  }
                  placeholder="Subtitle color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </div>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Hero Body
                </span>
                <textarea
                  value={repairContent.hero.body.join("\n\n")}
                  onChange={(event) =>
                    updateRepairHero(
                      "body",
                      event.target.value
                        .split(/\n{2,}/)
                        .map((paragraph) => paragraph.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={7}
                  className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Slideshow Intro
              </p>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Eyebrow
                </span>
                <input
                  value={repairContent.bench.eyebrow}
                  onChange={(event) =>
                    updateRepairBench("eyebrow", event.target.value)
                  }
                  className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Title
                </span>
                <input
                  value={repairContent.bench.title}
                  onChange={(event) =>
                    updateRepairBench("title", event.target.value)
                  }
                  className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </label>
              <div className="border-t border-ivory/10 pt-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                      Slideshow Photos
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ivory-muted">
                      Add, replace, crop, describe, or remove the photos used in
                      the repair page slideshow.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addRepairSlideshowImage}
                    className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                  >
                    Add Photo
                  </button>
                </div>

                <div className="grid gap-4">
                  {repairContent.slideshowImages.map((image, imageIndex) => (
                    <div
                      key={`repair-slideshow-${imageIndex}`}
                      className="grid gap-4 border border-ivory/10 bg-espresso/25 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-ivory-muted">
                          Photo {imageIndex + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeRepairSlideshowImage(imageIndex)}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                        >
                          Delete Photo
                        </button>
                      </div>
                      <MediaPathField
                        label="Image Path or Upload"
                        value={image.src}
                        onChange={(value) =>
                          updateRepairSlideshowImage(imageIndex, "src", value)
                        }
                        placeholder="/media/repair/photo-name.jpeg"
                        altValue={image.alt}
                        onAltChange={(value) =>
                          updateRepairSlideshowImage(imageIndex, "alt", value)
                        }
                        cropValue={image.objectPosition || "50% 50%"}
                        onCropChange={(value) =>
                          updateRepairSlideshowImage(
                            imageIndex,
                            "objectPosition",
                            value,
                          )
                        }
                        fitValue={image.objectFit || "cover"}
                        onFitChange={(value) =>
                          updateRepairSlideshowImage(
                            imageIndex,
                            "objectFit",
                            value === "contain" ? "contain" : "cover",
                          )
                        }
                        zoomValue={image.zoom || 1}
                        onZoomChange={(value) =>
                          updateRepairSlideshowImage(imageIndex, "zoom", value)
                        }
                        ratioWidthValue={image.cropRatioWidth || 16}
                        ratioHeightValue={image.cropRatioHeight || 9}
                        onRatioChange={(width, height) => {
                          updateRepairSlideshowImage(
                            imageIndex,
                            "cropRatioWidth",
                            width,
                          );
                          updateRepairSlideshowImage(
                            imageIndex,
                            "cropRatioHeight",
                            height,
                          );
                        }}
                        frameWidthValue={image.customFrameWidth || 1600}
                        frameHeightValue={image.customFrameHeight || 900}
                        onFrameChange={(width, height) => {
                          updateRepairSlideshowImage(
                            imageIndex,
                            "customFrameWidth",
                            width,
                          );
                          updateRepairSlideshowImage(
                            imageIndex,
                            "customFrameHeight",
                            height,
                          );
                        }}
                        presetNameValue={image.cropPresetName || ""}
                        onPresetNameChange={(value) =>
                          updateRepairSlideshowImage(
                            imageIndex,
                            "cropPresetName",
                            value,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="grid gap-5">
              {repairContent.sections.map((section, sectionIndex) => (
                <article
                  key={section.id}
                  className="elegant-surface grid gap-4 border border-ivory/10 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                      {section.eyebrow}
                    </p>
                    <span className="text-xs uppercase tracking-[0.16em] text-smoke-brown">
                      #{section.id}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Navigation Label
                      </span>
                      <input
                        value={section.navLabel || ""}
                        onChange={(event) =>
                          updateRepairSection(
                            sectionIndex,
                            "navLabel",
                            event.target.value,
                          )
                        }
                        placeholder="Only used for menu sections"
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                        Eyebrow
                      </span>
                      <input
                        value={section.eyebrow}
                        onChange={(event) =>
                          updateRepairSection(
                            sectionIndex,
                            "eyebrow",
                            event.target.value,
                          )
                        }
                        className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Section Title
                    </span>
                    <input
                      value={section.title}
                      onChange={(event) =>
                        updateRepairSection(
                          sectionIndex,
                          "title",
                          event.target.value,
                        )
                      }
                      className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Body
                    </span>
                    <textarea
                      value={section.body.join("\n\n")}
                      onChange={(event) =>
                        updateRepairSection(
                          sectionIndex,
                          "body",
                          event.target.value
                            .split(/\n{2,}/)
                            .map((paragraph) => paragraph.trim())
                            .filter(Boolean),
                        )
                      }
                      rows={7}
                      className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                    />
                  </label>

                  {section.listItems ? (
                    <div className="border-t border-ivory/10 pt-4">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <label className="block grow">
                          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                            List Heading
                          </span>
                          <input
                            value={section.listTitle || ""}
                            onChange={(event) =>
                              updateRepairSection(
                                sectionIndex,
                                "listTitle",
                                event.target.value,
                              )
                            }
                            className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => addRepairListItem(sectionIndex)}
                          className="mt-6 border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                        >
                          Add Item
                        </button>
                      </div>
                      <div className="grid gap-3">
                        {section.listItems.map((item, itemIndex) => (
                          <div
                            key={`${section.id}-${itemIndex}`}
                            className="grid gap-2 sm:grid-cols-[1fr_auto]"
                          >
                            <input
                              value={item}
                              onChange={(event) =>
                                updateRepairListItem(
                                  sectionIndex,
                                  itemIndex,
                                  event.target.value,
                                )
                              }
                              className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeRepairListItem(sectionIndex, itemIndex)
                              }
                              className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Final CTA
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={repairContent.finalCta.eyebrow}
                  onChange={(event) =>
                    updateRepairFinalCta("eyebrow", event.target.value)
                  }
                  placeholder="Eyebrow"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={repairContent.finalCta.ctaLabel}
                  onChange={(event) =>
                    updateRepairFinalCta("ctaLabel", event.target.value)
                  }
                  placeholder="Button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                />
              </div>
              <input
                value={repairContent.finalCta.title}
                onChange={(event) =>
                  updateRepairFinalCta("title", event.target.value)
                }
                placeholder="CTA title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={repairContent.finalCta.body}
                onChange={(event) =>
                  updateRepairFinalCta("body", event.target.value)
                }
                rows={4}
                placeholder="CTA body"
                className="w-full resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
              />
            </article>
          </div>
        ) : null}

        {activeTab === "pricing" ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setRateGuides((currentGuides) => [
                    ...currentGuides,
                    { title: "New Package", price: "$0", description: "" },
                  ])
                }
                className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
              >
                Add Package
              </button>
              <button
                type="button"
                onClick={savePricing}
                className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
              >
                Save Pricing
              </button>
              <button
                type="button"
                onClick={resetPricing}
                className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
              >
                Reset Pricing
              </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {rateGuides.map((guide, index) => (
                <article
                  key={`${guide.title}-${index}`}
                  className="elegant-surface grid gap-4 border border-ivory/10 p-5"
                >
                  <input
                    value={guide.title}
                    onChange={(event) =>
                      setRateGuides((currentGuides) =>
                        currentGuides.map((currentGuide, guideIndex) =>
                          guideIndex === index
                            ? { ...currentGuide, title: event.target.value }
                            : currentGuide,
                        ),
                      )
                    }
                    className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                  />
                  <input
                    value={guide.price}
                    onChange={(event) =>
                      setRateGuides((currentGuides) =>
                        currentGuides.map((currentGuide, guideIndex) =>
                          guideIndex === index
                            ? { ...currentGuide, price: event.target.value }
                            : currentGuide,
                        ),
                      )
                    }
                    className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                  />
                  <textarea
                    value={guide.description}
                    onChange={(event) =>
                      setRateGuides((currentGuides) =>
                        currentGuides.map((currentGuide, guideIndex) =>
                          guideIndex === index
                            ? {
                                ...currentGuide,
                                description: event.target.value,
                              }
                            : currentGuide,
                        ),
                      )
                    }
                    rows={4}
                    className="resize-none border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                  />
                </article>
              ))}
            </div>
            <div className="elegant-surface border border-ivory/10 p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-gold/80">
                Add-ons
              </p>
              <textarea
                value={addOns.join("\n")}
                onChange={(event) => setAddOns(event.target.value.split("\n"))}
                rows={8}
                className="w-full resize-none border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
              />
            </div>
          </div>
        ) : null}

        {activeTab === "upcoming" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Upcoming Performances
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Add public concerts, restaurant appearances, featured events,
                  and seasonal performances. The public site only shows events
                  that are both public and published.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addUpcomingPerformance}
                  className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={saveUpcomingPerformances}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Events
                </button>
                <button
                  type="button"
                  onClick={resetUpcomingPerformances}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            {upcomingPerformances.length === 0 ? (
              <div className="elegant-surface border border-ivory/10 p-6">
                <p className="text-sm leading-7 text-ivory-muted">
                  No upcoming performances have been added yet. Use “Add Event”
                  to create the first listing.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {upcomingPerformances.map((event, index) => (
                  <article
                    key={event.id}
                    className="elegant-surface grid gap-4 border border-ivory/10 p-5"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                          Event {index + 1}
                        </p>
                        <h3 className="mt-2 font-display text-3xl text-ivory">
                          {event.eventTitle || "Untitled Performance"}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => moveUpcomingPerformance(index, -1)}
                          disabled={index === 0}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          onClick={() => moveUpcomingPerformance(index, 1)}
                          disabled={index === upcomingPerformances.length - 1}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          onClick={() => removeUpcomingPerformance(index)}
                          className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <SettingsInput
                        label="Event Title"
                        value={event.eventTitle}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "eventTitle", value)
                        }
                      />
                      <SettingsInput
                        label="Venue Name"
                        value={event.venueName}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "venueName", value)
                        }
                      />
                      <SettingsInput
                        label="Date"
                        type="date"
                        value={event.date}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "date", value)
                        }
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <SettingsTimeField
                          label="Start Time"
                          value={event.startTime}
                          onChange={(value) =>
                            updateUpcomingPerformance(index, "startTime", value)
                          }
                        />
                        <SettingsTimeField
                          label="End Time"
                          value={event.endTime}
                          onChange={(value) =>
                            updateUpcomingPerformance(index, "endTime", value)
                          }
                        />
                      </div>
                      <SettingsInput
                        label="City"
                        value={event.city}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "city", value)
                        }
                      />
                      <SettingsInput
                        label="State"
                        value={event.state}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "state", value)
                        }
                      />
                    </div>

                    <SettingsInput
                      label="Ticket / Info URL"
                      value={event.ticketUrl}
                      onChange={(value) =>
                        updateUpcomingPerformance(index, "ticketUrl", value)
                      }
                      placeholder="https://..."
                    />

                    <SettingsTextarea
                      label="Short Description"
                      value={event.shortDescription}
                      onChange={(value) =>
                        updateUpcomingPerformance(
                          index,
                          "shortDescription",
                          value,
                        )
                      }
                      rows={3}
                    />

                    <div className="grid gap-3 md:grid-cols-3">
                      <SettingsToggle
                        label="Public Event"
                        checked={event.isPublic}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "isPublic", value)
                        }
                      />
                      <SettingsToggle
                        label="Featured Event"
                        checked={event.featured}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "featured", value)
                        }
                      />
                      <SettingsToggle
                        label="Published"
                        checked={event.published}
                        onChange={(value) =>
                          updateUpcomingPerformance(index, "published", value)
                        }
                      />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {activeTab === "main" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Main Page
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Edit the homepage sections clients see first: hero, weddings,
                  experience, featured video, reviews, photo album, and final
                  inquiry.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveMainPage}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Main Page
                </button>
                <button
                  type="button"
                  onClick={resetMainPage}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset Main Page
                </button>
              </div>
            </div>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Hero
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={mainPageContent.hero.eyebrow}
                  onChange={(event) =>
                    updateMainHero("eyebrow", event.target.value)
                  }
                  placeholder="Eyebrow"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <MediaPathField
                  label="Hero Image"
                  value={mainPageContent.hero.primaryImage}
                  onChange={(value) => updateMainHero("primaryImage", value)}
                  cropValue={mainPageContent.hero.primaryImagePosition}
                  onCropChange={(value) =>
                    updateMainHero("primaryImagePosition", value)
                  }
                  fitValue={mainPageContent.hero.primaryImageFit || "cover"}
                  onFitChange={(value) => updateMainHero("primaryImageFit", value)}
                  zoomValue={mainPageContent.hero.primaryImageZoom || 1}
                  onZoomChange={(value) =>
                    updateMainHero("primaryImageZoom", value)
                  }
                  ratioWidthValue={
                    mainPageContent.hero.primaryImageCropRatioWidth || 16
                  }
                  ratioHeightValue={
                    mainPageContent.hero.primaryImageCropRatioHeight || 9
                  }
                  onRatioChange={(width, height) => {
                    updateMainHero("primaryImageCropRatioWidth", width);
                    updateMainHero("primaryImageCropRatioHeight", height);
                  }}
                  frameWidthValue={
                    mainPageContent.hero.primaryImageCustomFrameWidth || 1600
                  }
                  frameHeightValue={
                    mainPageContent.hero.primaryImageCustomFrameHeight || 900
                  }
                  onFrameChange={(width, height) => {
                    updateMainHero("primaryImageCustomFrameWidth", width);
                    updateMainHero("primaryImageCustomFrameHeight", height);
                  }}
                  presetNameValue={
                    mainPageContent.hero.primaryImageCropPresetName ||
                    "Homepage Hero"
                  }
                  onPresetNameChange={(value) =>
                    updateMainHero("primaryImageCropPresetName", value)
                  }
                />
              </div>
              <input
                value={mainPageContent.hero.title}
                onChange={(event) => updateMainHero("title", event.target.value)}
                placeholder="Hero title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.hero.copy}
                onChange={(event) => updateMainHero("copy", event.target.value)}
                rows={3}
                placeholder="Hero copy"
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-4">
                <input
                  value={mainPageContent.hero.titleSize || ""}
                  onChange={(event) =>
                    updateMainHero("titleSize", event.target.value)
                  }
                  placeholder="Title size, e.g. 72px"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.titleColor || ""}
                  onChange={(event) =>
                    updateMainHero("titleColor", event.target.value)
                  }
                  placeholder="Title color, e.g. #b85f2e"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.subtitleSize || ""}
                  onChange={(event) =>
                    updateMainHero("subtitleSize", event.target.value)
                  }
                  placeholder="Subtitle size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.subtitleColor || ""}
                  onChange={(event) =>
                    updateMainHero("subtitleColor", event.target.value)
                  }
                  placeholder="Subtitle color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={mainPageContent.hero.primaryCtaLabel}
                  onChange={(event) =>
                    updateMainHero("primaryCtaLabel", event.target.value)
                  }
                  placeholder="Primary button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.primaryCtaHref}
                  onChange={(event) =>
                    updateMainHero("primaryCtaHref", event.target.value)
                  }
                  placeholder="/contact"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.secondaryCtaLabel}
                  onChange={(event) =>
                    updateMainHero("secondaryCtaLabel", event.target.value)
                  }
                  placeholder="Secondary button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.hero.secondaryCtaHref}
                  onChange={(event) =>
                    updateMainHero("secondaryCtaHref", event.target.value)
                  }
                  placeholder="/music"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Weddings & Events
              </p>
              <input
                value={mainPageContent.weddings.eyebrow}
                onChange={(event) =>
                  updateMainWeddings("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={mainPageContent.weddings.title}
                onChange={(event) =>
                  updateMainWeddings("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.weddings.body.join("\n\n")}
                onChange={(event) =>
                  updateMainWeddings(
                    "body",
                    event.target.value
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean),
                  )
                }
                rows={7}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Event Types
                </span>
                <textarea
                  value={mainPageContent.weddings.eventTypes.join("\n")}
                  onChange={(event) =>
                    updateMainWeddings(
                      "eventTypes",
                      event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    )
                  }
                  rows={6}
                  className="w-full resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
                />
              </label>
              <div className="border-t border-ivory/10 pt-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                    Social Links
                  </p>
                  <button
                    type="button"
                    onClick={addMainSocialLink}
                    className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                  >
                    Add Link
                  </button>
                </div>
                <div className="grid gap-3">
                  {mainPageContent.weddings.socialLinks.map((link, index) => (
                    <div
                      key={`${link.label}-${index}`}
                      className="grid gap-2 lg:grid-cols-[0.6fr_1fr_auto]"
                    >
                      <input
                        value={link.label}
                        onChange={(event) =>
                          updateMainSocialLink(index, "label", event.target.value)
                        }
                        className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                      <input
                        value={link.href}
                        onChange={(event) =>
                          updateMainSocialLink(index, "href", event.target.value)
                        }
                        className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                      <button
                        type="button"
                        onClick={() => removeMainSocialLink(index)}
                        className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                The Experience
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={mainPageContent.experience.eyebrow}
                  onChange={(event) =>
                    updateMainExperience("eyebrow", event.target.value)
                  }
                  placeholder="Eyebrow"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <MediaPathField
                  label="Experience Image"
                  value={mainPageContent.experience.image}
                  onChange={(value) => updateMainExperience("image", value)}
                  altValue={mainPageContent.experience.imageAlt}
                  onAltChange={(value) =>
                    updateMainExperience("imageAlt", value)
                  }
                  cropValue={mainPageContent.experience.imagePosition}
                  onCropChange={(value) =>
                    updateMainExperience("imagePosition", value)
                  }
                  fitValue={mainPageContent.experience.imageFit || "cover"}
                  onFitChange={(value) => updateMainExperience("imageFit", value)}
                  zoomValue={mainPageContent.experience.imageZoom || 1}
                  onZoomChange={(value) =>
                    updateMainExperience("imageZoom", value)
                  }
                  ratioWidthValue={
                    mainPageContent.experience.imageCropRatioWidth || 4
                  }
                  ratioHeightValue={
                    mainPageContent.experience.imageCropRatioHeight || 5
                  }
                  onRatioChange={(width, height) => {
                    updateMainExperience("imageCropRatioWidth", width);
                    updateMainExperience("imageCropRatioHeight", height);
                  }}
                  frameWidthValue={
                    mainPageContent.experience.imageCustomFrameWidth || 800
                  }
                  frameHeightValue={
                    mainPageContent.experience.imageCustomFrameHeight || 1000
                  }
                  onFrameChange={(width, height) => {
                    updateMainExperience("imageCustomFrameWidth", width);
                    updateMainExperience("imageCustomFrameHeight", height);
                  }}
                  presetNameValue={
                    mainPageContent.experience.imageCropPresetName ||
                    "About Portrait"
                  }
                  onPresetNameChange={(value) =>
                    updateMainExperience("imageCropPresetName", value)
                  }
                />
              </div>
              <input
                value={mainPageContent.experience.title}
                onChange={(event) =>
                  updateMainExperience("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.experience.body.join("\n\n")}
                onChange={(event) =>
                  updateMainExperience(
                    "body",
                    event.target.value
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean),
                  )
                }
                rows={7}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={mainPageContent.experience.leftCaption}
                  onChange={(event) =>
                    updateMainExperience("leftCaption", event.target.value)
                  }
                  placeholder="Left caption"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.experience.rightCaption}
                  onChange={(event) =>
                    updateMainExperience("rightCaption", event.target.value)
                  }
                  placeholder="Right caption"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Featured Performance
              </p>
              <input
                value={mainPageContent.featuredPerformance.eyebrow}
                onChange={(event) =>
                  updateFeaturedPerformance("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={mainPageContent.featuredPerformance.title}
                onChange={(event) =>
                  updateFeaturedPerformance("title", event.target.value)
                }
                placeholder="Title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.featuredPerformance.copy}
                onChange={(event) =>
                  updateFeaturedPerformance("copy", event.target.value)
                }
                rows={3}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  value={mainPageContent.featuredPerformance.youtubeUrl}
                  onChange={(event) =>
                    updateFeaturedPerformance("youtubeUrl", event.target.value)
                  }
                  placeholder="YouTube watch link"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.featuredPerformance.embedUrl}
                  onChange={(event) =>
                    updateFeaturedPerformance("embedUrl", event.target.value)
                  }
                  placeholder="YouTube embed link"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.featuredPerformance.buttonLabel}
                  onChange={(event) =>
                    updateFeaturedPerformance("buttonLabel", event.target.value)
                  }
                  placeholder="Button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  Reviews
                </p>
                <button
                  type="button"
                  onClick={addMainReview}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Review
                </button>
              </div>
              <input
                value={mainPageContent.reviews.eyebrow}
                onChange={(event) =>
                  updateMainReviews("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={mainPageContent.reviews.title}
                onChange={(event) =>
                  updateMainReviews("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 lg:grid-cols-2">
                {mainPageContent.reviews.items.map((review, index) => (
                  <div
                    key={`main-page-review-${index}`}
                    className="grid gap-3 border border-ivory/10 p-4"
                  >
                    <input
                      value={review.label}
                      onChange={(event) =>
                        updateMainReview(index, "label", event.target.value)
                      }
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <textarea
                      value={review.quote}
                      onChange={(event) =>
                        updateMainReview(index, "quote", event.target.value)
                      }
                      rows={3}
                      className="resize-y border border-ivory/10 bg-espresso/45 px-3 py-3 text-ivory outline-none focus:border-gold/70"
                    />
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                      <input
                        value={review.source}
                        onChange={(event) =>
                          updateMainReview(index, "source", event.target.value)
                        }
                        className="min-h-12 border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                      />
                      <button
                        type="button"
                        onClick={() => removeMainReview(index)}
                        className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  Photo Album
                </p>
                <button
                  type="button"
                  onClick={addMainGalleryImage}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Image
                </button>
              </div>
              <input
                value={mainPageContent.gallery.eyebrow}
                onChange={(event) =>
                  updateMainGallery("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={mainPageContent.gallery.title}
                onChange={(event) =>
                  updateMainGallery("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.gallery.copy}
                onChange={(event) =>
                  updateMainGallery("copy", event.target.value)
                }
                rows={3}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-3">
                {mainPageContent.gallery.images.map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className="grid gap-3 border border-ivory/10 p-4 lg:grid-cols-[1fr_auto]"
                  >
                    <MediaPathField
                      label={`Image ${index + 1}`}
                      value={image.src}
                      onChange={(value) =>
                        updateMainGalleryImage(index, "src", value)
                      }
                      altValue={image.alt}
                      onAltChange={(value) =>
                        updateMainGalleryImage(index, "alt", value)
                      }
                      cropValue={image.position || "center"}
                      onCropChange={(value) =>
                        updateMainGalleryImage(index, "position", value)
                      }
                      fitValue={image.fit || "contain"}
                      onFitChange={(value) =>
                        updateMainGalleryImage(index, "fit", value)
                      }
                      zoomValue={image.zoom || 1}
                      onZoomChange={(value) =>
                        updateMainGalleryImage(index, "zoom", value)
                      }
                      ratioWidthValue={image.cropRatioWidth || 16}
                      ratioHeightValue={image.cropRatioHeight || 9}
                      onRatioChange={(width, height) => {
                        updateMainGalleryImage(index, "cropRatioWidth", width);
                        updateMainGalleryImage(index, "cropRatioHeight", height);
                      }}
                      frameWidthValue={image.customFrameWidth || 1600}
                      frameHeightValue={image.customFrameHeight || 900}
                      onFrameChange={(width, height) => {
                        updateMainGalleryImage(index, "customFrameWidth", width);
                        updateMainGalleryImage(index, "customFrameHeight", height);
                      }}
                      presetNameValue={image.cropPresetName || "Gallery Wide"}
                      onPresetNameChange={(value) =>
                        updateMainGalleryImage(index, "cropPresetName", value)
                      }
                    />
                    <div className="flex items-start">
                      <button
                        type="button"
                        onClick={() => removeMainGalleryImage(index)}
                        className="border border-ivory/10 px-3 py-3 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Final Inquiry
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={mainPageContent.finalCta.eyebrow}
                  onChange={(event) =>
                    updateMainFinalCta("eyebrow", event.target.value)
                  }
                  placeholder="Eyebrow"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={mainPageContent.finalCta.buttonLabel}
                  onChange={(event) =>
                    updateMainFinalCta("buttonLabel", event.target.value)
                  }
                  placeholder="Button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
              <input
                value={mainPageContent.finalCta.title}
                onChange={(event) =>
                  updateMainFinalCta("title", event.target.value)
                }
                placeholder="CTA title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={mainPageContent.finalCta.copy}
                onChange={(event) =>
                  updateMainFinalCta("copy", event.target.value)
                }
                rows={4}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={mainPageContent.finalCta.buttonHref}
                onChange={(event) =>
                  updateMainFinalCta("buttonHref", event.target.value)
                }
                placeholder="/contact"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
            </article>
          </div>
        ) : null}

        {activeTab === "about" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  About Page
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Edit William&apos;s biography, stage portrait, instrument loan
                  section, and any additional photos shown on the About page.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveAbout}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save About
                </button>
                <button
                  type="button"
                  onClick={resetAbout}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset About
                </button>
              </div>
            </div>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Page Intro
              </p>
              <input
                value={aboutContent.intro.eyebrow}
                onChange={(event) =>
                  updateAboutIntro("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={aboutContent.intro.title}
                onChange={(event) =>
                  updateAboutIntro("title", event.target.value)
                }
                placeholder="Page title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={aboutContent.intro.copy}
                onChange={(event) =>
                  updateAboutIntro("copy", event.target.value)
                }
                rows={3}
                placeholder="Optional intro copy"
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-4">
                <input
                  value={aboutContent.intro.titleSize || ""}
                  onChange={(event) =>
                    updateAboutIntro("titleSize", event.target.value)
                  }
                  placeholder="Title size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.intro.titleColor || ""}
                  onChange={(event) =>
                    updateAboutIntro("titleColor", event.target.value)
                  }
                  placeholder="Title color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.intro.subtitleSize || ""}
                  onChange={(event) =>
                    updateAboutIntro("subtitleSize", event.target.value)
                  }
                  placeholder="Subtitle size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.intro.subtitleColor || ""}
                  onChange={(event) =>
                    updateAboutIntro("subtitleColor", event.target.value)
                  }
                  placeholder="Subtitle color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Main Photo
              </p>
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <MediaPathField
                  label="About Page Photo"
                  value={aboutContent.portrait.src}
                  onChange={(value) => updateAboutPortrait("src", value)}
                  altValue={aboutContent.portrait.alt}
                  onAltChange={(value) => updateAboutPortrait("alt", value)}
                  cropValue={aboutContent.portrait.position || "center"}
                  onCropChange={(value) =>
                    updateAboutPortrait("position", value)
                  }
                  fitValue={aboutContent.portrait.fit || "contain"}
                  onFitChange={(value) => updateAboutPortrait("fit", value)}
                  zoomValue={aboutContent.portrait.zoom || 1}
                  onZoomChange={(value) => updateAboutPortrait("zoom", value)}
                  ratioWidthValue={aboutContent.portrait.cropRatioWidth || 4}
                  ratioHeightValue={aboutContent.portrait.cropRatioHeight || 5}
                  onRatioChange={(width, height) => {
                    updateAboutPortrait("cropRatioWidth", width);
                    updateAboutPortrait("cropRatioHeight", height);
                  }}
                  frameWidthValue={aboutContent.portrait.customFrameWidth || 800}
                  frameHeightValue={aboutContent.portrait.customFrameHeight || 1000}
                  onFrameChange={(width, height) => {
                    updateAboutPortrait("customFrameWidth", width);
                    updateAboutPortrait("customFrameHeight", height);
                  }}
                  presetNameValue={
                    aboutContent.portrait.cropPresetName || "About Portrait"
                  }
                  onPresetNameChange={(value) =>
                    updateAboutPortrait("cropPresetName", value)
                  }
                />
                <div className="grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold/80">
                      Caption
                    </span>
                    <input
                      value={aboutContent.portrait.caption}
                      onChange={(event) =>
                        updateAboutPortrait("caption", event.target.value)
                      }
                      className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70"
                    />
                  </label>
                </div>
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Biography
              </p>
              <input
                value={aboutContent.bio.eyebrow}
                onChange={(event) =>
                  updateAboutBio("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={aboutContent.bio.paragraphs.join("\n\n")}
                onChange={(event) =>
                  updateAboutBio(
                    "paragraphs",
                    event.target.value
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean),
                  )
                }
                rows={12}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <span className="text-xs leading-6 text-smoke-brown">
                Separate biography paragraphs with a blank line.
              </span>
              <textarea
                value={aboutContent.bio.finalNote}
                onChange={(event) =>
                  updateAboutBio("finalNote", event.target.value)
                }
                rows={2}
                placeholder="Final italic note"
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Instrument Loan Section
              </p>
              <input
                value={aboutContent.instrumentLoan.eyebrow}
                onChange={(event) =>
                  updateAboutInstrumentLoan("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={aboutContent.instrumentLoan.title}
                onChange={(event) =>
                  updateAboutInstrumentLoan("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={aboutContent.instrumentLoan.body.join("\n\n")}
                onChange={(event) =>
                  updateAboutInstrumentLoan(
                    "body",
                    event.target.value
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean),
                  )
                }
                rows={7}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={aboutContent.instrumentLoan.buttonLabel}
                  onChange={(event) =>
                    updateAboutInstrumentLoan("buttonLabel", event.target.value)
                  }
                  placeholder="Button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.instrumentLoan.buttonHref}
                  onChange={(event) =>
                    updateAboutInstrumentLoan("buttonHref", event.target.value)
                  }
                  placeholder="/donate"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.instrumentLoan.linkText}
                  onChange={(event) =>
                    updateAboutInstrumentLoan("linkText", event.target.value)
                  }
                  placeholder="Secondary link text"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={aboutContent.instrumentLoan.linkHref}
                  onChange={(event) =>
                    updateAboutInstrumentLoan("linkHref", event.target.value)
                  }
                  placeholder="/contact#inquiry"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  Additional Photos
                </p>
                <button
                  type="button"
                  onClick={addAboutPhoto}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Photo
                </button>
              </div>
              {aboutContent.photos.length === 0 ? (
                <p className="text-sm leading-7 text-ivory-muted">
                  No extra About page photos yet. Add one when you want another
                  image below the biography.
                </p>
              ) : (
                <div className="grid gap-3">
                  {aboutContent.photos.map((photo, index) => (
                    <div
                      key={`${photo.src}-${index}`}
                      className="grid gap-3 border border-ivory/10 p-4 lg:grid-cols-[1fr_auto]"
                    >
                      <MediaPathField
                        label={`Photo ${index + 1}`}
                        value={photo.src}
                        onChange={(value) =>
                          updateAboutPhoto(index, "src", value)
                        }
                        altValue={photo.alt}
                        onAltChange={(value) =>
                          updateAboutPhoto(index, "alt", value)
                        }
                        cropValue={photo.position || "center"}
                        onCropChange={(value) =>
                          updateAboutPhoto(index, "position", value)
                        }
                        fitValue={photo.fit || "contain"}
                        onFitChange={(value) =>
                          updateAboutPhoto(index, "fit", value)
                        }
                        zoomValue={photo.zoom || 1}
                        onZoomChange={(value) =>
                          updateAboutPhoto(index, "zoom", value)
                        }
                        ratioWidthValue={photo.cropRatioWidth || 16}
                        ratioHeightValue={photo.cropRatioHeight || 9}
                        onRatioChange={(width, height) => {
                          updateAboutPhoto(index, "cropRatioWidth", width);
                          updateAboutPhoto(index, "cropRatioHeight", height);
                        }}
                        frameWidthValue={photo.customFrameWidth || 1600}
                        frameHeightValue={photo.customFrameHeight || 900}
                        onFrameChange={(width, height) => {
                          updateAboutPhoto(index, "customFrameWidth", width);
                          updateAboutPhoto(index, "customFrameHeight", height);
                        }}
                        presetNameValue={photo.cropPresetName || "Gallery Wide"}
                        onPresetNameChange={(value) =>
                          updateAboutPhoto(index, "cropPresetName", value)
                        }
                      />
                      <div className="flex items-start">
                        <button
                          type="button"
                          onClick={() => removeAboutPhoto(index)}
                          className="border border-ivory/10 px-3 py-3 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        ) : null}

        {activeTab === "donate" ? (
          <div className="space-y-6">
            <div className="elegant-surface grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold/80">
                  Instrument Fund Page
                </p>
                <p className="text-sm leading-7 text-ivory-muted">
                  Edit the public /donate page. For now, this page can remain
                  informational and point visitors to the Instrument Loan
                  Program until payment links are ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveDonate}
                  className="bg-ivory px-4 py-3 text-xs uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Instrument Fund
                </button>
                <button
                  type="button"
                  onClick={resetDonate}
                  className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Page Intro
              </p>
              <input
                value={donateContent.intro.eyebrow}
                onChange={(event) =>
                  updateDonateIntro("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={donateContent.intro.title}
                onChange={(event) =>
                  updateDonateIntro("title", event.target.value)
                }
                placeholder="Page title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={donateContent.intro.copy}
                onChange={(event) =>
                  updateDonateIntro("copy", event.target.value)
                }
                rows={3}
                placeholder="Intro copy"
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-4 md:grid-cols-4">
                <input
                  value={donateContent.intro.titleSize || ""}
                  onChange={(event) =>
                    updateDonateIntro("titleSize", event.target.value)
                  }
                  placeholder="Title size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={donateContent.intro.titleColor || ""}
                  onChange={(event) =>
                    updateDonateIntro("titleColor", event.target.value)
                  }
                  placeholder="Title color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={donateContent.intro.subtitleSize || ""}
                  onChange={(event) =>
                    updateDonateIntro("subtitleSize", event.target.value)
                  }
                  placeholder="Subtitle size"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={donateContent.intro.subtitleColor || ""}
                  onChange={(event) =>
                    updateDonateIntro("subtitleColor", event.target.value)
                  }
                  placeholder="Subtitle color"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                Main Message
              </p>
              <input
                value={donateContent.primary.eyebrow}
                onChange={(event) =>
                  updateDonatePrimary("eyebrow", event.target.value)
                }
                placeholder="Eyebrow"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <input
                value={donateContent.primary.title}
                onChange={(event) =>
                  updateDonatePrimary("title", event.target.value)
                }
                placeholder="Section title"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <textarea
                value={donateContent.primary.body.join("\n\n")}
                onChange={(event) =>
                  updateDonatePrimary(
                    "body",
                    event.target.value
                      .split(/\n{2,}/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean),
                  )
                }
                rows={7}
                className="resize-y border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none focus:border-gold/70"
              />
              <span className="text-xs leading-6 text-smoke-brown">
                Separate paragraphs with a blank line.
              </span>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={donateContent.primary.buttonLabel}
                  onChange={(event) =>
                    updateDonatePrimary("buttonLabel", event.target.value)
                  }
                  placeholder="Button label"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
                <input
                  value={donateContent.primary.buttonHref}
                  onChange={(event) =>
                    updateDonatePrimary("buttonHref", event.target.value)
                  }
                  placeholder="/about#instrument-loans"
                  className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                />
              </div>
            </article>

            <article className="elegant-surface grid gap-4 border border-ivory/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  Support List
                </p>
                <button
                  type="button"
                  onClick={addDonateSupportItem}
                  className="border border-gold/35 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                >
                  Add Item
                </button>
              </div>
              <input
                value={donateContent.support.eyebrow}
                onChange={(event) =>
                  updateDonateSupport("eyebrow", event.target.value)
                }
                placeholder="List heading"
                className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
              />
              <div className="grid gap-3">
                {donateContent.support.items.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="grid gap-2 sm:grid-cols-[1fr_auto]"
                  >
                    <input
                      value={item}
                      onChange={(event) =>
                        updateDonateSupportItem(index, event.target.value)
                      }
                      className="min-h-12 border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                    />
                    <button
                      type="button"
                      onClick={() => removeDonateSupportItem(index)}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted hover:border-gold/50 hover:text-ivory"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ) : null}

        {activeTab === "seo" ? (
          <div className="elegant-surface grid gap-5 border border-ivory/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  SEO Control Center
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-ivory">
                  Page-by-page search settings
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ivory-muted">
                  Each page has its own search title, description, social
                  preview, keywords, and publishing status. These fields are
                  structured so Supabase can later drive the live HTML metadata.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveSeoSettings}
                  className="inline-flex min-h-12 items-center justify-center bg-ivory px-5 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save All SEO
                </button>
                <button
                  type="button"
                  onClick={resetSeoSettings}
                  className="inline-flex min-h-12 items-center justify-center border border-ivory/10 px-5 text-xs font-medium uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {seoSettings.pages.map((page, index) => {
                const warnings = seoWarnings(page);
                const unsaved = isSeoPageUnsaved(page);
                const previewUrl = seoPreviewUrl(page);

                return (
                  <SettingsAccordion
                    key={page.key}
                    title={page.label}
                    description={`${page.urlSlug || "/"} · ${unsaved ? "Unsaved changes" : "Saved"}`}
                    defaultOpen={index === 0}
                  >
                    <div className="grid gap-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 border border-ivory/10 bg-espresso/30 px-4 py-3">
                        <div>
                          <p
                            className={`text-xs uppercase tracking-[0.2em] ${
                              unsaved ? "text-gold" : "text-ivory-muted"
                            }`}
                          >
                            {unsaved ? "Unsaved changes" : "Saved"}
                          </p>
                          <p className="mt-1 text-sm text-ivory-muted">
                            Last updated: {formatSeoTimestamp(page.lastUpdated)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => saveSeoPage(page.key)}
                          className="inline-flex min-h-11 items-center justify-center bg-ivory px-4 text-xs font-medium uppercase tracking-[0.16em] text-espresso transition hover:bg-gold"
                        >
                          Save {page.label}
                        </button>
                      </div>

                      <section className="grid gap-4 border border-ivory/10 bg-espresso/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                          Basic SEO
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <SettingsInput
                            label="Page Title"
                            value={page.pageTitle}
                            onChange={(value) =>
                              updateSeoPage(page.key, "pageTitle", value)
                            }
                          />
                          <SettingsInput
                            label="URL Slug"
                            value={page.urlSlug}
                            onChange={(value) =>
                              updateSeoPage(page.key, "urlSlug", value)
                            }
                          />
                        </div>
                        <SettingsTextarea
                          label="Meta Description"
                          value={page.metaDescription}
                          onChange={(value) =>
                            updateSeoPage(page.key, "metaDescription", value)
                          }
                          rows={3}
                        />
                        <SettingsInput
                          label="Canonical URL"
                          value={page.canonicalUrl}
                          onChange={(value) =>
                            updateSeoPage(page.key, "canonicalUrl", value)
                          }
                        />
                        <div className="grid gap-3 md:grid-cols-2">
                          <SettingsToggle
                            label="Index in Search"
                            checked={page.index}
                            onChange={(value) =>
                              updateSeoPage(page.key, "index", value)
                            }
                          />
                          <SettingsToggle
                            label="Include in Sitemap"
                            checked={page.includeInSitemap}
                            onChange={(value) =>
                              updateSeoPage(page.key, "includeInSitemap", value)
                            }
                          />
                        </div>
                      </section>

                      <section className="grid gap-4 border border-ivory/10 bg-espresso/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                          Social Preview
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <SettingsInput
                            label="Open Graph Title"
                            value={page.ogTitle}
                            onChange={(value) =>
                              updateSeoPage(page.key, "ogTitle", value)
                            }
                          />
                          <MediaPathField
                            label="Open Graph Image"
                            value={page.ogImage}
                            onChange={(value) =>
                              updateSeoPage(page.key, "ogImage", value)
                            }
                            placeholder="/media/social-image.jpg"
                            cropValue={page.ogImagePosition || "50% 35%"}
                            onCropChange={(value) =>
                              updateSeoPage(page.key, "ogImagePosition", value)
                            }
                            fitValue={page.ogImageFit || "cover"}
                            onFitChange={(value) =>
                              updateSeoPage(page.key, "ogImageFit", value)
                            }
                            zoomValue={page.ogImageZoom || 1}
                            onZoomChange={(value) =>
                              updateSeoPage(page.key, "ogImageZoom", value)
                            }
                            ratioWidthValue={page.ogImageCropRatioWidth || 1200}
                            ratioHeightValue={page.ogImageCropRatioHeight || 630}
                            onRatioChange={(width, height) => {
                              updateSeoPage(
                                page.key,
                                "ogImageCropRatioWidth",
                                width,
                              );
                              updateSeoPage(
                                page.key,
                                "ogImageCropRatioHeight",
                                height,
                              );
                            }}
                            frameWidthValue={page.ogImageCustomFrameWidth || 1200}
                            frameHeightValue={page.ogImageCustomFrameHeight || 630}
                            onFrameChange={(width, height) => {
                              updateSeoPage(
                                page.key,
                                "ogImageCustomFrameWidth",
                                width,
                              );
                              updateSeoPage(
                                page.key,
                                "ogImageCustomFrameHeight",
                                height,
                              );
                            }}
                            presetNameValue={
                              page.ogImageCropPresetName || "Social Card"
                            }
                            onPresetNameChange={(value) =>
                              updateSeoPage(
                                page.key,
                                "ogImageCropPresetName",
                                value,
                              )
                            }
                            socialPreview
                          />
                        </div>
                        <SettingsTextarea
                          label="Open Graph Description"
                          value={page.ogDescription}
                          onChange={(value) =>
                            updateSeoPage(page.key, "ogDescription", value)
                          }
                          rows={3}
                        />
                        <div className="overflow-hidden border border-ivory/10 bg-espresso/45">
                          {page.ogImage ? (
                            <div className="h-44 border-b border-ivory/10 bg-espresso/50">
                              <img
                                src={page.ogImage}
                                alt=""
                                className="h-full w-full"
                                style={{
                                  objectFit:
                                    page.ogImageFit === "contain"
                                      ? "contain"
                                      : "cover",
                                  objectPosition:
                                    page.ogImagePosition || "50% 35%",
                                  transform: `scale(${page.ogImageZoom || 1})`,
                                  transformOrigin:
                                    page.ogImagePosition || "50% 35%",
                                }}
                              />
                            </div>
                          ) : null}
                          <div className="grid gap-2 p-4">
                            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/80">
                              Twitter / Social Card Preview
                            </p>
                            <p className="font-display text-2xl text-ivory">
                              {page.ogTitle || page.pageTitle || "Social title"}
                            </p>
                            <p className="text-sm leading-6 text-ivory-muted">
                              {page.ogDescription ||
                                page.metaDescription ||
                                "Social description preview."}
                            </p>
                            <p className="truncate text-xs text-ivory-muted/70">
                              {previewUrl}
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="grid gap-4 border border-ivory/10 bg-espresso/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                          Keyword Planning
                        </p>
                        <SettingsInput
                          label="Primary Target Keyword"
                          value={page.primaryKeyword}
                          onChange={(value) =>
                            updateSeoPage(page.key, "primaryKeyword", value)
                          }
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <SettingsTextarea
                            label="Secondary Keywords"
                            value={page.secondaryKeywords}
                            onChange={(value) =>
                              updateSeoPage(page.key, "secondaryKeywords", value)
                            }
                            rows={3}
                          />
                          <SettingsTextarea
                            label="Service Area Keywords"
                            value={page.serviceAreaKeywords}
                            onChange={(value) =>
                              updateSeoPage(
                                page.key,
                                "serviceAreaKeywords",
                                value,
                              )
                            }
                            rows={3}
                          />
                        </div>
                        <SettingsTextarea
                          label="Notes for Internal Linking"
                          value={page.internalLinkingNotes}
                          onChange={(value) =>
                            updateSeoPage(
                              page.key,
                              "internalLinkingNotes",
                              value,
                            )
                          }
                          rows={3}
                        />
                      </section>

                      <section className="grid gap-4 border border-ivory/10 bg-espresso/20 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                          Search Preview
                        </p>
                        <div className="border border-ivory/10 bg-[#f7f3eb] p-4 text-[#2d2924]">
                          <p className="truncate text-sm text-[#5f6f42]">
                            {previewUrl}
                          </p>
                          <p className="mt-1 font-display text-2xl leading-tight text-[#1f3f91]">
                            {page.pageTitle || "Page title preview"}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#4f4a44]">
                            {page.metaDescription ||
                              "Meta description preview for this page."}
                          </p>
                        </div>
                        <div className="grid gap-2 text-sm">
                          <p className="text-ivory-muted">
                            Title length: {page.pageTitle.trim().length} / 60
                          </p>
                          <p className="text-ivory-muted">
                            Description length:{" "}
                            {page.metaDescription.trim().length} / 160
                          </p>
                          {warnings.length ? (
                            <div className="grid gap-2 border border-gold/25 bg-gold/10 p-3">
                              {warnings.map((warning) => (
                                <p key={warning} className="text-gold">
                                  {warning}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="border border-ivory/10 bg-espresso/35 p-3 text-ivory-muted">
                              No major preview warnings for this page.
                            </p>
                          )}
                        </div>
                      </section>
                    </div>
                  </SettingsAccordion>
                );
              })}
            </div>
          </div>
        ) : null}

        {activeTab === "details" ? (
          <div className="elegant-surface grid gap-5 border border-ivory/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold/80">
                  Global Settings
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-ivory">
                  Site-wide control panel
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ivory-muted">
                  These fields are organized so the same content can later be
                  saved to Supabase. Browser-saved edits preview locally for now.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveSiteDetails}
                  className="inline-flex min-h-12 items-center justify-center bg-ivory px-5 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                >
                  Save Global Settings
                </button>
                <button
                  type="button"
                  onClick={resetSiteDetails}
                  className="inline-flex min-h-12 items-center justify-center border border-ivory/10 px-5 text-xs font-medium uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                >
                  Reset
                </button>
              </div>
            </div>

            <SettingsAccordion
              title="Business Identity"
              description="Names, tagline, service area, and private contact details used across the site."
              defaultOpen
            >
              <div className="grid gap-4 md:grid-cols-2">
                <SettingsInput
                  label="Public Brand Name"
                  value={siteDetails.businessIdentity.publicBrandName}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "publicBrandName", value)
                  }
                />
                <SettingsInput
                  label="Legal / Business Name"
                  value={siteDetails.businessIdentity.legalBusinessName}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "legalBusinessName", value)
                  }
                />
                <SettingsInput
                  label="Owner / Performer Name"
                  value={siteDetails.businessIdentity.ownerPerformerName}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "ownerPerformerName", value)
                  }
                />
                <SettingsInput
                  label="Main Tagline"
                  value={siteDetails.businessIdentity.mainTagline}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "mainTagline", value)
                  }
                />
                <SettingsInput
                  label="Primary Service Area"
                  value={siteDetails.businessIdentity.primaryServiceArea}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "primaryServiceArea", value)
                  }
                />
                <SettingsInput
                  label="Extended Travel Area"
                  value={siteDetails.businessIdentity.extendedTravelArea}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "extendedTravelArea", value)
                  }
                />
                <SettingsInput
                  label="Primary Business Email"
                  value={siteDetails.businessIdentity.primaryBusinessEmail}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "primaryBusinessEmail", value)
                  }
                />
                <SettingsInput
                  label="Optional Phone Number"
                  value={siteDetails.businessIdentity.optionalPhoneNumber}
                  onChange={(value) =>
                    updateSiteDetail("businessIdentity", "optionalPhoneNumber", value)
                  }
                />
              </div>
              <SettingsTextarea
                label="Short Site Description"
                value={siteDetails.businessIdentity.shortSiteDescription}
                onChange={(value) =>
                  updateSiteDetail("businessIdentity", "shortSiteDescription", value)
                }
                rows={3}
              />
            </SettingsAccordion>

            <SettingsAccordion
              title="Page Hero Typography"
              description="Adjust the visible title and subtitle size or color for standard page hero areas. Use values like 72px, 4.5rem, or #b85f2e."
            >
              <div className="grid gap-4">
                {pageHeroContent
                  .filter((page) => standardHeroPageKeys.has(page.key))
                  .map((page) => (
                  <article
                    key={page.key}
                    className="grid gap-4 border border-ivory/10 bg-espresso/35 p-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
                        {page.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ivory-muted">
                        {page.title}
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                      <SettingsInput
                        label="Title Font Size"
                        value={page.titleSize || ""}
                        onChange={(value) =>
                          updatePageHeroContent(page.key, "titleSize", value)
                        }
                      />
                      <SettingsInput
                        label="Title Color"
                        value={page.titleColor || ""}
                        onChange={(value) =>
                          updatePageHeroContent(page.key, "titleColor", value)
                        }
                      />
                      <SettingsInput
                        label="Subtitle Font Size"
                        value={page.subtitleSize || ""}
                        onChange={(value) =>
                          updatePageHeroContent(page.key, "subtitleSize", value)
                        }
                      />
                      <SettingsInput
                        label="Subtitle Color"
                        value={page.subtitleColor || ""}
                        onChange={(value) =>
                          updatePageHeroContent(page.key, "subtitleColor", value)
                        }
                      />
                    </div>
                  </article>
                ))}
              </div>
            </SettingsAccordion>

            <SettingsAccordion
              title="Social and Review Links"
              description="Public social links and review profile destinations."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <SettingsInput
                  label="YouTube"
                  value={siteDetails.socialReviewLinks.youtube}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "youtube", value)
                  }
                />
                <SettingsInput
                  label="Instagram"
                  value={siteDetails.socialReviewLinks.instagram}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "instagram", value)
                  }
                />
                <SettingsInput
                  label="Facebook"
                  value={siteDetails.socialReviewLinks.facebook}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "facebook", value)
                  }
                />
                <SettingsInput
                  label="TikTok"
                  value={siteDetails.socialReviewLinks.tiktok}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "tiktok", value)
                  }
                />
                <SettingsInput
                  label="Google Review Link"
                  value={siteDetails.socialReviewLinks.googleReview}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "googleReview", value)
                  }
                />
                <SettingsInput
                  label="GigSalad Link"
                  value={siteDetails.socialReviewLinks.gigSalad}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "gigSalad", value)
                  }
                />
                <SettingsInput
                  label="The Bash Link"
                  value={siteDetails.socialReviewLinks.theBash}
                  onChange={(value) =>
                    updateSiteDetail("socialReviewLinks", "theBash", value)
                  }
                />
              </div>
            </SettingsAccordion>

            <SettingsAccordion
              title="Payment and Tip Links"
              description="Manage optional tip, payment, QR, and instrument fund destinations in the order visitors should see them."
            >
              <div className="space-y-5">
                {(
                  [
                    {
                      number: "1",
                      name: "Venmo",
                      description:
                        "First option for casual tips and quick guest support.",
                      activeField: "venmoActive",
                      labelField: "venmoDisplayLabel",
                      destinationField: "venmoLink",
                      qrField: "venmoQrImage",
                      helperField: "venmoHelperText",
                      qrPlaceholder: "/media/venmo-qr.png",
                    },
                    {
                      number: "2",
                      name: "PayPal",
                      description: "A familiar payment option for guests and donors.",
                      activeField: "paypalActive",
                      labelField: "paypalDisplayLabel",
                      destinationField: "paypalLink",
                      qrField: "paypalQrImage",
                      helperField: "paypalHelperText",
                      qrPlaceholder: "/media/paypal-qr.png",
                    },
                    {
                      number: "3",
                      name: "Cash App",
                      description:
                        "Optional Cash App destination or instructions for tips.",
                      activeField: "cashAppActive",
                      labelField: "cashAppDisplayLabel",
                      destinationField: "cashAppLink",
                      qrField: "cashAppQrImage",
                      helperField: "cashAppHelperText",
                      qrPlaceholder: "/media/cash-app-qr.png",
                    },
                    {
                      number: "4",
                      name: "Zelle",
                      description:
                        "Optional bank transfer details when you choose to offer them.",
                      activeField: "zelleActive",
                      labelField: "zelleDisplayName",
                      destinationField: "zelleContact",
                      qrField: "zelleQrImage",
                      helperField: "zelleHelperText",
                      qrPlaceholder: "/media/zelle-qr.png",
                    },
                    {
                      number: "5",
                      name: "Apple Cash / Apple Pay",
                      description:
                        "Optional Apple Cash or Apple Pay instructions when available.",
                      activeField: "applePayActive",
                      labelField: "applePayDisplayLabel",
                      destinationField: "applePayLink",
                      qrField: "applePayQrImage",
                      helperField: "applePayHelperText",
                      qrPlaceholder: "/media/apple-pay-qr.png",
                    },
                    {
                      number: "6",
                      name: "Stripe Payment Link",
                      description: "Card, Apple Pay, and Google Pay destination.",
                      activeField: "stripeActive",
                      labelField: "stripeDisplayLabel",
                      destinationField: "stripePaymentLink",
                      qrField: "stripeQrImage",
                      helperField: "stripeHelperText",
                      qrPlaceholder: "/media/stripe-qr.png",
                    },
                    {
                      number: "7",
                      name: "GoFundMe or Donation Campaign",
                      description:
                        "Instrument fund, campaign, or larger support destination.",
                      activeField: "donationActive",
                      labelField: "donationDisplayLabel",
                      destinationField: "donationLink",
                      qrField: "donationQrImage",
                      helperField: "donationHelperText",
                      qrPlaceholder: "/media/donation-qr.png",
                    },
                  ] as const
                ).map((paymentCard) => (
                  <article
                    key={paymentCard.name}
                    className="border border-ivory/10 bg-espresso/30 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                          {paymentCard.number}. {paymentCard.name}
                        </p>
                        <p className="mt-1 text-sm text-ivory-muted">
                          {paymentCard.description}
                        </p>
                      </div>
                      <SettingsToggle
                        label="Active"
                        checked={Boolean(
                          siteDetails.paymentTipLinks[paymentCard.activeField],
                        )}
                        onChange={(value) =>
                          updateSiteDetail(
                            "paymentTipLinks",
                            paymentCard.activeField,
                            value,
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <SettingsInput
                        label="Display Label"
                        value={String(
                          siteDetails.paymentTipLinks[paymentCard.labelField],
                        )}
                        onChange={(value) =>
                          updateSiteDetail(
                            "paymentTipLinks",
                            paymentCard.labelField,
                            value,
                          )
                        }
                      />
                      <SettingsInput
                        label="URL or Payment Instructions"
                        value={String(
                          siteDetails.paymentTipLinks[paymentCard.destinationField],
                        )}
                        onChange={(value) =>
                          updateSiteDetail(
                            "paymentTipLinks",
                            paymentCard.destinationField,
                            value,
                          )
                        }
                      />
                      <MediaPathField
                        label="Optional QR Code Image"
                        value={String(
                          siteDetails.paymentTipLinks[paymentCard.qrField],
                        )}
                        onChange={(value) =>
                          updateSiteDetail(
                            "paymentTipLinks",
                            paymentCard.qrField,
                            value,
                          )
                        }
                        placeholder={paymentCard.qrPlaceholder}
                      />
                      <SettingsTextarea
                        label="Short Helper Text"
                        value={String(
                          siteDetails.paymentTipLinks[paymentCard.helperField],
                        )}
                        onChange={(value) =>
                          updateSiteDetail(
                            "paymentTipLinks",
                            paymentCard.helperField,
                            value,
                          )
                        }
                        rows={3}
                      />
                    </div>
                  </article>
                ))}
              </div>
              <SettingsTextarea
                label="Donation Disclosure Text"
                value={siteDetails.paymentTipLinks.donationDisclosureText}
                onChange={(value) =>
                  updateSiteDetail("paymentTipLinks", "donationDisclosureText", value)
                }
                rows={3}
              />
            </SettingsAccordion>

            <SettingsAccordion
              title="Announcement / Popup Settings"
              description="Optional site-wide announcement bar and popup controls."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <SettingsToggle
                  label="Announcement Bar On / Off"
                  checked={siteDetails.announcementPopup.announcementBarEnabled}
                  onChange={(value) =>
                    updateSiteDetail(
                      "announcementPopup",
                      "announcementBarEnabled",
                      value,
                    )
                  }
                />
                <SettingsToggle
                  label="Popup On / Off"
                  checked={siteDetails.announcementPopup.popupEnabled}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "popupEnabled", value)
                  }
                />
                <SettingsInput
                  label="Announcement Bar Text"
                  value={siteDetails.announcementPopup.announcementBarText}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "announcementBarText", value)
                  }
                />
                <SettingsInput
                  label="Announcement Bar CTA Label"
                  value={siteDetails.announcementPopup.announcementBarCtaLabel}
                  onChange={(value) =>
                    updateSiteDetail(
                      "announcementPopup",
                      "announcementBarCtaLabel",
                      value,
                    )
                  }
                />
                <SettingsInput
                  label="Announcement Bar CTA URL"
                  value={siteDetails.announcementPopup.announcementBarCtaUrl}
                  onChange={(value) =>
                    updateSiteDetail(
                      "announcementPopup",
                      "announcementBarCtaUrl",
                      value,
                    )
                  }
                />
                <SettingsInput
                  label="Popup Title"
                  value={siteDetails.announcementPopup.popupTitle}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "popupTitle", value)
                  }
                />
                <SettingsInput
                  label="Popup CTA Label"
                  value={siteDetails.announcementPopup.popupCtaLabel}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "popupCtaLabel", value)
                  }
                />
                <SettingsInput
                  label="Popup CTA URL"
                  value={siteDetails.announcementPopup.popupCtaUrl}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "popupCtaUrl", value)
                  }
                />
                <label className="block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                    Popup Frequency
                  </span>
                  <select
                    value={siteDetails.announcementPopup.popupFrequency}
                    onChange={(event) =>
                      updateSiteDetail(
                        "announcementPopup",
                        "popupFrequency",
                        event.target.value,
                      )
                    }
                    className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none focus:border-gold/70"
                  >
                    <option value="once-per-session">Once per session</option>
                    <option value="once-per-day">Once per day</option>
                    <option value="every-visit">Every visit</option>
                  </select>
                </label>
                <SettingsInput
                  label="Popup Overlay Opacity"
                  value={siteDetails.announcementPopup.popupOverlayOpacity}
                  onChange={(value) =>
                    updateSiteDetail("announcementPopup", "popupOverlayOpacity", value)
                  }
                  placeholder="65"
                />
              </div>
              <SettingsTextarea
                label="Popup Body"
                value={siteDetails.announcementPopup.popupBody}
                onChange={(value) =>
                  updateSiteDetail("announcementPopup", "popupBody", value)
                }
                rows={4}
              />
            </SettingsAccordion>

            <SettingsAccordion
              title="Footer Settings"
              description="Small site-wide footer text without changing the footer design."
            >
              <SettingsTextarea
                label="Footer Short Description"
                value={siteDetails.footer.shortDescription}
                onChange={(value) =>
                  updateSiteDetail("footer", "shortDescription", value)
                }
                rows={2}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <SettingsInput
                  label="Footer Copyright Text"
                  value={siteDetails.footer.copyrightText}
                  onChange={(value) =>
                    updateSiteDetail("footer", "copyrightText", value)
                  }
                />
                <SettingsInput
                  label="Footer Service-Area Text"
                  value={siteDetails.footer.serviceAreaText}
                  onChange={(value) =>
                    updateSiteDetail("footer", "serviceAreaText", value)
                  }
                />
              </div>
              <SettingsTextarea
                label="Footer Donation / Instrument Fund Text"
                value={siteDetails.footer.donationInstrumentFundText}
                onChange={(value) =>
                  updateSiteDetail("footer", "donationInstrumentFundText", value)
                }
                rows={3}
              />
            </SettingsAccordion>

            <SettingsAccordion
              title="Default SEO / Sharing Settings"
              description="Fallback metadata and social sharing fields for future production setup."
            >
              <SettingsInput
                label="Default SEO Title Fallback"
                value={seoSettings.siteTitle}
                onChange={(value) =>
                  setSeoSettings((currentSeo) => ({
                    ...currentSeo,
                    siteTitle: value,
                  }))
                }
              />
              <SettingsTextarea
                label="Default Meta Description Fallback"
                value={seoSettings.defaultMetaDescription}
                onChange={(value) =>
                  setSeoSettings((currentSeo) => ({
                    ...currentSeo,
                    defaultMetaDescription: value,
                  }))
                }
                rows={3}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <MediaPathField
                  label="Default Open Graph Image"
                  value={seoSettings.socialImage}
                  onChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImage: value,
                    }))
                  }
                  placeholder="/media/social-image.jpg"
                  cropValue={seoSettings.socialImagePosition || "50% 35%"}
                  onCropChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImagePosition: value,
                    }))
                  }
                  fitValue={seoSettings.socialImageFit || "cover"}
                  onFitChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImageFit: value,
                    }))
                  }
                  zoomValue={seoSettings.socialImageZoom || 1}
                  onZoomChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImageZoom: value,
                    }))
                  }
                  ratioWidthValue={seoSettings.socialImageCropRatioWidth || 1200}
                  ratioHeightValue={seoSettings.socialImageCropRatioHeight || 630}
                  onRatioChange={(width, height) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImageCropRatioWidth: width,
                      socialImageCropRatioHeight: height,
                    }))
                  }
                  frameWidthValue={seoSettings.socialImageCustomFrameWidth || 1200}
                  frameHeightValue={seoSettings.socialImageCustomFrameHeight || 630}
                  onFrameChange={(width, height) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImageCustomFrameWidth: width,
                      socialImageCustomFrameHeight: height,
                    }))
                  }
                  presetNameValue={
                    seoSettings.socialImageCropPresetName || "Social Card"
                  }
                  onPresetNameChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialImageCropPresetName: value,
                    }))
                  }
                  socialPreview
                />
                <SettingsInput
                  label="Default Social Share Title"
                  value={seoSettings.socialTitle}
                  onChange={(value) =>
                    setSeoSettings((currentSeo) => ({
                      ...currentSeo,
                      socialTitle: value,
                    }))
                  }
                />
              </div>
              <SettingsTextarea
                label="Default Social Share Description"
                value={seoSettings.socialDescription}
                onChange={(value) =>
                  setSeoSettings((currentSeo) => ({
                    ...currentSeo,
                    socialDescription: value,
                  }))
                }
                rows={3}
              />
            </SettingsAccordion>
          </div>
        ) : null}
      </div>
    </section>
  );
}
