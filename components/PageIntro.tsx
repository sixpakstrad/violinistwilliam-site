"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import {
  defaultPageContent,
  pageContentStorageKey,
  type EditablePageContent,
  type EditablePageKey,
} from "@/data/pageContent";

type PageIntroProps = {
  pageKey?: EditablePageKey;
  eyebrow: string;
  title: string;
  copy: string;
  titleSize?: string;
  titleColor?: string;
  subtitleSize?: string;
  subtitleColor?: string;
};

function findPageContent(pageKey: EditablePageKey) {
  try {
    const raw = window.localStorage.getItem(pageContentStorageKey);
    const pages = raw
      ? (JSON.parse(raw) as EditablePageContent[])
      : defaultPageContent;

    const page = pages.find((item) => item.key === pageKey);
    const fallback = defaultPageContent.find((item) => item.key === pageKey);

    return fallback ? { ...fallback, ...page } : page;
  } catch {
    return defaultPageContent.find((page) => page.key === pageKey);
  }
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

export function PageIntro({
  pageKey,
  eyebrow,
  title,
  copy,
  titleSize,
  titleColor,
  subtitleSize,
  subtitleColor,
}: PageIntroProps) {
  const [editableContent, setEditableContent] =
    useState<EditablePageContent | null>(null);

  useEffect(() => {
    if (!pageKey) {
      return;
    }

    setEditableContent(findPageContent(pageKey) ?? null);
  }, [pageKey]);

  const displayEyebrow = editableContent?.eyebrow ?? eyebrow;
  const displayTitle = editableContent?.title ?? title;
  const displayCopy = editableContent?.copy ?? copy;
  const displayTitleSize = editableContent?.titleSize ?? titleSize;
  const displayTitleColor = editableContent?.titleColor ?? titleColor;
  const displaySubtitleSize = editableContent?.subtitleSize ?? subtitleSize;
  const displaySubtitleColor = editableContent?.subtitleColor ?? subtitleColor;

  return (
    <section className="relative overflow-hidden px-5 pb-8 pt-28 sm:px-8 md:px-12 md:pb-12 md:pt-32 lg:px-16">
      <div className="absolute inset-x-0 bottom-0 h-px candleline opacity-60" />
      <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <p className="text-xs uppercase tracking-[0.34em] text-bronze-soft">
          {displayEyebrow}
        </p>
        <div>
          <h1
            className="max-w-5xl font-display text-4xl leading-[1.04] text-ivory text-balance sm:text-5xl md:text-6xl"
            style={textStyle(displayTitleSize, displayTitleColor)}
          >
            {displayTitle}
          </h1>
          {displayCopy ? (
            <p
              className="mt-5 max-w-2xl text-base leading-8 text-ivory-muted"
              style={textStyle(displaySubtitleSize, displaySubtitleColor)}
            >
              {displayCopy}
            </p>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
