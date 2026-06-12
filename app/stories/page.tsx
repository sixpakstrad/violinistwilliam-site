import { Reveal } from "@/components/Reveal";
import { StoriesJournal } from "@/components/StoriesJournal";

export default function StoriesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf4e9] text-[#082123]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(200,117,63,0.16),transparent_28%),radial-gradient(circle_at_86%_8%,rgba(18,91,92,0.14),transparent_34%),linear-gradient(145deg,#fffaf1_0%,#f4eadc_46%,#e8ddcd_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(135deg,rgba(8,33,35,0.22)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative isolate z-10 overflow-hidden px-5 pb-16 pt-32 sm:px-8 md:px-12 md:pb-20 md:pt-36 lg:px-16">
        <img
          src="/media/theater-page-background.png"
          alt=""
          className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-center opacity-[0.30] md:w-[72%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,241,0.97)_0%,rgba(251,244,233,0.88)_38%,rgba(251,244,233,0.66)_68%,rgba(251,244,233,0.50)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(180deg,transparent,#fbf4e9_92%)]" />

        <Reveal className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#b85f2e]">
            Journal
          </p>
          <h1 className="max-w-3xl font-display text-6xl leading-none text-[#082123] text-balance drop-shadow-[0_18px_42px_rgba(91,67,38,0.12)] sm:text-7xl md:text-8xl">
            Will’s Stories
          </h1>
          <div className="my-7 h-px w-24 bg-[#b85f2e]" />
          <p className="max-w-xl text-lg leading-8 text-[#143638] sm:text-xl">
            Reflections from performances, teaching, repertoire, instruments,
            and the quiet work behind the music.
          </p>
        </Reveal>
      </section>

      <div className="relative z-10">
        <StoriesJournal />
      </div>
    </main>
  );
}
