import { redirect } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { SongRequestBoard } from "@/components/SongRequestBoard";
import { getAdminAccess } from "@/lib/adminAuth";
import { readPublishedPageIntro } from "@/lib/supabasePageIntros";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const access = await getAdminAccess();

  if (!access.isAllowed) {
    redirect("/access-denied");
  }

  const pageIntro = await readPublishedPageIntro("requests");

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="requests"
        content={pageIntro}
        eyebrow="Request Board"
        title="A private dashboard for live song requests."
        copy="Open this page from your phone during an event to review requests, shape playlists, and pause or reopen guest requests."
      />
      <SongRequestBoard />
    </main>
  );
}
