import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PageIntro } from "@/components/PageIntro";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";
import { getAdminAccess } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const access = await getAdminAccess();

  if (!access.isAllowed) {
    redirect("/access-denied");
  }

  return (
    <main className="min-h-screen bg-espresso text-ivory">
      <PageIntro
        pageKey="admin"
        eyebrow="Admin"
        title="Private controls for requests, repertoire, pricing, and site details."
        copy="This section is designed as the editing home for William Samorey and Winspiration Studio LLC."
      />
      <div className="px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto -mt-10 mb-8 flex max-w-7xl justify-end">
          <AdminSignOutButton email={access.email} />
        </div>
      </div>
      <AdminDashboard />
    </main>
  );
}
