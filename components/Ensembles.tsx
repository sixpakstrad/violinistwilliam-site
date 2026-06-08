import { Reveal } from "@/components/Reveal";

const ensembles = [
  {
    title: "Solo Violin",
    description:
      "A single voice with luminous intimacy for vows, aisle walks, and quiet entrances.",
  },
  {
    title: "String Duo",
    description:
      "A richer dialogue of melody and harmony, elegant for ceremonies and receptions.",
  },
  {
    title: "String Trio",
    description:
      "Warm, refined depth for garden celebrations, galleries, and elegant dinners.",
  },
  {
    title: "String Quartet",
    description:
      "Full concert-hall resonance for grand ceremonies and unforgettable arrivals.",
  },
];

export function Ensembles() {
  return (
    <section
      id="ensembles"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf7ef,#fffdf7_48%,#f2e8d8)] px-5 py-20 sm:px-8 md:px-12 md:py-24 lg:px-16"
    >
      <div className="absolute right-[-16rem] top-10 h-[34rem] w-[34rem] rounded-full bg-ivory/[0.045] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
            Ensembles
          </p>
          <h2 className="font-display text-5xl leading-[1.04] text-ivory text-balance sm:text-6xl md:text-7xl">
            Choose the scale of the atmosphere.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ensembles.map((ensemble, index) => (
            <Reveal key={ensemble.title} delay={index * 0.07}>
              <article className="elegant-surface relative overflow-hidden border border-ivory/10 p-6">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 h-28 w-28 translate-x-10 translate-y-10 rounded-full bg-ivory/[0.035] blur-2xl" />
                <div className="relative">
                  <h3 className="font-display text-4xl leading-none text-ivory">
                    {ensemble.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-ivory-muted">
                    {ensemble.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
