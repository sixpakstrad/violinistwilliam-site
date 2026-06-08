"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultDonateContent,
  type DonateContentData,
} from "@/data/donateContent";

function mergeDonateContent(
  content: Partial<DonateContentData>,
): DonateContentData {
  return {
    ...defaultDonateContent,
    ...content,
    intro: { ...defaultDonateContent.intro, ...content.intro },
    primary: { ...defaultDonateContent.primary, ...content.primary },
    support: { ...defaultDonateContent.support, ...content.support },
  };
}

function readDonateContent(): DonateContentData {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.donate);
    return raw
      ? mergeDonateContent(JSON.parse(raw) as Partial<DonateContentData>)
      : defaultDonateContent;
  } catch {
    return defaultDonateContent;
  }
}

export function DonateContent() {
  const [content, setContent] =
    useState<DonateContentData>(defaultDonateContent);

  useEffect(() => {
    setContent(readDonateContent());
  }, []);

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        copy={content.intro.copy}
        titleSize={content.intro.titleSize}
        titleColor={content.intro.titleColor}
        subtitleSize={content.intro.subtitleSize}
        subtitleColor={content.intro.subtitleColor}
      />

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
              {content.primary.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-[1.05] text-ivory text-balance sm:text-5xl">
              {content.primary.title}
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-8 text-ivory-muted">
              {content.primary.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {content.primary.buttonLabel && content.primary.buttonHref ? (
              <Link
                href={content.primary.buttonHref}
                className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
              >
                {content.primary.buttonLabel}
              </Link>
            ) : null}
          </Reveal>

          <Reveal
            delay={0.1}
            className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12"
          >
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
              {content.support.eyebrow}
            </p>
            <div className="grid gap-3">
              {content.support.items.map((area) => (
                <div
                  key={area}
                  className="border border-ivory/10 bg-espresso/45 px-4 py-4 text-sm uppercase tracking-[0.16em] text-ivory-muted"
                >
                  {area}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
