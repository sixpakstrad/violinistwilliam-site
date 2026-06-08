"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultAboutContent,
  type AboutContentData,
  type AboutPhoto,
} from "@/data/aboutContent";

function mergeAboutContent(content: Partial<AboutContentData>): AboutContentData {
  const instrumentLoan = {
    ...defaultAboutContent.instrumentLoan,
    ...content.instrumentLoan,
  };
  const paymentLikeCta =
    instrumentLoan.buttonHref.includes("/donate") ||
    instrumentLoan.buttonLabel.toLowerCase().includes("donate");
  if (paymentLikeCta) {
    instrumentLoan.buttonLabel = defaultAboutContent.instrumentLoan.buttonLabel;
    instrumentLoan.buttonHref = defaultAboutContent.instrumentLoan.buttonHref;
  }
  if (instrumentLoan.linkText.toLowerCase().includes("larger gift")) {
    instrumentLoan.linkText = defaultAboutContent.instrumentLoan.linkText;
  }

  return {
    ...defaultAboutContent,
    ...content,
    intro: { ...defaultAboutContent.intro, ...content.intro },
    portrait: { ...defaultAboutContent.portrait, ...content.portrait },
    bio: { ...defaultAboutContent.bio, ...content.bio },
    instrumentLoan,
    photos: content.photos || defaultAboutContent.photos,
  };
}

function readAboutContent(): AboutContentData {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.about);
    return raw
      ? mergeAboutContent(JSON.parse(raw) as Partial<AboutContentData>)
      : defaultAboutContent;
  } catch {
    return defaultAboutContent;
  }
}

function imageFit(value?: string) {
  return value === "cover" ? "cover" : "contain";
}

function imageScale(value?: number) {
  return Number.isFinite(value) && value && value > 0 ? value : 1;
}

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

function ExtraPhoto({ photo }: { photo: AboutPhoto }) {
  return (
    <figure className="photo-depth relative min-h-[18rem] overflow-hidden bg-charcoal-brown sm:min-h-[24rem]">
      <img
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 h-full w-full"
        style={{
          objectFit: imageFit(photo.fit),
          objectPosition: photo.position || "center",
          transform: `scale(${imageScale(photo.zoom)})`,
          transformOrigin: photo.position || "center",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,41,35,0.04),rgba(47,41,35,0.38))]" />
      {photo.alt ? (
        <figcaption className="absolute bottom-5 left-5 right-5 border-t border-linen/25 pt-4 text-[0.64rem] uppercase tracking-[0.22em] text-linen/85">
          {photo.alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function AboutContent() {
  const [content, setContent] = useState<AboutContentData>(defaultAboutContent);

  useEffect(() => {
    setContent(readAboutContent());
  }, []);

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <section className="relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 md:px-12 md:pb-12 md:pt-32 lg:px-16">
        <div className="absolute inset-x-0 bottom-0 h-px candleline opacity-60" />
        <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="text-xs uppercase tracking-[0.34em] text-bronze-soft">
            {content.intro.eyebrow}
          </p>
          <div>
            <h1
              className="max-w-5xl font-display text-4xl leading-[1.04] text-ivory text-balance sm:text-5xl md:text-6xl"
              style={textStyle(
                content.intro.titleSize,
                content.intro.titleColor,
              )}
            >
              {content.intro.title}
            </h1>
            {content.intro.copy ? (
              <p
                className="mt-5 max-w-2xl text-base leading-8 text-ivory-muted"
                style={textStyle(
                  content.intro.subtitleSize,
                  content.intro.subtitleColor,
                )}
              >
                {content.intro.copy}
              </p>
            ) : null}
          </div>
        </Reveal>
      </section>

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <Reveal className="photo-depth relative min-h-[28rem] overflow-hidden bg-charcoal-brown sm:min-h-[34rem] lg:sticky lg:top-28">
            <img
              src={content.portrait.src}
              alt={content.portrait.alt}
              className="absolute inset-0 h-full w-full p-3 sm:p-4"
              style={{
                objectFit: imageFit(content.portrait.fit),
                objectPosition: content.portrait.position || "center",
                transform: `scale(${imageScale(content.portrait.zoom)})`,
                transformOrigin: content.portrait.position || "center",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,41,35,0.04),rgba(47,41,35,0.50))]" />
            <div className="absolute bottom-8 left-8 right-8 border-t border-linen/25 pt-5 text-[0.68rem] uppercase tracking-[0.3em] text-linen/85">
              {content.portrait.caption}
            </div>
          </Reveal>

          <div className="space-y-8">
            <div id="bio" className="scroll-mt-28">
              <Reveal
                delay={0.12}
                className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12"
              >
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
                  {content.bio.eyebrow}
                </p>
                <div className="space-y-6 text-lg leading-8 text-ivory-muted">
                  {content.bio.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {content.bio.finalNote ? (
                    <p className="italic">{content.bio.finalNote}</p>
                  ) : null}
                </div>
              </Reveal>
            </div>

            <div id="instrument-loans" className="scroll-mt-28">
              <Reveal
                delay={0.18}
                className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12"
              >
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
                  {content.instrumentLoan.eyebrow}
                </p>
                <h2 className="font-display text-4xl leading-[1.05] text-ivory text-balance sm:text-5xl md:text-6xl">
                  {content.instrumentLoan.title}
                </h2>
                <div className="mt-9 space-y-6 text-lg leading-8 text-ivory-muted">
                  {content.instrumentLoan.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <a
                  href={content.instrumentLoan.buttonHref}
                  className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
                >
                  {content.instrumentLoan.buttonLabel}
                </a>
                {content.instrumentLoan.linkText ? (
                  <p className="mt-5 text-sm leading-7 text-ivory-muted">
                    <a
                      href={content.instrumentLoan.linkHref}
                      className="border-b border-gold/45 text-ivory transition hover:border-gold hover:text-gold"
                    >
                      {content.instrumentLoan.linkText}
                    </a>
                  </p>
                ) : null}
              </Reveal>
            </div>

            {content.photos.length > 0 ? (
              <Reveal
                delay={0.22}
                className="grid gap-4 md:grid-cols-2"
              >
                {content.photos.map((photo, index) => (
                  <ExtraPhoto key={`${photo.src}-${index}`} photo={photo} />
                ))}
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
