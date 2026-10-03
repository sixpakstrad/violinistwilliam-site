import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { SongLibrary } from "@/components/SongLibrary";
import { readPublishedPageIntro } from "@/lib/supabasePageIntros";

export const metadata: Metadata = {
  title: "Song Library | Wedding and Event Violin Repertoire",
  description:
    "Browse William Samorey's song library for wedding ceremonies, receptions, private events, celebrations, and live violin requests.",
  alternates: {
    canonical: "/music",
  },
};

export default async function MusicPage() {
  const pageIntro = await readPublishedPageIntro("music");

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="music"
        content={pageIntro}
        eyebrow="Song Library"
        title="A song library curated for ceremony, celebration, and atmosphere."
        copy="Browse repertoire by mood, artist, category, or wedding moment. This is where clients can begin shaping the soundtrack of the event."
      />
      <SongLibrary />
    </main>
  );
}
