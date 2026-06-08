import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function FinalInquiryCta() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
            Inquire
          </p>
          <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
            Let&apos;s shape the sound of the day.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ivory-muted sm:text-lg">
            Send the date, location, and the kind of atmosphere you want the
            music to create. William will follow up with availability,
            performance options, and next steps.
          </p>
          <Link
            href="/contact#inquiry"
            className="mt-9 inline-flex min-h-12 items-center justify-center bg-ivory px-8 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold"
          >
            Start an Inquiry
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
