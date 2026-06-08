import { PageIntro } from "@/components/PageIntro";
import { SongLibrary } from "@/components/SongLibrary";

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="music"
        eyebrow="Song Library"
        title="A song library curated for ceremony, celebration, and atmosphere."
        copy="Browse repertoire by mood, artist, category, or wedding moment. This is where clients can begin shaping the soundtrack of the event."
      />
      <SongLibrary />
    </main>
  );
}
