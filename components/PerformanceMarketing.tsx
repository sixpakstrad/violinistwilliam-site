import { Reveal } from "@/components/Reveal";
import { SocialTextLinks } from "@/components/SocialLinks";

const eventTypes = [
  "Weddings",
  "Proposals",
  "Funerals",
  "Parties",
  "Corporate Events",
  "Art and Music Festivals",
];

export function PerformanceMarketing() {
  return (
    <section
      id="weddings"
      className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
    >
      <div className="absolute right-[-10rem] top-16 h-96 w-96 rounded-full bg-ivory/[0.045] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              Weddings & Events
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
              Music you will cherish and your guests will remember.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-8 text-ivory-muted sm:text-lg">
            <p>
              Whether you need music for a ceremony, cocktail hour, dinner, or
              full celebration, I help shape the emotional flow of the event. I
              can perform solo violin with high-quality tracks, collaborate
              with piano, or arrange a live duo, trio, or quartet depending on
              the size and feeling of the occasion.
            </p>
            <p>
              Customize your musical experience by choosing one of the many
              performance packages William has available. If you are looking
              for something more grand, inquire about string duos, trios, or
              quartets.
            </p>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((eventType) => (
                <span
                  key={eventType}
                  className="border border-gold/20 bg-linen/55 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-ivory-muted"
                >
                  {eventType}
                </span>
              ))}
            </div>
            <SocialTextLinks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
