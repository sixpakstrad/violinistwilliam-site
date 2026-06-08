import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SiteAnnouncements } from "@/components/SiteAnnouncements";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.violinistwilliam.com"),
  title: "William Samorey | Live Violin",
  description:
    "Live violin performance, wedding music, private events, lessons, bow rehair, and instrument care by William Samorey in the Twin Cities and Midwest.",
  openGraph: {
    title: "William Samorey | Live Violin",
    description:
      "Live violin performance, wedding music, private events, lessons, bow rehair, and instrument care by William Samorey.",
    url: "https://www.violinistwilliam.com",
    siteName: "William Samorey",
    images: [
      {
        url: "/media/ws-logo-full.png",
        width: 980,
        height: 371,
        alt: "William Samorey and Winspiration Studio LLC",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "William Samorey | Live Violin",
    description:
      "Live violin performance, wedding music, private events, lessons, bow rehair, and instrument care by William Samorey.",
    images: ["/media/ws-logo-full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="site-background-depth" aria-hidden="true">
            <img
              className="site-background-image"
              src="/media/theater-page-background.png"
              alt=""
            />
          </div>
          <Navigation />
          <SiteAnnouncements />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
