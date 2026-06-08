"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  defaultPageContent,
  pageContentStorageKey,
  type EditablePageContent,
} from "@/data/pageContent";

export function Hero() {
  const [content, setContent] = useState<EditablePageContent>(
    defaultPageContent.find((page) => page.key === "main")!,
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(pageContentStorageKey);
      const pages = raw
        ? (JSON.parse(raw) as EditablePageContent[])
        : defaultPageContent;
      const mainContent = pages.find((page) => page.key === "main");

      if (mainContent) {
        setContent(mainContent);
      }
    } catch {
      // Keep the default hero content.
    }
  }, []);

  return (
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
            src={content.primaryImage || "/media/samorey-stage.png"}
            alt="William Samorey holding violin on a warm concert hall stage"
            className="h-full w-full object-cover object-center"
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
            {content.eyebrow}
          </p>
          <h1 className="font-script text-[clamp(3.8rem,18vw,8.6rem)] leading-[0.95] text-ivory text-balance [text-shadow:0_18px_48px_rgba(255,255,255,0.75)]">
            {content.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ivory-muted text-pretty sm:mt-7 sm:text-2xl">
            {content.copy}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact#inquiry"
              className="group inline-flex min-h-12 items-center justify-center bg-ivory px-7 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso"
            >
              Inquire
            </a>
            <a
              href="/music#songs"
              className="inline-flex min-h-12 items-center justify-center border border-gold/45 bg-linen/70 px-7 text-sm font-medium uppercase tracking-[0.22em] text-ivory backdrop-blur transition duration-300 hover:border-gold hover:bg-champagne/20 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso"
            >
              Explore Songs
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="flex items-end justify-between gap-6 text-[0.72rem] uppercase tracking-[0.28em] text-ivory-muted/70"
        >
          <span>Weddings</span>
          <span className="hidden sm:inline">Private Events</span>
          <span>Concert Atmosphere</span>
        </motion.div>
      </div>
    </section>
  );
}
