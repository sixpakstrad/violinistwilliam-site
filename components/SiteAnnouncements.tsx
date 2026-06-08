"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
  type SiteDetails,
} from "@/data/adminContent";

function readGlobalSettings() {
  try {
    const stored = window.localStorage.getItem(adminStorageKeys.siteDetails);
    return normalizeSiteDetails(stored ? JSON.parse(stored) : defaultSiteDetails);
  } catch {
    return defaultSiteDetails;
  }
}

function shouldShowPopup(settings: SiteDetails) {
  const popup = settings.announcementPopup;

  if (!popup.popupEnabled || (!popup.popupTitle && !popup.popupBody)) {
    return false;
  }

  try {
    if (popup.popupFrequency === "every-visit") {
      return true;
    }

    if (popup.popupFrequency === "once-per-session") {
      return window.sessionStorage.getItem("winspiration.popup.seen") !== "true";
    }

    const today = new Date().toISOString().slice(0, 10);
    return window.localStorage.getItem("winspiration.popup.seenDate") !== today;
  } catch {
    return true;
  }
}

function markPopupSeen(settings: SiteDetails) {
  try {
    if (settings.announcementPopup.popupFrequency === "once-per-session") {
      window.sessionStorage.setItem("winspiration.popup.seen", "true");
    }

    if (settings.announcementPopup.popupFrequency === "once-per-day") {
      window.localStorage.setItem(
        "winspiration.popup.seenDate",
        new Date().toISOString().slice(0, 10),
      );
    }
  } catch {
    // If storage is unavailable, closing the popup should still work.
  }
}

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function SiteAnnouncements() {
  const [settings, setSettings] = useState<SiteDetails>(defaultSiteDetails);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const nextSettings = readGlobalSettings();
    setSettings(nextSettings);
    setShowPopup(shouldShowPopup(nextSettings));
  }, []);

  const popupOverlayOpacity = useMemo(() => {
    const parsed = Number(settings.announcementPopup.popupOverlayOpacity);
    const safeValue = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 95) : 65;
    return safeValue / 100;
  }, [settings.announcementPopup.popupOverlayOpacity]);

  const closePopup = () => {
    markPopupSeen(settings);
    setShowPopup(false);
  };

  const announcement = settings.announcementPopup;
  const hasAnnouncement =
    announcement.announcementBarEnabled && announcement.announcementBarText.trim();
  const hasAnnouncementCta =
    announcement.announcementBarCtaLabel.trim() &&
    announcement.announcementBarCtaUrl.trim();
  const hasPopupCta =
    announcement.popupCtaLabel.trim() && announcement.popupCtaUrl.trim();

  return (
    <>
      {hasAnnouncement ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-espresso/85 px-5 py-3 text-center text-sm text-ivory shadow-candle backdrop-blur-xl">
          <span>{announcement.announcementBarText}</span>
          {hasAnnouncementCta ? (
            <Link
              href={announcement.announcementBarCtaUrl}
              className="ml-3 inline-flex text-xs uppercase tracking-[0.18em] text-gold underline-offset-4 hover:underline"
            >
              {announcement.announcementBarCtaLabel}
            </Link>
          ) : null}
        </div>
      ) : null}

      {showPopup ? (
        <div
          className="fixed inset-0 z-[95] flex items-end px-4 py-4 sm:items-center sm:justify-center"
          style={{ backgroundColor: `rgba(22, 17, 13, ${popupOverlayOpacity})` }}
        >
          <div className="elegant-surface w-full max-w-lg border border-gold/20 p-6 shadow-candle sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold/80">
                  Announcement
                </p>
                {announcement.popupTitle ? (
                  <h2 className="font-display text-4xl leading-tight text-ivory">
                    {announcement.popupTitle}
                  </h2>
                ) : null}
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="text-xs uppercase tracking-[0.2em] text-ivory-muted transition hover:text-ivory"
              >
                Close
              </button>
            </div>
            {announcement.popupBody ? (
              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-ivory-muted">
                {announcement.popupBody}
              </p>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {hasPopupCta ? (
                <Link
                  href={announcement.popupCtaUrl}
                  target={
                    isExternalHref(announcement.popupCtaUrl) ? "_blank" : undefined
                  }
                  rel={
                    isExternalHref(announcement.popupCtaUrl) ? "noreferrer" : undefined
                  }
                  onClick={closePopup}
                  className="inline-flex min-h-12 flex-1 items-center justify-center bg-ivory px-6 text-sm font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
                >
                  {announcement.popupCtaLabel}
                </Link>
              ) : null}
              <button
                type="button"
                onClick={closePopup}
                className="inline-flex min-h-12 flex-1 items-center justify-center border border-gold/35 px-6 text-sm font-medium uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:bg-gold/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
