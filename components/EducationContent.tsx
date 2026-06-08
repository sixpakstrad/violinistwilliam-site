"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultEducationContent,
  normalizeEducationContent,
  type EducationArticleContent,
  type EducationContentData,
  type EducationPhoto,
  type LessonRate,
} from "@/data/educationContent";

function readEducationContent(): EducationContentData {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.education);
    return raw
      ? normalizeEducationContent(JSON.parse(raw))
      : defaultEducationContent;
  } catch {
    return defaultEducationContent;
  }
}

function EducationArticle({
  article,
  children,
}: {
  article: EducationArticleContent;
  children?: React.ReactNode;
}) {
  return (
    <article id={article.id} className="scroll-mt-28">
      <Reveal className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12">
        <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
          {article.eyebrow}
        </p>
        <h2 className="font-display text-4xl leading-[1.05] text-ivory text-balance sm:text-5xl md:text-6xl">
          {article.title}
        </h2>
        <div className="mt-8 space-y-6 text-base leading-8 text-ivory-muted sm:text-lg">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.secondaryTitle ? (
            <div className="border-t border-ivory/10 pt-8">
              <h3 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
                {article.secondaryTitle}
              </h3>
            </div>
          ) : null}
          {article.secondaryBody?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {children}
        </div>
      </Reveal>
    </article>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border border-ivory/10 bg-espresso/35">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="border-b border-ivory/10 px-5 py-3 text-sm leading-7 text-ivory-muted last:border-b-0 odd:bg-ivory/[0.035]"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function LessonRateList({ items }: { items: LessonRate[] }) {
  return (
    <div className="overflow-hidden border border-ivory/10 bg-espresso/35">
      {items.map((item, index) => (
        <div
          key={`${item.level}-${index}`}
          className="grid gap-2 border-b border-ivory/10 px-5 py-3 text-sm leading-7 text-ivory-muted last:border-b-0 odd:bg-ivory/[0.035] sm:grid-cols-[1fr_auto]"
        >
          <span>
            <span className="font-medium text-ivory">{item.level}:</span>{" "}
            {item.length}
          </span>
          <span className="font-medium text-ivory sm:text-right">
            {item.price}
          </span>
        </div>
      ))}
    </div>
  );
}

function imageFit(value?: string) {
  return value === "contain" ? "contain" : "cover";
}

function imageScale(value?: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : 1;
}

function EducationPhotoGrid({ photos }: { photos: EducationPhoto[] }) {
  if (!photos.length) {
    return null;
  }

  return (
    <section className="px-5 pb-12 sm:px-8 md:px-12 md:pb-16 lg:px-16">
      <Reveal
        className={`mx-auto grid max-w-7xl gap-5 ${
          photos.length === 1 ? "" : "md:grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        {photos.map((photo, index) => {
          const imageStyle: CSSProperties = {
            objectFit: imageFit(photo.fit),
            objectPosition: photo.position || "center",
            transform: `scale(${imageScale(photo.zoom)})`,
            transformOrigin: photo.position || "center",
          };

          return (
            <figure
              key={`${photo.src}-${index}`}
              className="photo-depth relative min-h-[22rem] overflow-hidden bg-charcoal-brown sm:min-h-[30rem]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 h-full w-full"
                style={imageStyle}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,41,35,0.02),rgba(47,41,35,0.3))]" />
            </figure>
          );
        })}
      </Reveal>
    </section>
  );
}

export function EducationContent() {
  const [content, setContent] = useState<EducationContentData>(
    defaultEducationContent,
  );

  useEffect(() => {
    setContent(readEducationContent());

    const syncContent = () => setContent(readEducationContent());
    window.addEventListener("storage", syncContent);
    window.addEventListener("focus", syncContent);

    return () => {
      window.removeEventListener("storage", syncContent);
      window.removeEventListener("focus", syncContent);
    };
  }, []);

  const howToStartArticle = content.articles.find(
    (article) => article.id === "how-to-start-lessons",
  );
  const pricingArticle = content.articles.find(
    (article) => article.id === "pricing",
  );

  return (
    <>
      <EducationPhotoGrid photos={content.photos} />

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
          <Reveal className="elegant-surface sticky top-28 hidden border border-ivory/10 p-6 lg:block">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-gold/80">
              Education
            </p>
            <nav className="grid gap-3 text-sm uppercase tracking-[0.18em] text-ivory-muted">
              {content.articles.map((article) => (
                <a
                  key={article.id}
                  href={`#${article.id}`}
                  className="border-b border-ivory/10 pb-3 transition hover:text-gold"
                >
                  {article.navLabel}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="space-y-8">
            {content.articles
              .filter((article) => article.id === "private-lessons")
              .map((article) => (
                <EducationArticle key={article.id} article={article} />
              ))}

            {howToStartArticle ? (
              <EducationArticle article={howToStartArticle}>
                <SimpleList items={content.firstLessonItems} />
                <Link
                  href="/contact?type=teaching"
                  className="inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
                >
                  Start a Teaching Inquiry
                </Link>
              </EducationArticle>
            ) : null}

            {pricingArticle ? (
              <EducationArticle article={pricingArticle}>
                <h3 className="font-display text-3xl text-ivory">
                  In-Person or Virtual Lessons
                </h3>
                <LessonRateList items={content.lessonRates} />
                <p>{content.pricingNote}</p>
              </EducationArticle>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
