import type { Metadata } from "next";
import { RepairPageContent } from "@/components/RepairPageContent";

export const metadata: Metadata = {
  title: "Bow Rehair, Repair, and Instrument Care | William Samorey",
  description:
    "Bow rehair, bow repair, setup, and instrument care for violin, viola, cello, bass, and period-instrument players.",
  alternates: {
    canonical: "/bow-rehair-repair-instrument-care",
  },
};

export default function BowRepairPage() {
  return <RepairPageContent />;
}
