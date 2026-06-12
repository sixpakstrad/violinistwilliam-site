import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { defaultAddOns, defaultRateGuides } from "@/data/rates";

function splitRateLine(item: string) {
  const [label, ...priceParts] = item.split(":");

  return {
    label: label.trim(),
    price: priceParts.join(":").trim(),
  };
}

export function WeddingPackagesAvailability() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16"
    >
      <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-champagne/20 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
              Wedding Packages / Availability
            </p>
            <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
              Choose the shape of the music, then confirm the date.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-base leading-8 text-ivory-muted sm:text-lg lg:justify-self-end">
            <p>
              Packages can be shaped around ceremony music, cocktail hour,
              dinner, reception atmosphere, and the ensemble size that fits the
              room.
            </p>
            <p>
              Share your date and venue early so William can confirm
              availability and recommend the format that best supports the
              feeling of the event.
            </p>
          </div>
        </Reveal>

        <p className="mt-10 text-xs uppercase tracking-[0.24em] text-gold">
          Price are per performer.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {defaultRateGuides.map((guide, index) => (
            <Reveal key={guide.title} delay={index * 0.06}>
              <article className="elegant-surface h-full border border-ivory/10 p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-gold/75">
                  {guide.price}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-none text-ivory">
                  {guide.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-ivory-muted">
                  {guide.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.12}
          className="elegant-surface mt-8 border border-ivory/10 p-5 sm:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[0.66fr_1.34fr] lg:items-start">
            <div>
              <p className="mb-3 text-[0.68rem] uppercase tracking-[0.26em] text-bronze-soft">
                Individual Rates
              </p>
              <h3 className="font-display text-3xl leading-none text-ivory">
                Add time, moments, or custom music.
              </h3>
              <p className="mt-4 text-sm leading-6 text-ivory-muted">
                These items can be added to a package or used to shape a custom
                quote after the event date, location, and performance needs are
                known.
              </p>
            </div>
            <div className="overflow-hidden border border-ivory/10">
              {defaultAddOns.map((item, index) => {
                const rate = splitRateLine(item);

                return (
                  <div
                    key={item}
                    className={`grid gap-2 px-4 py-3 text-sm leading-6 sm:grid-cols-[1fr_auto] sm:items-center ${
                      index % 2 === 0 ? "bg-ivory/[0.045]" : "bg-espresso/30"
                    }`}
                  >
                    <span className="text-ivory-muted">{rate.label}</span>
                    <span className="font-medium uppercase tracking-[0.12em] text-gold/85">
                      {rate.price}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact#inquiry"
            className="inline-flex min-h-12 w-full items-center justify-center border border-gold/30 bg-linen/55 px-7 text-center text-sm font-medium uppercase tracking-[0.18em] text-ivory transition duration-300 hover:border-gold hover:bg-ivory hover:text-espresso sm:w-auto sm:tracking-[0.22em]"
          >
            Check Availability
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
