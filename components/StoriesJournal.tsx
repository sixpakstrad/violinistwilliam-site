"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { StoriesAccordion } from "@/components/StoriesAccordion";
import { adminStorageKeys } from "@/data/adminContent";
import { storyEntries, type StoryEntry } from "@/data/stories";

type StoredStoryEntry = Omit<Partial<StoryEntry>, "body"> & {
  id?: string;
  body?: string[] | string;
};

function normalizeStory(story: StoredStoryEntry, index: number): StoryEntry {
  const rawBody = Array.isArray(story.body)
    ? story.body
    : typeof story.body === "string"
      ? story.body.split(/\n{2,}/)
      : [];

  return {
    id: story.id || `story-${index + 1}`,
    date: story.date || "",
    marker: story.marker || story.category || "Journal",
    title: story.title || "Untitled Story",
    category: story.category || "Journal",
    teaser: story.teaser || "",
    image: story.image || "",
    published: story.published ?? true,
    body: rawBody.map((paragraph) => paragraph.trim()).filter(Boolean),
  };
}

function readStoredStories() {
  try {
    const raw = window.localStorage.getItem(adminStorageKeys.stories);
    if (!raw) {
      return storyEntries;
    }

    const storedStories = JSON.parse(raw) as StoredStoryEntry[];
    return storedStories.map(normalizeStory);
  } catch {
    return storyEntries;
  }
}

export function StoriesJournal() {
  const [stories, setStories] = useState<StoryEntry[]>(storyEntries);

  useEffect(() => {
    setStories(readStoredStories());

    const syncStories = () => setStories(readStoredStories());
    window.addEventListener("storage", syncStories);
    window.addEventListener("focus", syncStories);

    return () => {
      window.removeEventListener("storage", syncStories);
      window.removeEventListener("focus", syncStories);
    };
  }, []);

  const publishedStories = useMemo(
    () => stories.filter((story) => story.published),
    [stories],
  );

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-2 sm:px-8 md:px-12 md:pb-32 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(200,117,63,0.12),transparent_26%),radial-gradient(circle_at_84%_56%,rgba(18,91,92,0.12),transparent_34%),linear-gradient(180deg,#fbf4e9_0%,#f3e9dc_52%,#ebe0d0_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,#fbf4e9_0%,rgba(251,244,233,0)_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl leading-snug text-[#082123] text-balance sm:text-4xl">
            A refined personal journal for the moments that happen before,
            between, and after the notes.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#4f4940] sm:text-lg">
            Stories from performances, teaching, repertoire, instruments, and
            the small details that give live music its meaning.
          </p>
        </Reveal>

        <div className="relative mt-14 pt-4 sm:mt-16">
          <div className="absolute inset-x-[-1.25rem] bottom-[-6rem] top-0 -z-10 bg-[#fff8ed]/35 backdrop-blur-[1px] sm:inset-x-[-2rem] md:inset-x-[-4rem]" />
          <Reveal delay={0.12}>
            {publishedStories.length > 0 ? (
              <StoriesAccordion stories={publishedStories} />
            ) : (
              <div className="border border-[#b85f2e]/20 bg-[#fffaf1]/[0.82] p-8 text-center text-[#4f4940] shadow-[0_30px_90px_rgba(91,67,38,0.16)]">
                No published stories are available yet.
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
