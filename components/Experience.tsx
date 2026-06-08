import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16">
      <div className="absolute left-[-10rem] top-16 h-80 w-80 rounded-full bg-ivory/[0.04] blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14">
        <Reveal className="photo-depth relative min-h-[24rem] overflow-hidden bg-charcoal-brown sm:min-h-[34rem] lg:min-h-[38rem]">
          <img
            src="/media/collection/27-lounge-violin-portrait.jpeg"
            alt="William Samorey seated with violin in a lounge setting"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,41,35,0.04),rgba(47,41,35,0.54)),linear-gradient(90deg,rgba(47,41,35,0.22),transparent)]" />
          <div className="absolute left-8 top-8 h-24 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
          <div className="absolute bottom-7 left-6 right-6 flex flex-col gap-2 border-t border-linen/25 pt-5 text-[0.62rem] uppercase tracking-[0.24em] text-linen/85 sm:bottom-10 sm:left-8 sm:right-8 sm:flex-row sm:items-center sm:justify-between sm:text-[0.68rem] sm:tracking-[0.32em]">
            <span>Live performance</span>
            <span>Energized atmosphere</span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:pl-8">
          <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
            The Experience
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl">
            Music that hushes the room and engages conversation.
          </h2>
          <div className="mt-9 max-w-xl space-y-6 text-base leading-8 text-ivory-muted sm:text-lg">
            <p>
              William creates a live violin atmosphere for weddings and
              gatherings where each moment feels personal, present, and
              emotionally connected.
            </p>
            <p>
              From quiet entrances to joyful receptions and full-room
              celebrations, the performance moves with the emotional rhythm of
              the room.
            </p>
            <p>
              For select performances, guests can request songs live from your
              event page, creating a shared musical experience that stays
              personal, organized, and present in the moment.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
