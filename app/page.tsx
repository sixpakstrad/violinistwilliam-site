import type { Metadata } from "next";
import { MainPageContent } from "@/components/MainPageContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <MainPageContent />;
}
