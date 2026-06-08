"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  defaultRepairSlideshowImages,
  type RepairSlideshowImage,
} from "@/data/repairContent";

export function RepairCareSlideshow({
  images = defaultRepairSlideshowImages,
}: {
  images?: RepairSlideshowImage[];
}) {
  const slides = images.length ? images : defaultRepairSlideshowImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = slides[activeIndex % slides.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <figure className="relative overflow-hidden border border-[#f08a4b]/45 bg-[#1e0704]/60 shadow-[0_30px_90px_rgba(23,8,5,0.36)]">
      <div className="relative min-h-[24rem] sm:min-h-[32rem] lg:min-h-[38rem]">
        <motion.img
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1.06 * (activeImage.zoom || 1) }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className={`absolute inset-0 h-full w-full ${
            activeImage.objectFit === "contain" ? "object-contain" : "object-cover"
          }`}
          style={{
            objectPosition: activeImage.objectPosition || "50% 50%",
            transformOrigin: activeImage.objectPosition || "50% 50%",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,7,4,0.08),rgba(28,7,4,0.48)),radial-gradient(circle_at_65%_12%,rgba(246,181,126,0.2),transparent_22rem)]" />
      </div>
      <figcaption className="absolute bottom-5 left-5 right-5 flex flex-col gap-2 border-t border-[#ff9a56]/45 pt-4 text-[0.68rem] uppercase tracking-[0.2em] text-[#fff4e8] sm:bottom-7 sm:left-7 sm:right-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5 sm:text-xs sm:tracking-[0.28em]">
        <span>Bow & Instrument Care</span>
        <span>
          Detail {(activeIndex % slides.length) + 1} / {slides.length}
        </span>
      </figcaption>
    </figure>
  );
}
