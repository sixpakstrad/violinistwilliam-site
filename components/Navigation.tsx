"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
} from "@/data/adminContent";

const primaryLinks = [
  { label: "Song Library", href: "/music" },
  { label: "Will’s Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

const dropdownGroups = [
  {
    label: "Main",
    href: "/",
    links: [
      { label: "Home", href: "/" },
      { label: "Media", href: "/#media" },
      { label: "Weddings", href: "/#weddings" },
      { label: "Reviews", href: "/#reviews" },
    ],
  },
  {
    label: "About",
    href: "/about",
    links: [
      { label: "About William", href: "/about#bio" },
      { label: "Instrument Loan", href: "/about#instrument-loans" },
    ],
  },
  {
    label: "Education",
    href: "/education",
    links: [
      {
        label: "Private Lessons",
        href: "/education#private-lessons",
      },
      {
        label: "How to Start Lessons",
        href: "/education#how-to-start-lessons",
      },
      { label: "Pricing", href: "/education#pricing" },
    ],
  },
  {
    label: "Performance",
    href: "/performances",
    links: [
      { label: "Weddings", href: "/performances#weddings" },
      { label: "Rates / Packages", href: "/performances#packages" },
      { label: "Ensembles", href: "/performances#ensembles" },
      {
        label: "Upcoming Performances",
        href: "/performances#upcoming-performances",
      },
    ],
  },
  {
    label: "Repairs",
    href: "/bow-rehair-repair-instrument-care",
    links: [
      {
        label: "Bow Rehairs and Repair",
        href: "/bow-rehair-repair-instrument-care#bow-rehairs-repair",
      },
      {
        label: "Set-up & Maintenance",
        href: "/bow-rehair-repair-instrument-care#setup-maintenance",
      },
      {
        label: "Training & Background",
        href: "/bow-rehair-repair-instrument-care#training-background",
      },
    ],
  },
];

export function Navigation() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [siteDetails, setSiteDetails] = useState(defaultSiteDetails);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isStoriesPage = pathname === "/stories";
  const brandName =
    siteDetails.businessIdentity.ownerPerformerName ||
    siteDetails.businessIdentity.publicBrandName;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(adminStorageKeys.siteDetails);
      setSiteDetails(
        normalizeSiteDetails(stored ? JSON.parse(stored) : defaultSiteDetails),
      );
    } catch {
      setSiteDetails(defaultSiteDetails);
    }
  }, []);

  const openDropdown = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpenMenu(label);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 260);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-3 backdrop-blur-xl sm:px-8 lg:px-12 ${
        isStoriesPage
          ? "border-ivory/10 bg-espresso/60 shadow-[0_14px_42px_rgba(91,67,38,0.10)]"
          : "border-ivory/10 bg-espresso/60 shadow-[0_14px_42px_rgba(91,67,38,0.10)]"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl flex-col gap-2 py-3 lg:min-h-20 lg:flex-row lg:items-center lg:gap-5 lg:py-0"
      >
        <div className="flex w-full items-center gap-4 lg:w-auto">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <img
              src="/media/ws-monogram.png"
              alt=""
              className="h-9 w-auto opacity-90 sm:h-11"
            />
            <span className="min-w-0 text-center">
              <span
                className={`block font-script text-2xl leading-none sm:text-3xl ${
                  isStoriesPage ? "text-ivory" : "text-ivory"
                }`}
              >
                {brandName}
              </span>
              <span
                className={`mt-1 block text-center text-[0.5rem] uppercase tracking-[0.18em] sm:text-[0.56rem] sm:tracking-[0.22em] ${
                  isStoriesPage ? "text-gold/85" : "text-gold/85"
                }`}
              >
                {siteDetails.businessIdentity.legalBusinessName}
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden w-full min-w-0 items-center gap-3 overflow-x-auto pb-1 pt-1 lg:ml-auto lg:flex lg:w-auto lg:gap-5 lg:overflow-visible">
          <div className="hidden items-center gap-3 lg:flex">
            {dropdownGroups.map((group) => {
              const isOpen = openMenu === group.label;

              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(group.label)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={group.href}
                    className={`text-[0.68rem] uppercase tracking-[0.22em] transition ${
                      isStoriesPage
                        ? "text-gold/85 hover:text-ivory"
                        : "text-gold/85 hover:text-ivory"
                    }`}
                  >
                    {group.label}
                  </Link>
                  <div
                    className={`absolute right-0 top-full w-64 pt-5 transition duration-200 ${
                      isOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="border border-[#c9aa70]/45 bg-[#fff7e8]/80 p-4 shadow-[0_24px_70px_rgba(34,24,14,0.22),0_0_0_1px_rgba(255,255,255,0.62)] backdrop-blur-sm">
                      {group.links.map((link) => {
                        const isExternal = link.href.startsWith("http");

                        return (
                          <Link
                            key={`${group.label}-${link.label}-${link.href}`}
                            href={link.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            className="block px-4 py-3.5 text-xs uppercase tracking-[0.16em] text-[#2f241c] transition hover:bg-[#ead8b8] hover:text-[#6f4f1f] focus:bg-[#ead8b8] focus:text-[#6f4f1f] focus:outline-none"
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 text-[0.68rem] uppercase tracking-[0.22em] transition ${
                isStoriesPage
                  ? "text-ivory-muted hover:text-ivory"
                  : "text-ivory-muted hover:text-ivory"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex w-full flex-wrap gap-2 pb-1 lg:hidden">
          {dropdownGroups.map((group) => (
            <details key={group.label} className="group">
              <summary
                className={`list-none text-[0.62rem] uppercase tracking-[0.18em] ${
                  isStoriesPage ? "text-gold/85" : "text-gold/85"
                }`}
              >
                {group.label}
              </summary>
              <div className="mt-2 grid min-w-56 border border-[#c9aa70]/45 bg-[#fff7e8]/80 p-3 shadow-[0_18px_48px_rgba(34,24,14,0.20),0_0_0_1px_rgba(255,255,255,0.62)] backdrop-blur-sm">
                <Link
                  href={group.href}
                  className="px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-[#7b5a24]"
                >
                  {group.label}
                </Link>
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <Link
                      key={`${group.label}-mobile-${link.label}-${link.href}`}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="px-4 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-[#2f241c] transition hover:bg-[#ead8b8] hover:text-[#6f4f1f] focus:bg-[#ead8b8] focus:text-[#6f4f1f] focus:outline-none"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </details>
          ))}
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 text-[0.62rem] uppercase tracking-[0.18em] ${
                isStoriesPage ? "text-gold/85" : "text-gold/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
