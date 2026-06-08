import { Reveal } from "@/components/Reveal";

const reviews = [
  {
    quote:
      "My congregation LOVED the musical performance. I received numerous texts and positive comments from those in attendance.",
    source: "Amy C.",
    label: "5-Star Google Review",
  },
  {
    quote:
      "He coordinated the timing perfectly so the moment unfolded exactly as planned.",
    source: "Daniel S.",
    label: "5-Star Google Review",
  },
  {
    quote:
      "His music truly brought warmth and emotion to the day.",
    source: "Alicia R.",
    label: "5-Star Google Review",
  },
  {
    quote:
      "His talent and attention to detail made every moment magical.",
    source: "Hector P.",
    label: "5-Star Google Review",
  },
  {
    quote:
      "Will is not only an incredible musician, but also a wonderful human being.",
    source: "Ramona F.",
    label: "5-Star Google Review",
  },
  {
    quote:
      "Our guests are still raving about the music.",
    source: "Jeanette H.",
    label: "5-Star Google Review",
  },
];

export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf7ef,#fffdf7_52%,#f2e8d8)] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
            Reviews
          </p>
          <h2 className="font-display text-5xl leading-[1.04] text-ivory text-balance sm:text-6xl md:text-7xl">
            The music becomes part of what people remember.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.source} delay={index * 0.08}>
              <figure className="elegant-surface relative border border-ivory/10 p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mb-5 text-xs uppercase tracking-[0.24em] text-gold/75">
                  {review.label}
                </p>
                <blockquote className="font-display text-3xl leading-tight text-ivory">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-8 text-xs uppercase tracking-[0.24em] text-gold/75">
                  {review.source}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
