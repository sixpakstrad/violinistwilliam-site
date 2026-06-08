import type { Metadata } from "next";
import { RepairPageContent } from "@/components/RepairPageContent";

export const metadata: Metadata = {
  title: "Bow Rehair, Repair, and Instrument Care | William Samorey",
  description:
    "Professional bow rehair and bow repair services for violin, viola, cello, bass, and period-instrument bows, along with setup and maintenance for violin, viola, and cello players.",
};

export default function BowRepairPage() {
  return <RepairPageContent />;
}
