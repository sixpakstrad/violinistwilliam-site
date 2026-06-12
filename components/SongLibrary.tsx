"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { adminStorageKeys } from "@/data/adminContent";
import { repertoireGenres, repertoireSongs } from "@/data/repertoire";
import type { RepertoireSong } from "@/data/repertoire";
import { readRequestsEnabled } from "@/data/songRequests";
import { songRequestSettings } from "@/data/songRequestSettings";
import { SongRequestModal } from "@/components/SongRequestModal";
import { TipModal } from "@/components/TipModal";

type GenreFilter = "All" | (typeof repertoireGenres)[number];
type NoteFilter = "All" | "Wedding" | "Funeral" | "Party" | "Favorite";
type StoredRepertoireSong = RepertoireSong & { recommended?: boolean };
type SongsPerPage = 25 | 50 | 100;

const songsPerPageOptions: SongsPerPage[] = [25, 50, 100];

function getSongGenres(song: RepertoireSong): string[] {
  const genres = Array.isArray(song.genres)
    ? song.genres.filter(Boolean)
    : [];

  return genres.length > 0 ? genres : [song.genre].filter(Boolean);
}

function normalizeSong(song: StoredRepertoireSong): RepertoireSong {
  const genres = Array.isArray(song.genres)
    ? song.genres.filter(Boolean)
    : [song.genre || "Pop"];

  return {
    ...song,
    genre: genres[0] || song.genre || "Pop",
    genres,
    notes: song.notes || "",
    sheetMusic: song.sheetMusic || "",
    backingTrack: song.backingTrack || "",
    url: song.url || "",
    weddingRecommended: song.weddingRecommended ?? song.recommended ?? false,
    funeralRecommended: song.funeralRecommended ?? false,
    partyRecommended: song.partyRecommended ?? false,
    favoriteRecommended: song.favoriteRecommended ?? false,
    extraCharge: song.extraCharge ?? false,
  };
}

function getSongKey(song: RepertoireSong, index: number) {
  return `${song.title}-${song.artist}-${song.source}-${index}`;
}

function getSongTags(song: RepertoireSong) {
  return [
    song.weddingRecommended ? "Wedding" : "",
    song.funeralRecommended ? "Funeral" : "",
    song.partyRecommended ? "Party" : "",
    song.favoriteRecommended ? "Favorite" : "",
    song.extraCharge ? "Fee required" : "",
  ].filter(Boolean);
}

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage]);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)
    .reduce<(number | "ellipsis")[]>((items, page, index, sortedPages) => {
      if (index > 0 && page - sortedPages[index - 1] > 1) {
        items.push("ellipsis");
      }

      items.push(page);
      return items;
    }, []);
}

export function SongLibrary() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<GenreFilter>("All");
  const [noteFilter, setNoteFilter] = useState<NoteFilter>("All");
  const [selectedSong, setSelectedSong] = useState<RepertoireSong | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [songs, setSongs] = useState<RepertoireSong[]>(repertoireSongs);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState<SongsPerPage>(50);
  const [expandedMobileSong, setExpandedMobileSong] = useState("");
  const [studentInstrumentFundUrl, setStudentInstrumentFundUrl] = useState<string>(
    songRequestSettings.studentInstrumentFundUrl,
  );
  const [showStudentInstrumentFund, setShowStudentInstrumentFund] =
    useState(true);
  const [requestsEnabled, setRequestsEnabled] = useState<boolean>(
    songRequestSettings.enabled,
  );

  useEffect(() => {
    const syncRequestsEnabled = () => setRequestsEnabled(readRequestsEnabled());

    syncRequestsEnabled();
    window.addEventListener("storage", syncRequestsEnabled);
    window.addEventListener("focus", syncRequestsEnabled);

    return () => {
      window.removeEventListener("storage", syncRequestsEnabled);
      window.removeEventListener("focus", syncRequestsEnabled);
    };
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(adminStorageKeys.songs);
      if (raw) {
        setSongs((JSON.parse(raw) as StoredRepertoireSong[]).map(normalizeSong));
      }

      setStudentInstrumentFundUrl(
        songRequestSettings.studentInstrumentFundUrl,
      );
      setShowStudentInstrumentFund(true);
    } catch {
      setSongs(repertoireSongs);
      setStudentInstrumentFundUrl(songRequestSettings.studentInstrumentFundUrl);
      setShowStudentInstrumentFund(true);
    }
  }, []);

  const filteredSongs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return songs.filter((song) => {
      const searchable = [
        song.title,
        song.artist,
        song.source,
        song.genre,
        ...getSongGenres(song),
        song.weddingRecommended ? "wedding recommended" : "",
        song.funeralRecommended ? "funeral memorial celebration of life recommended" : "",
        song.partyRecommended ? "party reception celebration upbeat recommended" : "",
        song.favoriteRecommended ? "will favorite favorite recommended" : "",
        song.extraCharge ? "extra charge arrangement" : "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = searchable.includes(normalizedQuery);
      const matchesGenre =
        genre === "All" || getSongGenres(song).includes(genre);
      const matchesNotes =
        noteFilter === "All" ||
        (noteFilter === "Wedding" && song.weddingRecommended) ||
        (noteFilter === "Funeral" && song.funeralRecommended) ||
        (noteFilter === "Party" && song.partyRecommended) ||
        (noteFilter === "Favorite" && song.favoriteRecommended);

      return matchesQuery && matchesGenre && matchesNotes;
    });
  }, [genre, noteFilter, query, songs]);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedMobileSong("");
  }, [genre, noteFilter, query, songsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredSongs.length / songsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = filteredSongs.length
    ? (safeCurrentPage - 1) * songsPerPage
    : 0;
  const pageEnd = Math.min(pageStart + songsPerPage, filteredSongs.length);
  const paginatedSongs = filteredSongs.slice(pageStart, pageEnd);
  const hasActiveFilters = Boolean(query.trim()) || genre !== "All" || noteFilter !== "All";
  const resultLabel = hasActiveFilters ? "matching songs" : "songs";

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    setExpandedMobileSong("");
  };

  const PaginationControls = ({ placement }: { placement: "top" | "bottom" }) => (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
        placement === "bottom" ? "mt-6" : ""
      }`}
    >
      <div className="text-sm text-[#4f463d]">
        {filteredSongs.length > 0 ? (
          <p>
            Showing{" "}
            <span className="font-medium text-gold">
              {pageStart + 1}–{pageEnd}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gold">{filteredSongs.length}</span>{" "}
            {resultLabel}
          </p>
        ) : (
          <p>
            Showing <span className="font-medium text-gold">0</span> of{" "}
            <span className="font-medium text-gold">{songs.length}</span> songs
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <label className="flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-[#5b5046] sm:justify-start">
          Songs per page
          <select
            value={songsPerPage}
            onChange={(event) =>
              setSongsPerPage(Number(event.target.value) as SongsPerPage)
            }
            className="min-h-10 border border-ivory/10 bg-espresso/55 px-3 text-sm normal-case tracking-normal text-ivory outline-none transition focus:border-gold/70"
          >
            {songsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => goToPage(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1 || filteredSongs.length === 0}
            className="inline-flex min-h-11 flex-1 items-center justify-center border border-gold/45 px-4 text-xs font-medium uppercase tracking-[0.14em] text-[#4f463d] transition hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:border-smoke-brown/25 disabled:text-smoke-brown/55 sm:flex-none"
          >
            Previous
          </button>

          <span className="min-w-[7.5rem] text-center text-xs uppercase tracking-[0.16em] text-[#5b5046] md:hidden">
            Page {safeCurrentPage} of {totalPages}
          </span>

          <div className="hidden items-center gap-1 md:flex">
            {getPaginationItems(safeCurrentPage, totalPages).map((item, index) => {
              if (item === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-sm text-[#6a5f53]"
                  >
                    …
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  className={`inline-flex h-10 min-w-10 items-center justify-center border px-3 text-sm transition ${
                    item === safeCurrentPage
                      ? "border-gold bg-gold text-espresso"
                      : "border-ivory/10 bg-espresso/35 text-[#4f463d] hover:border-gold/65 hover:bg-gold/10"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToPage(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages || filteredSongs.length === 0}
            className="inline-flex min-h-11 flex-1 items-center justify-center border border-gold/45 px-4 text-xs font-medium uppercase tracking-[0.14em] text-[#4f463d] transition hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:border-smoke-brown/25 disabled:text-smoke-brown/55 sm:flex-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="songs"
      className="relative overflow-hidden px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16"
    >
      <div className="absolute inset-x-0 top-0 h-px candleline opacity-45" />
      <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-ivory/[0.04] blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              Repertoire
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
              Browse the full song list without the clutter.
            </h2>
          </div>
          <div className="max-w-2xl text-base leading-8 text-[#5b5046] sm:text-lg lg:justify-self-end">
            <p>
              Use the filters to find ceremony favorites, pop selections,
              movie music, classical repertoire, holiday music, and songs that
              may require an arrangement fee.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#6a5f53]">
              Categories show whether a piece is especially suited
              for weddings, funerals, parties, or none of those settings. Fee
              indicates a custom arrangement or extra charge.
            </p>
            {requestsEnabled ? (
              <p className="mt-3 text-sm leading-7 text-gold">
                Live song requests are currently open.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-7 text-[#6a5f53]">
                Live song requests are currently paused.
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setShowTip(true)}
                className="inline-flex min-h-12 items-center justify-center bg-ivory px-5 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
              >
                Leave a Tip
              </button>
              {showStudentInstrumentFund ? (
                <a
                  href={studentInstrumentFundUrl}
                  className="inline-flex min-h-12 items-center justify-center border border-gold/45 bg-linen/70 px-5 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-champagne/20"
                >
                  Learn About William&apos;s Student Instrument Loan Program
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="elegant-surface grid gap-4 border border-ivory/10 p-4 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                Search
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Song title, artist, movie, show, genre"
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-base text-ivory outline-none transition placeholder:text-[#8a7b6c] focus:border-gold/70"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                Genre
              </span>
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value as GenreFilter)}
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-base text-ivory outline-none transition focus:border-gold/70"
              >
                <option value="All">All genres</option>
                {repertoireGenres.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                Category
              </span>
              <select
                value={noteFilter}
                onChange={(event) =>
                  setNoteFilter(event.target.value as NoteFilter)
                }
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-base text-ivory outline-none transition focus:border-gold/70"
              >
                <option value="All">All songs</option>
                <option value="Wedding">Wedding recommended</option>
                <option value="Funeral">Funeral recommended</option>
                <option value="Party">Party recommended</option>
                <option value="Favorite">Will&apos;s Favorites</option>
              </select>
            </label>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="mt-8">
          <div className="mb-4">
            <PaginationControls placement="top" />
          </div>

          <div className="hidden border border-ivory/10 shadow-[0_24px_70px_rgba(47,41,35,0.16)] md:block">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-charcoal-brown text-[0.68rem] uppercase tracking-[0.22em] text-gold">
                <tr>
                  <th className="px-5 py-4 font-medium">Song Title</th>
                  <th className="px-5 py-4 font-medium">Artist / Composer</th>
                  <th className="px-5 py-4 font-medium">Movie / Show</th>
                  <th className="px-5 py-4 font-medium">Genre</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Request</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSongs.map((song, index) => {
                  const liveRequestUnavailable = song.extraCharge;

                  return (
                    <tr
                      key={getSongKey(song, pageStart + index)}
                      className={
                        liveRequestUnavailable
                          ? "bg-smoke-brown/20 opacity-60"
                          : "odd:bg-ivory/[0.045] even:bg-espresso/45"
                      }
                    >
                    <td className="border-t border-ivory/10 px-5 py-4 font-display text-2xl leading-tight text-ivory">
                      {song.title}
                    </td>
                    <td className="border-t border-ivory/10 px-5 py-4 text-sm leading-6 text-[#5b5046]">
                      {song.artist || "—"}
                    </td>
                    <td className="border-t border-ivory/10 px-5 py-4 text-sm leading-6 text-[#5b5046]">
                      {song.source || "—"}
                    </td>
                    <td className="border-t border-ivory/10 px-5 py-4 text-sm leading-6 text-[#5b5046]">
                      {getSongGenres(song).join(", ")}
                    </td>
                    <td className="border-t border-ivory/10 px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {song.weddingRecommended ? (
                          <span className="border border-gold bg-smoke-brown/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#5b5046]">
                            Wedding
                          </span>
                        ) : null}
                        {song.funeralRecommended ? (
                          <span className="border border-smoke-brown/35 bg-smoke-brown/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#5b5046]">
                            Funeral
                          </span>
                        ) : null}
                        {song.partyRecommended ? (
                          <span className="border border-gold bg-smoke-brown/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#5b5046]">
                            Party
                          </span>
                        ) : null}
                        {song.favoriteRecommended ? (
                          <span className="border border-gold bg-smoke-brown/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#5b5046]">
                            Favorite
                          </span>
                        ) : null}
                        {song.extraCharge ? (
                          <span className="border border-smoke-brown/35 bg-smoke-brown/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[#5b5046]">
                            Fee required
                          </span>
                        ) : null}
                        {!song.weddingRecommended &&
                        !song.funeralRecommended &&
                        !song.partyRecommended &&
                        !song.favoriteRecommended &&
                        !song.extraCharge ? (
                          <span className="text-sm text-[#6a5f53]">—</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="border-t border-ivory/10 px-5 py-4">
                      {liveRequestUnavailable ? (
                        <span className="inline-flex min-h-10 items-center justify-center border border-smoke-brown/30 bg-smoke-brown/10 px-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#5b5046]">
                          Fee required
                        </span>
                      ) : requestsEnabled ? (
                        <button
                          type="button"
                          onClick={() => setSelectedSong(song)}
                          className="inline-flex min-h-10 items-center justify-center border border-gold/45 px-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#4f463d] transition hover:border-gold hover:bg-gold/10 hover:text-ivory"
                        >
                          Request
                        </button>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.18em] text-[#6a5f53]">
                          Paused
                        </span>
                      )}
                    </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {paginatedSongs.map((song, index) => {
              const songKey = getSongKey(song, pageStart + index);
              const isExpanded = expandedMobileSong === songKey;
              const liveRequestUnavailable = song.extraCharge;
              const visibleTags = getSongTags(song).slice(0, 3);

              return (
                <article
                  key={songKey}
                  className={`border border-ivory/10 p-4 shadow-[0_18px_45px_rgba(47,41,35,0.12)] ${
                    liveRequestUnavailable
                      ? "bg-smoke-brown/20 opacity-70"
                      : "bg-espresso/55"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-2xl leading-tight text-ivory">
                        {song.title}
                      </h3>
                      {song.artist ? (
                        <p className="mt-1 text-sm leading-6 text-[#5b5046]">
                          {song.artist}
                        </p>
                      ) : null}
                    </div>
                    <div className="shrink-0">
                      {liveRequestUnavailable ? (
                        <span className="inline-flex min-h-10 items-center justify-center border border-smoke-brown/30 bg-smoke-brown/10 px-3 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-[#5b5046]">
                          Fee required
                        </span>
                      ) : requestsEnabled ? (
                        <button
                          type="button"
                          onClick={() => setSelectedSong(song)}
                          className="inline-flex min-h-10 items-center justify-center border border-gold/55 px-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#4f463d] transition hover:border-gold hover:bg-gold/10"
                        >
                          Request
                        </button>
                      ) : (
                        <span className="inline-flex min-h-10 items-center justify-center text-[0.68rem] uppercase tracking-[0.14em] text-[#6a5f53]">
                          Paused
                        </span>
                      )}
                    </div>
                  </div>

                  {visibleTags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {visibleTags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-gold/55 bg-smoke-brown/10 px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-[#5b5046]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setExpandedMobileSong(isExpanded ? "" : songKey)}
                    className="mt-4 inline-flex min-h-10 w-full items-center justify-between border border-ivory/10 bg-ivory/[0.035] px-3 text-xs font-medium uppercase tracking-[0.16em] text-[#4f463d]"
                  >
                    Details
                    <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded ? (
                    <div className="mt-4 grid gap-3 border-t border-ivory/10 pt-4 text-sm leading-6 text-[#5b5046]">
                      <p>
                        <span className="text-xs uppercase tracking-[0.16em] text-gold">
                          Movie / Show
                        </span>
                        <br />
                        {song.source || "—"}
                      </p>
                      <p>
                        <span className="text-xs uppercase tracking-[0.16em] text-gold">
                          Genre
                        </span>
                        <br />
                        {getSongGenres(song).join(", ")}
                      </p>
                      <p>
                        <span className="text-xs uppercase tracking-[0.16em] text-gold">
                          Category
                        </span>
                        <br />
                        {getSongTags(song).join(", ") || "—"}
                      </p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          {filteredSongs.length === 0 ? (
            <div className="mt-8 border border-ivory/10 bg-ivory/[0.035] p-8 text-center text-ivory-muted">
              No songs found for that search or filter.
            </div>
          ) : null}

          {filteredSongs.length > 0 ? <PaginationControls placement="bottom" /> : null}
        </Reveal>
      </div>
      <SongRequestModal
        song={selectedSong}
        onClose={() => setSelectedSong(null)}
      />
      <TipModal isOpen={showTip} onClose={() => setShowTip(false)} />
    </section>
  );
}
