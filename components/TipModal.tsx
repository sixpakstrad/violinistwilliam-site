"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SupportTip } from "@/components/SupportTip";

type TipModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function TipModal({ isOpen, onClose }: TipModalProps) {
  const [tipSubmitted, setTipSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTipSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[140] overflow-y-auto bg-[#2f2923]/[0.78] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-2xl items-start justify-center sm:min-h-[calc(100dvh-3rem)]">
        <div className="relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto border border-gold/45 bg-[#2f2923]/[0.96] p-4 text-[#fffaf3] shadow-candle sm:max-h-[calc(100dvh-3rem)] sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="sticky top-0 z-20 ml-auto -mb-9 grid h-9 w-9 place-items-center border border-gold/45 bg-[#3a2a22] text-lg leading-none text-[#fffaf3] transition hover:border-gold hover:bg-gold/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          aria-label="Close tip window"
        >
          x
        </button>
        {tipSubmitted ? (
          <>
            <p className="mb-3 pr-12 text-xs uppercase tracking-[0.28em] text-gold/80">
              Thank You
            </p>
            <h4 className="pr-12 font-display text-3xl leading-tight text-[#fffaf3] sm:text-4xl">
              Thank you for the contribution.
            </h4>
            <p className="mt-4 text-sm leading-6 text-[#fffaf3]/[0.75]">
              Your generosity helps support the music, the moment, and the
              students this work reaches.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-12 flex-1 items-center justify-center bg-[#fffaf3] px-6 text-sm font-medium uppercase tracking-[0.2em] text-[#2f2923] transition hover:bg-gold"
              >
                Close
              </button>
              <Link
                href="/about#bio"
                onClick={onClose}
                className="inline-flex min-h-12 flex-1 items-center justify-center border border-gold/45 px-6 text-sm font-medium uppercase tracking-[0.2em] text-[#fffaf3] transition hover:border-gold hover:bg-gold/15"
              >
                Meet Will
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 pr-12">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-gold/80">
                  Add Tip
                </p>
                <h4 className="font-display text-3xl leading-tight text-[#fffaf3] sm:text-4xl">
                  Pick a payment app.
                </h4>
              </div>
            </div>

            <SupportTip
              compact
              title="Payment Options"
              description="Choose your preferred payment app to send a tip."
              secondaryDescription="Tips are always optional and appreciated."
              className="mt-4"
              includeDisclosure={false}
              showPlaceholderOptions
              onOptionClick={() => setTipSubmitted(true)}
              variant="modal"
            />
          </>
        )}
        </div>
      </div>
    </div>
  );
}
