import type { Metadata } from "next";
import { MainPageContent } from "@/components/MainPageContent";

export const metadata: Metadata = {
  title: "William Samorey | Live Violin for Weddings, Lessons, and Events",
  description:
    "William Samorey offers live violin performance, wedding music, private lessons, bow rehair, and instrument care in the Twin Cities and Midwest.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <MainPageContent />;
}
