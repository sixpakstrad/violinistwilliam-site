"use client";

import Link from "next/link";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { RepairCareSlideshow } from "@/components/RepairCareSlideshow";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultRepairContent,
  normalizeRepairContentData,
  type RepairContentData,
} from "@/data/repairContent";

function textStyle(size?: string, color?: string): CSSProperties | undefined {
  const style: CSSProperties = {};
  if (size?.trim()) {
    style.fontSize = size.trim();
  }
  if (color?.trim()) {
    style.color = color.trim();
  }

  return Object.keys(style).length ? style : undefined;
}

function readRepairContent() {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.repairs);
    return raw ? normalizeRepairContentData(JSON.parse(raw)) : defaultRepairContent;
  } catch {
    return defaultRepairContent;
  }
}

function ServiceList({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="relative overflow-hidden border border-[#f08a4b]/45 bg-[#2b0d08]/[0.46] p-5 shadow-[0_22px_70px_rgba(33,10,7,0.28)] backdrop-blur-[2px] sm:p-6">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(112,36,24,0.12),transparent_42%)]" />
      {title ? (
        <p className="mb-4 text-xs uppercase tracking-[0.26em] text-[#ff9a56]">
          {title}
        </p>
      ) : null}
      <div className="overflow-hidden border border-[#f08a4b]/35">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="border-b border-[#f08a4b]/25 bg-[#3b120c]/[0.32] px-4 py-3 text-sm leading-6 text-[#f0d8c7] last:border-b-0 odd:bg-[#682315]/[0.24]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      {...(id ? { id } : {})}
      className="relative z-10 scroll-mt-28 overflow-hidden border-t border-[#f08a4b]/35 bg-[#250b07]/[0.34] px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(138,48,32,0.14),transparent_34%),linear-gradient(180deg,rgba(255,217,180,0.035),transparent_28%)]" />
      <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#ff9a56]">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl leading-[1.03] text-[#f7eadc] text-balance sm:text-5xl md:text-6xl">
            {title}
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-[#ead6c4] sm:text-lg">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export function RepairPageContent() {
  const [content, setContent] =
    useState<RepairContentData>(defaultRepairContent);

  useEffect(() => {
    setContent(readRepairContent());

    const syncContent = () => setContent(readRepairContent());
    window.addEventListener("storage", syncContent);
    window.addEventListener("focus", syncContent);

    return () => {
      window.removeEventListener("storage", syncContent);
      window.removeEventListener("focus", syncContent);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#210805] text-[#f7eadc]">
      <img
        src="/media/repair-wood-background.png"
        alt=""
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-[0.78] [filter:contrast(1.2)_saturate(1.12)]"
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_8%,rgba(244,145,91,0.10),transparent_24rem),linear-gradient(180deg,rgba(35,10,6,0.01),rgba(35,10,6,0.08))]" />

      <section className="relative isolate z-10 overflow-hidden border-b border-[#f08a4b]/35 px-5 pb-14 pt-32 sm:px-8 md:px-12 md:pb-16 md:pt-36 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(32,8,5,0.40),rgba(66,20,13,0.24)_48%,rgba(92,30,19,0.10)),radial-gradient(circle_at_82%_20%,rgba(218,124,82,0.12),transparent_30rem)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-[linear-gradient(180deg,transparent,rgba(33,8,5,0.42)_92%)]" />

        <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#ff9a56]">
              {content.hero.eyebrow}
            </p>
            <h1
              className="max-w-4xl font-display text-5xl leading-[0.98] text-[#fff2e2] text-balance sm:text-6xl md:text-8xl"
              style={textStyle(
                content.hero.titleSize,
                content.hero.titleColor,
              )}
            >
              {content.hero.title}
            </h1>
            <p
              className="mt-6 max-w-2xl font-display text-3xl leading-snug text-[#f0d5bf] text-balance sm:text-4xl"
              style={textStyle(
                content.hero.subtitleSize,
                content.hero.subtitleColor,
              )}
            >
              {content.hero.subtitle}
            </p>
          </div>

          <div className="relative overflow-hidden border border-[#f08a4b]/45 bg-[#260b06]/[0.5] p-5 shadow-[0_30px_90px_rgba(23,8,5,0.4)] backdrop-blur-[2px] sm:p-7">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(128,43,29,0.12),transparent_42%)]" />
            <div className="space-y-5 text-base leading-8 text-[#ead6c4] sm:text-lg">
              {content.hero.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact?type=repair"
                className="inline-flex min-h-12 w-full items-center justify-center bg-[#f7eadc] px-7 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#2b1711] transition duration-300 hover:bg-[#ff9a56] sm:w-auto sm:tracking-[0.22em]"
              >
                {content.hero.ctaLabel}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 overflow-hidden border-t border-[#f08a4b]/35 bg-[#210805]/[0.34] px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(214,130,88,0.11),transparent_42%),linear-gradient(180deg,rgba(255,214,176,0.035),transparent_32%)]" />
        <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#ff9a56]">
              {content.bench.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-[1.03] text-[#f7eadc] text-balance sm:text-5xl md:text-6xl">
              {content.bench.title}
            </h2>
          </div>
          <RepairCareSlideshow images={content.slideshowImages} />
        </Reveal>
      </section>

      {content.sections.map((section) =>
        section.id === "who-this-is-for" ? (
          <section
            key={section.id}
            id={section.id}
            className="relative z-10 scroll-mt-28 overflow-hidden border-t border-[#f08a4b]/35 bg-[#3b100a]/[0.34] px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16"
          >
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(214,130,88,0.12),transparent_36%),linear-gradient(180deg,rgba(255,214,176,0.04),transparent_26%)]" />
            <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#ff9a56]">
                  {section.eyebrow}
                </p>
                <h2 className="font-display text-4xl leading-[1.03] text-[#f7eadc] text-balance sm:text-5xl md:text-6xl">
                  {section.title}
                </h2>
              </div>
              <div className="overflow-hidden border border-[#f08a4b]/35 bg-[#260b06]/[0.44] backdrop-blur-[2px]">
                {(section.listItems || []).map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="border-b border-[#f08a4b]/25 px-5 py-3 text-sm leading-7 text-[#f0d8c7] last:border-b-0 odd:bg-[#733427]/20"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        ) : (
          <ServiceSection
            key={section.id}
            id={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
          >
            {section.body.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
            {section.listItems?.length ? (
              <ServiceList title={section.listTitle} items={section.listItems} />
            ) : null}
          </ServiceSection>
        ),
      )}

      <section className="relative z-10 overflow-hidden border-t border-[#f08a4b]/35 bg-[#210805]/[0.36] px-5 py-16 sm:px-8 md:px-12 md:py-20 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,214,176,0.04),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9a56]/80 to-transparent" />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.36em] text-[#ff9a56]">
            {content.finalCta.eyebrow}
          </p>
          <h2 className="font-display text-4xl leading-[1.03] text-[#f7eadc] text-balance sm:text-5xl md:text-6xl">
            {content.finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#ead6c4] sm:text-lg">
            {content.finalCta.body}
          </p>
          <Link
            href="/contact?type=repair"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center bg-[#f7eadc] px-7 text-center text-sm font-medium uppercase tracking-[0.18em] text-[#2b1711] transition duration-300 hover:bg-[#ff9a56] sm:w-auto sm:tracking-[0.22em]"
          >
            {content.finalCta.ctaLabel}
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
