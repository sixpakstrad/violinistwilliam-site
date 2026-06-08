"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { SocialTextLinks } from "@/components/SocialLinks";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultMainPageContent,
  type MainPageContentData,
} from "@/data/mainPageContent";

function readMainPageContent(): MainPageContentData {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.mainPage);
    return raw ? (JSON.parse(raw) as MainPageContentData) : defaultMainPageContent;
  } catch {
    return defaultMainPageContent;
  }
}

function imageScale(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : 1;
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

export function MainPageContent() {
  const [content, setContent] =
    useState<MainPageContentData>(defaultMainPageContent);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setContent(readMainPageContent());
  }, []);

  useEffect(() => {
    if (content.gallery.images.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveImageIndex((index) => (index + 1) % content.gallery.images.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [content.gallery.images.length]);

  const activeImage =
    content.gallery.images[activeImageIndex] || content.gallery.images[0];
  const heroImageFit =
    content.hero.primaryImageFit === "contain" ? "contain" : "cover";
  const experienceImageFit =
    content.experience.imageFit === "contain" ? "contain" : "cover";
  const galleryImageFit = activeImage?.fit === "cover" ? "cover" : "contain";

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <section className="scene-edge relative flex min-h-[100svh] items-end overflow-hidden bg-radial-candle px-5 pb-10 pt-36 sm:px-8 sm:pb-12 sm:pt-32 md:px-12 lg:px-16 lg:pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,239,0.96)_0%,rgba(251,247,239,0.62)_43%,rgba(251,247,239,0.16)_100%)]" />
          <motion.div
            initial={false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="photo-depth absolute left-4 right-4 top-32 h-[42svh] overflow-hidden border-l border-t border-ivory/10 bg-charcoal-brown/70 opacity-70 sm:left-auto sm:right-6 sm:top-28 sm:h-[58svh] sm:w-[58vw] sm:opacity-85 lg:right-0 lg:top-[9%] lg:h-[78vh] lg:w-[54vw] lg:max-w-[760px] lg:opacity-100"
            aria-label="William Samorey on stage"
          >
            <img
              src={content.hero.primaryImage || "/media/samorey-stage.png"}
              alt="William Samorey holding violin on a warm concert hall stage"
              className="h-full w-full object-center"
              style={{
                objectFit: heroImageFit,
                objectPosition: content.hero.primaryImagePosition || "center",
                transform: `scale(${imageScale(content.hero.primaryImageZoom)})`,
                transformOrigin: content.hero.primaryImagePosition || "center",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,239,0.18),rgba(251,247,239,0.03)_44%,rgba(47,41,35,0.12)),linear-gradient(0deg,rgba(47,41,35,0.42),transparent_48%)]" />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="max-w-3xl pt-[34svh] sm:pt-0"
          >
            <div className="mb-7 h-px w-28 candleline" />
            <p className="mb-4 text-xs uppercase tracking-[0.36em] text-gold/80">
              {content.hero.eyebrow}
            </p>
            <h1
              className="font-script text-[clamp(3.8rem,18vw,8.6rem)] leading-[0.95] text-ivory text-balance [text-shadow:0_18px_48px_rgba(255,255,255,0.75)]"
              style={textStyle(
                content.hero.titleSize,
                content.hero.titleColor,
              )}
            >
              {content.hero.title}
            </h1>
            <p
              className="mt-6 max-w-xl text-lg leading-8 text-ivory-muted text-pretty sm:mt-7 sm:text-2xl"
              style={textStyle(
                content.hero.subtitleSize,
                content.hero.subtitleColor,
              )}
            >
              {content.hero.copy}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={content.hero.primaryCtaHref}
                className="group inline-flex min-h-12 items-center justify-center bg-ivory px-7 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso"
              >
                {content.hero.primaryCtaLabel}
              </a>
              <a
                href={content.hero.secondaryCtaHref}
                className="inline-flex min-h-12 items-center justify-center border border-gold/45 bg-linen/70 px-7 text-sm font-medium uppercase tracking-[0.22em] text-ivory backdrop-blur transition duration-300 hover:border-gold hover:bg-champagne/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso"
              >
                {content.hero.secondaryCtaLabel}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="flex flex-wrap items-end justify-between gap-6 text-[0.72rem] uppercase tracking-[0.28em] text-ivory-muted/70"
          >
            {content.hero.footerLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="weddings"
        className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
      >
        <div className="absolute right-[-10rem] top-16 h-96 w-96 rounded-full bg-ivory/[0.045] blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
                {content.weddings.eyebrow}
              </p>
              <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
                {content.weddings.title}
              </h2>
            </div>
            <div className="space-y-7 text-base leading-8 text-ivory-muted sm:text-lg">
              {content.weddings.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="flex flex-wrap gap-2">
                {content.weddings.eventTypes.map((eventType) => (
                  <span
                    key={eventType}
                    className="border border-gold/20 bg-linen/55 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-ivory-muted"
                  >
                    {eventType}
                  </span>
                ))}
              </div>
              <SocialTextLinks links={content.weddings.socialLinks} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16">
        <div className="absolute left-[-10rem] top-16 h-80 w-80 rounded-full bg-ivory/[0.04] blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14">
          <Reveal className="photo-depth relative min-h-[24rem] overflow-hidden bg-charcoal-brown sm:min-h-[34rem] lg:min-h-[38rem]">
            <img
              src={content.experience.image}
              alt={content.experience.imageAlt}
              className="absolute inset-0 h-full w-full object-center"
              style={{
                objectFit: experienceImageFit,
                objectPosition: content.experience.imagePosition || "center",
                transform: `scale(${imageScale(content.experience.imageZoom)})`,
                transformOrigin: content.experience.imagePosition || "center",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,41,35,0.04),rgba(47,41,35,0.54)),linear-gradient(90deg,rgba(47,41,35,0.22),transparent)]" />
            <div className="absolute left-8 top-8 h-24 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
            <div className="absolute bottom-7 left-6 right-6 flex flex-col gap-2 border-t border-linen/25 pt-5 text-[0.62rem] uppercase tracking-[0.24em] text-linen/85 sm:bottom-10 sm:left-8 sm:right-8 sm:flex-row sm:items-center sm:justify-between sm:text-[0.68rem] sm:tracking-[0.32em]">
              <span>{content.experience.leftCaption}</span>
              <span>{content.experience.rightCaption}</span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:pl-8">
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              {content.experience.eyebrow}
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
              {content.experience.title}
            </h2>
            <div className="mt-9 max-w-xl space-y-6 text-base leading-8 text-ivory-muted sm:text-lg">
              {content.experience.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="media"
        className="relative scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16"
      >
        <div className="absolute left-[8%] top-8 h-72 w-72 rounded-full bg-champagne/25 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <Reveal>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              {content.featuredPerformance.eyebrow}
            </p>
            <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
              {content.featuredPerformance.title}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-ivory-muted sm:text-lg">
              {content.featuredPerformance.copy}
            </p>
            <Link
              href={content.featuredPerformance.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
            >
              {content.featuredPerformance.buttonLabel}
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="photo-depth overflow-hidden border border-ivory/10 bg-linen">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={content.featuredPerformance.embedUrl}
                  title="Featured violin performance by William Samorey"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="reviews"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf7ef,#fffdf7_52%,#f2e8d8)] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              {content.reviews.eyebrow}
            </p>
            <h2 className="font-display text-5xl leading-[1.04] text-ivory text-balance sm:text-6xl md:text-7xl">
              {content.reviews.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.reviews.items.map((review, index) => (
              <Reveal key={`${review.source}-${index}`} delay={index * 0.08}>
                <figure className="elegant-surface relative border border-ivory/10 p-7">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/60 to-transparent" />
                  <p className="mb-5 text-xs uppercase tracking-[0.24em] text-gold/75">
                    {review.label}
                  </p>
                  <blockquote className="font-display text-3xl leading-tight text-ivory">
                    "{review.quote}"
                  </blockquote>
                  <figcaption className="mt-8 text-xs uppercase tracking-[0.24em] text-gold/75">
                    {review.source}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
                {content.gallery.eyebrow}
              </p>
              <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
                {content.gallery.title}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-ivory-muted sm:text-lg lg:justify-self-end">
              {content.gallery.copy}
            </p>
          </Reveal>

          {activeImage ? (
            <Reveal delay={0.1} className="mt-12">
              <figure className="photo-depth relative min-h-[20rem] overflow-hidden bg-linen sm:min-h-[32rem] lg:min-h-[38rem]">
                <motion.img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  initial={false}
                  animate={{
                    opacity: 1,
                    scale: imageScale(activeImage.zoom) * 1.045,
                  }}
                  transition={{ duration: 5.4, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    objectFit: galleryImageFit,
                    objectPosition: activeImage.position || "center",
                    transformOrigin: activeImage.position || "center",
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,239,0.02),rgba(47,41,35,0.22))]" />
                <figcaption className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 border-t border-linen/30 pt-4 text-[0.68rem] uppercase tracking-[0.2em] text-linen/90 sm:bottom-7 sm:left-7 sm:right-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5 sm:text-xs sm:tracking-[0.28em]">
                  <span>{content.gallery.eyebrow}</span>
                  <span>
                    Image {activeImageIndex + 1} / {content.gallery.images.length}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16">
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
              {content.finalCta.title}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ivory-muted sm:text-lg">
              {content.finalCta.copy}
            </p>
            <Link
              href={content.finalCta.buttonHref}
              className="mt-9 inline-flex min-h-12 items-center justify-center bg-ivory px-8 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold"
            >
              {content.finalCta.buttonLabel}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
