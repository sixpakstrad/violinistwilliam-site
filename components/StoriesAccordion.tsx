"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { StoryEntry } from "@/data/stories";

type StoriesAccordionProps = {
  stories: StoryEntry[];
};

export function StoriesAccordion({ stories }: StoriesAccordionProps) {
  const [openStoryId, setOpenStoryId] = useState(stories[0]?.id ?? "");

  const imageScale = (value?: number) =>
    Number.isFinite(value) && value && value > 0 ? value : 1;

  return (
    <div className="overflow-hidden border-y border-[#8b6a37]/[0.18] bg-[#fffaf1]/[0.55] shadow-[0_34px_100px_rgba(91,67,38,0.16)] backdrop-blur-md">
      {stories.map((story) => {
        const isOpen = openStoryId === story.id;
        const marker = story.date || story.marker || story.category;
        const storyImageFit = story.imageFit === "contain" ? "contain" : "cover";

        return (
          <article
            key={story.id}
            className={`overflow-hidden border-b transition duration-300 last:border-b-0 ${
              isOpen
                ? "border-[#b85f2e]/[0.36] bg-[#fff7ea]/[0.86]"
                : "border-[#8b6a37]/[0.12] bg-[#fffaf1]/50 hover:bg-[#fff7ea]/[0.78]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenStoryId(isOpen ? "" : story.id)}
              className="grid w-full gap-4 px-5 py-5 text-left sm:grid-cols-[9.5rem_1fr_auto] sm:items-center sm:px-8 lg:px-10"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#b66b35] sm:border-r sm:border-[#8b6a37]/[0.18] sm:py-3">
                {marker}
              </span>

              <span className="min-w-0">
                <span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
                  <span className="font-display text-3xl leading-tight text-[#082123] sm:text-[2.45rem]">
                    {story.title}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[#b66b35]">
                    {story.category}
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#5a5349]">
                  {story.teaser}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`justify-self-end text-2xl leading-none text-[#b66b35] transition duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ˅
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="story-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden border-t border-[#8b6a37]/[0.14] bg-[linear-gradient(135deg,rgba(255,255,255,0.30),rgba(200,117,63,0.055),rgba(18,91,92,0.045))]"
                >
                  <div
                    className={`grid gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 ${
                      story.image ? "lg:grid-cols-[0.68fr_1fr]" : ""
                    }`}
                  >
                    {story.image ? (
                      <div className="relative min-h-[19rem] overflow-hidden bg-[#082123] shadow-[0_24px_70px_rgba(91,67,38,0.18)]">
                        <img
                          src={story.image}
                          alt=""
                          className="absolute inset-0 h-full w-full"
                          style={{
                            objectFit: storyImageFit,
                            objectPosition: story.imagePosition || "center",
                            transform: `scale(${imageScale(story.imageZoom)})`,
                            transformOrigin: story.imagePosition || "center",
                          }}
                        />
                        <div className="absolute inset-0 bg-[#082123]/[0.12]" />
                      </div>
                    ) : null}

                    <div className="max-w-4xl space-y-5 border-l border-[#b85f2e]/[0.26] pl-5 text-base leading-8 text-[#3f3932] sm:pl-7 sm:text-lg">
                      {story.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      <button
                        type="button"
                        onClick={() => setOpenStoryId("")}
                        className="mt-3 inline-flex min-h-11 items-center justify-center border border-[#b85f2e]/45 bg-[#b85f2e]/[0.08] px-5 text-[0.68rem] uppercase tracking-[0.2em] text-[#3f3932] transition hover:border-[#b85f2e] hover:bg-[#b85f2e]/[0.16] hover:text-[#082123]"
                      >
                        Close Story
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
