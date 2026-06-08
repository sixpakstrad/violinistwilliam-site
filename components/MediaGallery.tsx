"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

const galleryImages = [
  {
    src: "/media/collection/27-lounge-violin-portrait.jpeg",
    alt: "William Samorey seated with violin in a lounge setting",
  },
  {
    src: "/media/collection/24-wedding-couple-color.jpeg",
    alt: "String quartet performing at a wedding",
  },
  {
    src: "/media/brahms-stained-glass.jpg",
    alt: "William Samorey performing with orchestra",
  },
  {
    src: "/media/collection/16-barn-solo-color.jpeg",
    alt: "William Samorey performing violin in a warm barn venue",
  },
  {
    src: "/media/collection/31-holiday-stage-portrait.jpeg",
    alt: "William Samorey with violin in a holiday performance setting",
  },
];

export function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % galleryImages.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              Photo Album
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
              A glimpse of the rooms, stages, and moments behind the music.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-ivory-muted sm:text-lg lg:justify-self-end">
            This gallery is ready for your preferred wedding, concert, and
            behind-the-scenes photos once the permanent media library is
            connected.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <figure className="photo-depth relative min-h-[20rem] overflow-hidden bg-linen sm:min-h-[32rem] lg:min-h-[38rem]">
            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              initial={false}
              animate={{ opacity: 1, scale: 1.045 }}
              transition={{ duration: 5.4, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,239,0.02),rgba(47,41,35,0.22))]" />
            <figcaption className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 border-t border-linen/30 pt-4 text-[0.68rem] uppercase tracking-[0.2em] text-linen/90 sm:bottom-7 sm:left-7 sm:right-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5 sm:text-xs sm:tracking-[0.28em]">
              <span>Photo Album</span>
              <span>
                Image {activeIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
