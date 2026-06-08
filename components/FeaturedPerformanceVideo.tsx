import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function FeaturedPerformanceVideo() {
  return (
    <section
      id="media"
      className="relative scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16"
    >
      <div className="absolute left-[8%] top-8 h-72 w-72 rounded-full bg-champagne/25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <Reveal>
          <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
            Watch William perform his arrangement of Ed Sheeran&apos;s
            &quot;Perfect&quot;.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-ivory-muted sm:text-lg">
            A modern ceremony favorite shaped for live performance, warmth, and
            emotional pacing.
          </p>
          <Link
            href="https://youtu.be/q-Ut8a0JI-I?si=1YM7b7Hr8VOj6OWj"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
          >
            Watch on YouTube
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="photo-depth overflow-hidden border border-ivory/10 bg-linen">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/q-Ut8a0JI-I"
                title="Perfect by Ed Sheeran, violin cover by William Samorey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
