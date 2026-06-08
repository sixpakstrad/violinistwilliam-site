import { PageIntro } from "@/components/PageIntro";
import { SongRequestBoard } from "@/components/SongRequestBoard";

export default function RequestsPage() {
  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="requests"
        eyebrow="Request Board"
        title="A private dashboard for live song requests."
        copy="Open this page from your phone during an event to review requests, shape playlists, and pause or reopen guest requests."
      />
      <SongRequestBoard />
    </main>
  );
}
