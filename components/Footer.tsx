"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SocialIconLinks } from "@/components/SocialLinks";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
} from "@/data/adminContent";

export function Footer() {
  const [siteDetails, setSiteDetails] = useState(defaultSiteDetails);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(adminStorageKeys.siteDetails);
      setSiteDetails(
        normalizeSiteDetails(stored ? JSON.parse(stored) : defaultSiteDetails),
      );
    } catch {
      setSiteDetails(defaultSiteDetails);
    }
  }, []);

  const socialLinks = useMemo(
    () =>
      [
        { label: "YouTube", href: siteDetails.socialReviewLinks.youtube },
        { label: "Instagram", href: siteDetails.socialReviewLinks.instagram },
        { label: "Facebook", href: siteDetails.socialReviewLinks.facebook },
        { label: "TikTok", href: siteDetails.socialReviewLinks.tiktok },
      ].filter((link) => link.href),
    [siteDetails.socialReviewLinks],
  );
  const brandName =
    siteDetails.businessIdentity.ownerPerformerName ||
    siteDetails.businessIdentity.publicBrandName;
  const instrumentLoanHref = "/about#instrument-loans";
  const instrumentLoanPrompt =
    siteDetails.footer.donationInstrumentFundText.trim() ||
    "Learn about the student instrument loan program and how quality instruments help young musicians grow.";

  return (
    <footer className="border-t border-ivory/10 px-5 py-10 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-6 text-center text-sm text-ivory-muted lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
          <img src="/media/ws-monogram.png" alt="" className="h-14 w-auto opacity-80" />
          <div className="text-center sm:text-left">
            <p className="font-script text-4xl leading-none text-ivory">
              {brandName}
            </p>
            <p className="mt-2">{siteDetails.footer.shortDescription}</p>
            {siteDetails.footer.serviceAreaText ? (
              <p className="mt-1 text-xs">{siteDetails.footer.serviceAreaText}</p>
            ) : null}
          </div>
        </div>
        <SocialIconLinks links={socialLinks} className="lg:justify-center" />
        <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
          <p>{siteDetails.footer.copyrightText}</p>
          <Link
            href="/admin"
            className="inline-block text-[0.62rem] uppercase tracking-[0.18em] text-ivory-muted/55 transition hover:text-gold"
          >
            Admin
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-4xl border-t border-gold/25 pt-6 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">
          Student Instrument Loan Program
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ivory-muted">
          {instrumentLoanPrompt}
        </p>
        <Link
          href={instrumentLoanHref}
          className="mt-4 inline-flex min-h-10 items-center justify-center border border-gold/70 bg-gold px-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold/90"
        >
          Learn About the Instrument Loan Program
        </Link>
      </div>
    </footer>
  );
}
