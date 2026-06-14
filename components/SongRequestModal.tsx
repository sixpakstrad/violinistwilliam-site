"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { RepertoireSong } from "@/data/repertoire";
import { songRequestSettings } from "@/data/songRequestSettings";
import { TipModal } from "@/components/TipModal";

type SongRequestModalProps = {
  song: RepertoireSong | null;
  onClose: () => void;
};

function getSongGenres(song: RepertoireSong): string[] {
  const genres = Array.isArray(song.genres)
    ? song.genres.filter(Boolean)
    : [];

  return genres.length > 0 ? genres : [song.genre].filter(Boolean);
}

export function SongRequestModal({ song, onClose }: SongRequestModalProps) {
  const [guestName, setGuestName] = useState("");
  const [review, setReview] = useState("");
  const [reviewMarketingPermission, setReviewMarketingPermission] =
    useState(false);
  const [reviewDisplayName, setReviewDisplayName] = useState("First name only");
  const [submitted, setSubmitted] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [reviewCopied, setReviewCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setGuestName("");
    setReview("");
    setReviewMarketingPermission(false);
    setReviewDisplayName("First name only");
    setSubmitted(false);
    setShowTip(false);
    setReviewCopied(false);
    setIsSaving(false);
    setSaveError("");
  }, [song]);

  const smsHref = useMemo(() => {
    if (!song || !songRequestSettings.smsEnabled || !songRequestSettings.smsPhoneNumber) {
      return "";
    }

    const body = [
      `Song request: ${song.title}`,
      song.artist ? `Artist/composer: ${song.artist}` : "",
      guestName ? `Requested by: ${guestName}` : "",
      review ? `Review: ${review}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `sms:${songRequestSettings.smsPhoneNumber}?&body=${encodeURIComponent(body)}`;
  }, [guestName, review, song]);

  if (!song) {
    return null;
  }

  const saveRequest = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: song.title,
          artist: song.artist,
          source: song.source,
          genre: getSongGenres(song).join(", "),
          guestName,
          review,
          reviewMarketingPermission,
          reviewDisplayName,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to save this request.");
      }

      setSubmitted(true);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Unable to save this request.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const copyReview = async () => {
    if (!review.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(review.trim());
      setReviewCopied(true);
    } catch {
      setReviewCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-ivory/35 px-4 py-4 backdrop-blur-md sm:items-center sm:justify-center">
      <div className="elegant-surface relative w-full max-w-2xl border border-ivory/10 p-5 shadow-candle sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-xs uppercase tracking-[0.22em] text-ivory-muted transition hover:text-ivory"
        >
          Close
        </button>

        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-gold/80">
          Live Song Request
        </p>
        <h3 className="pr-16 font-display text-4xl leading-tight text-ivory sm:text-5xl">
          {song.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-ivory-muted">
          {[song.artist, song.source, getSongGenres(song).join(", ")]
            .filter(Boolean)
            .join(" / ")}
        </p>

        {submitted ? (
          <div className="mt-8 space-y-4">
            <div className="border border-gold/25 bg-gold/10 p-5 text-ivory-muted">
              <p className="font-display text-3xl text-ivory">Request added.</p>
              <p className="mt-3 text-sm leading-7">
                This song is now saved to William&apos;s private event request
                board.
              </p>
            </div>

            {review.trim() ? (
              <div className="border border-ivory/10 bg-linen/55 p-5 text-ivory-muted">
                <p className="text-xs uppercase tracking-[0.26em] text-gold/80">
                  Share on Google
                </p>
                <p className="mt-3 text-sm leading-7">
                  Thank you for the review. Would you also be willing to share
                  it on Google?
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={copyReview}
                    className="inline-flex min-h-11 items-center justify-center border border-gold/35 px-4 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/10"
                  >
                    {reviewCopied ? "Review Copied" : "Copy My Review"}
                  </button>
                  {songRequestSettings.googleReviewUrl ? (
                    <a
                      href={songRequestSettings.googleReviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center bg-ivory px-4 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold"
                    >
                      Open Google Review Page
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex min-h-11 cursor-not-allowed items-center justify-center border border-ivory/10 px-4 text-xs font-medium uppercase tracking-[0.18em] text-smoke-brown"
                    >
                      Google Link Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            <label className="block max-w-md">
              <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                Your Name (optional)
              </span>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                placeholder="Optional"
                className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/40 focus:border-gold/70"
              />
            </label>
            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
                Leave a Review
              </span>
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows={4}
                placeholder="What did you love about the performance?"
                className="w-full resize-none border border-ivory/10 bg-espresso/45 px-4 py-4 text-ivory outline-none transition placeholder:text-ivory-muted/40 focus:border-gold/70"
              />
            </label>
            <div className="grid gap-4 border border-ivory/10 bg-linen/45 p-4 sm:grid-cols-[1fr_13rem]">
              <label className="flex gap-3 text-sm leading-7 text-ivory-muted">
                <input
                  type="checkbox"
                  checked={reviewMarketingPermission}
                  onChange={(event) =>
                    setReviewMarketingPermission(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-gold"
                />
                <span>
                  William may use this review on his website, social media, and
                  marketing materials.
                </span>
              </label>
              <label className="block">
                <span className="mb-3 block text-xs uppercase tracking-[0.18em] text-gold/80">
                  Credit As
                </span>
                <select
                  value={reviewDisplayName}
                  onChange={(event) => setReviewDisplayName(event.target.value)}
                  className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-sm text-ivory outline-none transition focus:border-gold/70"
                >
                  <option>First name only</option>
                  <option>Full name</option>
                  <option>Anonymous</option>
                </select>
              </label>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {!submitted ? (
            <button
              type="button"
              onClick={saveRequest}
              disabled={isSaving}
              className="inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-sm font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Add Request"}
            </button>
          ) : null}
          {submitted ? (
            <>
              <button
                type="button"
                onClick={() => setShowTip(true)}
                className="inline-flex min-h-12 items-center justify-center border border-gold/35 bg-ivory/70 px-6 text-sm font-medium uppercase tracking-[0.2em] text-espresso shadow-[0_0_24px_rgba(167,127,63,0.13)] transition hover:border-gold/60 hover:bg-ivory"
              >
                Add Tip
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center border border-gold/25 bg-ivory/70 px-6 text-sm font-medium uppercase tracking-[0.2em] text-espresso/75 transition hover:border-gold/45 hover:bg-ivory hover:text-espresso"
              >
                Close
              </button>
              <Link
                href="/about#bio"
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center border border-gold/25 bg-ivory/70 px-6 text-sm font-medium uppercase tracking-[0.2em] text-espresso/75 transition hover:border-gold/45 hover:bg-ivory hover:text-espresso"
              >
                Meet Will
              </Link>
            </>
          ) : null}
          {smsHref ? (
            <a
              href={smsHref}
              className="inline-flex min-h-12 items-center justify-center border border-gold/35 px-6 text-sm font-medium uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:bg-gold/10"
            >
              Text William
            </a>
          ) : null}
        </div>
        {saveError ? (
          <p className="mt-4 text-sm leading-7 text-gold">{saveError}</p>
        ) : null}
      </div>

      <TipModal isOpen={showTip} onClose={() => setShowTip(false)} />
    </div>
  );
}
