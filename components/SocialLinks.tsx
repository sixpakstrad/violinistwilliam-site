"use client";

import { useEffect, useState } from "react";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
} from "@/data/adminContent";

export type SocialLink = {
  label: string;
  href: string;
};

export const socialMediaLinks: SocialLink[] = [
  { label: "YouTube", href: "https://www.youtube.com/@williamsamorey" },
  { label: "Instagram", href: "https://www.instagram.com/violinist_william" },
  { label: "Facebook", href: "https://www.facebook.com/violinistwilliam/" },
];

function SocialIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31.3 31.3 0 0 0 2 12a31.3 31.3 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 22 12a31.3 31.3 0 0 0-.4-4.8ZM10 15.4V8.6l5.8 3.4L10 15.4Z"
        />
      </svg>
    );
  }

  if (normalizedLabel.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm4.8-2.9a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M14 8.2V6.6c0-.8.5-1 1-1h2V2.2L14.2 2C11.4 2 10 3.7 10 6.3v1.9H7v3.7h3V22h4V11.9h2.9l.5-3.7H14Z"
      />
    </svg>
  );
}

function publicSocialLinks(links: SocialLink[]) {
  return links.filter((link) => !link.href.includes("winspirationstudio.com"));
}

function readStoredSocialLinks() {
  try {
    const stored = window.localStorage.getItem(adminStorageKeys.siteDetails);
    const details = normalizeSiteDetails(
      stored ? JSON.parse(stored) : defaultSiteDetails,
    );

    return [
      { label: "YouTube", href: details.socialReviewLinks.youtube },
      { label: "Instagram", href: details.socialReviewLinks.instagram },
      { label: "Facebook", href: details.socialReviewLinks.facebook },
      { label: "TikTok", href: details.socialReviewLinks.tiktok },
    ].filter((link) => link.href);
  } catch {
    return socialMediaLinks;
  }
}

function useResolvedSocialLinks(links?: SocialLink[]) {
  const [resolvedLinks, setResolvedLinks] = useState(links ?? socialMediaLinks);

  useEffect(() => {
    setResolvedLinks(links ?? readStoredSocialLinks());
  }, [links]);

  return resolvedLinks;
}

export function SocialIconLinks({
  links,
  className = "",
}: {
  links?: SocialLink[];
  className?: string;
}) {
  const resolvedLinks = useResolvedSocialLinks(links);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {publicSocialLinks(resolvedLinks).map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold transition hover:border-gold hover:bg-gold hover:text-espresso"
        >
          <SocialIcon label={link.label} />
        </a>
      ))}
    </div>
  );
}

export function SocialTextLinks({
  links,
}: {
  links?: SocialLink[];
}) {
  const resolvedLinks = useResolvedSocialLinks(links);

  return (
    <div className="flex flex-wrap gap-3">
      {publicSocialLinks(resolvedLinks).map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="border border-[#d07435] bg-[#d07435] px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#fffaf3] shadow-[0_18px_50px_rgba(208,116,53,0.24)] transition hover:border-[#f08a4b] hover:bg-[#f08a4b] hover:text-[#2f2923]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
