"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { adminStorageKeys } from "@/data/adminContent";
import {
  defaultAddOns,
  defaultRateGuides,
  type RateGuide,
} from "@/data/rates";

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function RatesContent() {
  const [rateGuides, setRateGuides] = useState<RateGuide[]>(defaultRateGuides);
  const [addOns, setAddOns] = useState<string[]>(defaultAddOns);

  useEffect(() => {
    setRateGuides(
      readStoredValue(adminStorageKeys.rateGuides, defaultRateGuides),
    );
    setAddOns(readStoredValue(adminStorageKeys.addOns, defaultAddOns));
  }, []);

  return (
    <section
      id="packages"
      className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {rateGuides.map((guide, index) => (
            <Reveal key={`${guide.title}-${index}`} delay={index * 0.08}>
              <article className="elegant-surface relative border border-ivory/10 p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                  {guide.price}
                </p>
                <h2 className="mt-4 font-display text-4xl leading-none text-ivory">
                  {guide.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-ivory-muted">
                  {guide.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.18}
          className="elegant-surface mt-10 border border-ivory/10 p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bronze-soft">
                Add-ons and Details
              </p>
              <p className="text-lg leading-8 text-ivory-muted">
                For an accurate quote, send the event date, venue or location,
                desired performance window, and preferred ensemble size.
              </p>
            </div>
            <ul className="grid gap-3 text-sm leading-7 text-ivory-muted sm:grid-cols-2">
              {addOns.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="border border-ivory/10 bg-espresso/35 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-7 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold"
          >
            Request a Quote
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
