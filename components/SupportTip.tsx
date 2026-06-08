"use client";

import { useEffect, useMemo, useState } from "react";
import {
  adminStorageKeys,
  defaultSiteDetails,
  normalizeSiteDetails,
} from "@/data/adminContent";

type SupportTipProps = {
  title?: string;
  description?: string;
  secondaryDescription?: string;
  className?: string;
  compact?: boolean;
  includeDisclosure?: boolean;
  includeInstrumentFundCard?: boolean;
  showPlaceholderOptions?: boolean;
  onOptionClick?: () => void;
  variant?: "default" | "modal";
};

type PaymentOptionId =
  | "venmo"
  | "paypal"
  | "cashApp"
  | "zelle"
  | "applePay"
  | "donation";

type PaymentOption = {
  id: PaymentOptionId;
  label: string;
  destination: string;
  qrImage: string;
  helperText: string;
  active: boolean;
  isLink: boolean;
};

const placeholderDestinations: Record<PaymentOptionId, string> = {
  venmo: "[VENMO_LINK]",
  paypal: "[PAYPAL_LINK]",
  cashApp: "[CASHAPP_LINK]",
  zelle: "[ZELLE_INFO_OR_LINK]",
  applePay: "[APPLE_PAY_INFO_OR_LINK]",
  donation: "/donate",
};

const paymentBrandMarks: Record<
  PaymentOptionId,
  { mark: string; label: string; className: string }
> = {
  venmo: {
    mark: "venmo",
    label: "Venmo",
    className: "bg-[#008CFF] text-white",
  },
  paypal: {
    mark: "PayPal",
    label: "PayPal",
    className: "bg-[#003087] text-white",
  },
  cashApp: {
    mark: "$",
    label: "Cash App",
    className: "bg-[#00D632] text-white",
  },
  zelle: {
    mark: "Zelle",
    label: "Zelle",
    className: "bg-[#6D1ED4] text-white",
  },
  applePay: {
    mark: "Pay",
    label: "Apple Cash / Apple Pay",
    className: "bg-[#111111] text-white",
  },
  donation: {
    mark: "IF",
    label: "Instrument Fund",
    className: "bg-gold text-espresso",
  },
};

function isLinkDestination(value: string) {
  return (
    /^https?:\/\//i.test(value) ||
    /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ||
    /^mailto:/i.test(value) ||
    value.startsWith("/") ||
    /^www\./i.test(value)
  );
}

function linkHref(value: string) {
  return /^www\./i.test(value) ? `https://${value}` : value;
}

function opensInNewTab(value: string) {
  return /^https?:\/\//i.test(value) || /^www\./i.test(value);
}

function normalizeDestination(value: string, id: PaymentOptionId) {
  return value.trim() || placeholderDestinations[id];
}

function PaymentIcon({
  id,
  label,
  variant,
}: {
  id: PaymentOptionId;
  label: string;
  variant: "default" | "modal";
}) {
  const brand = paymentBrandMarks[id];

  return (
    <span
      className={`grid place-items-center rounded-[18px] px-2 text-center font-bold leading-none tracking-[0.02em] shadow-[0_14px_34px_rgba(16,10,6,0.22)] transition group-hover:scale-[1.03] ${
        brand.className
      } ${
        variant === "modal"
          ? "h-12 w-14 text-[0.62rem] ring-1 ring-[#fffaf3]/[0.2] sm:h-14 sm:w-16 sm:text-[0.7rem]"
          : "h-14 w-16 text-[0.7rem]"
      }`}
      aria-hidden="true"
      title={label}
    >
      {brand.mark}
    </span>
  );
}

function PaymentTileContent({
  option,
  variant,
}: {
  option: PaymentOption;
  variant: "default" | "modal";
}) {
  return (
    <>
      <PaymentIcon id={option.id} label={option.label} variant={variant} />
      <span
        className={`mt-2 block text-center text-[0.68rem] font-medium uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em] ${
          variant === "modal" ? "text-[#fffaf3]" : "text-espresso"
        }`}
      >
        {paymentBrandMarks[option.id]?.label || option.label}
      </span>
    </>
  );
}

export function SupportTip({
  title = "Payment Options",
  description = "Choose your preferred payment app to send a tip.",
  secondaryDescription = "Tips are always optional and appreciated.",
  className = "",
  compact = false,
  includeDisclosure = true,
  includeInstrumentFundCard = true,
  showPlaceholderOptions = false,
  onOptionClick,
  variant = "default",
}: SupportTipProps) {
  const [siteDetails, setSiteDetails] = useState(defaultSiteDetails);
  const [selectedInfo, setSelectedInfo] = useState<PaymentOption | null>(null);
  const [copiedInfo, setCopiedInfo] = useState(false);

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

  const { paymentOptions, instrumentFundOption } = useMemo(() => {
    const links = siteDetails.paymentTipLinks;
    const rawPaymentOptions: PaymentOption[] = [
      {
        id: "venmo",
        label: links.venmoDisplayLabel || "Venmo",
        destination: normalizeDestination(links.venmoLink, "venmo"),
        qrImage: links.venmoQrImage,
        helperText: links.venmoHelperText,
        active: links.venmoActive,
        isLink: isLinkDestination(links.venmoLink),
      },
      {
        id: "paypal",
        label: links.paypalDisplayLabel || "PayPal",
        destination: normalizeDestination(links.paypalLink, "paypal"),
        qrImage: links.paypalQrImage,
        helperText: links.paypalHelperText,
        active: links.paypalActive,
        isLink: isLinkDestination(links.paypalLink),
      },
      {
        id: "cashApp",
        label: links.cashAppDisplayLabel || "Cash App",
        destination: normalizeDestination(links.cashAppLink, "cashApp"),
        qrImage: links.cashAppQrImage,
        helperText: links.cashAppHelperText,
        active: links.cashAppActive,
        isLink: isLinkDestination(links.cashAppLink),
      },
      {
        id: "zelle",
        label: links.zelleDisplayName || "Zelle",
        destination: normalizeDestination(links.zelleContact, "zelle"),
        qrImage: links.zelleQrImage,
        helperText: links.zelleHelperText,
        active: links.zelleActive,
        isLink: isLinkDestination(links.zelleContact),
      },
      {
        id: "applePay",
        label: links.applePayDisplayLabel || "Apple Cash / Apple Pay",
        destination: normalizeDestination(links.applePayLink, "applePay"),
        qrImage: links.applePayQrImage,
        helperText: links.applePayHelperText,
        active: links.applePayActive,
        isLink: isLinkDestination(links.applePayLink),
      },
    ];

    const paymentOptions = rawPaymentOptions.filter((option) => {
      const hasConfiguredValue = Boolean(
        option.destination.trim() || option.qrImage.trim(),
      );
      return option.active || (showPlaceholderOptions && hasConfiguredValue);
    });

    const instrumentFundOption: PaymentOption = {
      id: "donation",
      label: links.donationDisplayLabel || "Instrument Fund",
      destination: normalizeDestination(links.donationLink, "donation"),
      qrImage: links.donationQrImage,
      helperText: links.donationHelperText,
      active: links.donationActive,
      isLink: isLinkDestination(links.donationLink),
    };

    return { paymentOptions, instrumentFundOption };
  }, [siteDetails.paymentTipLinks, showPlaceholderOptions]);

  const copySelectedInfo = async () => {
    if (!selectedInfo) {
      return;
    }

    try {
      await window.navigator.clipboard.writeText(selectedInfo.destination);
      setCopiedInfo(true);
      window.setTimeout(() => setCopiedInfo(false), 1600);
    } catch {
      setCopiedInfo(false);
    }
  };

  const showEmptyState = paymentOptions.length === 0;
  const isModal = variant === "modal";

  return (
    <section
      className={`${
        isModal
          ? "text-[#fffaf3]"
          : "border border-gold/20 bg-ivory/70 text-espresso shadow-[0_18px_60px_rgba(91,67,38,0.14)]"
      } ${compact ? "p-0" : "p-5 sm:p-6"} ${className}`}
      aria-label="Optional support and tip options"
    >
      <div className={compact ? "mb-4 text-center" : "mb-5 text-center"}>
        <p
          className={`text-xs uppercase tracking-[0.24em] ${
            isModal ? "text-gold" : "text-gold"
          }`}
        >
          {title}
        </p>
        {description ? (
          <p
            className={`mx-auto mt-2 max-w-xl text-sm leading-6 ${
              isModal ? "text-[#fffaf3]/[0.82]" : "text-espresso/75"
            }`}
          >
            {description}
          </p>
        ) : null}
        {secondaryDescription ? (
          <p
            className={`mx-auto mt-1 max-w-xl text-sm leading-6 ${
              isModal ? "text-[#fffaf3]/[0.72]" : "text-espresso/65"
            }`}
          >
            {secondaryDescription}
          </p>
        ) : null}
      </div>

      {showEmptyState ? (
        <div
          className={`border p-4 text-center ${
            isModal
              ? "border-gold/25 bg-[#fffaf3]/[0.07]"
              : "border-gold/25 bg-gold/10"
          }`}
        >
          <p
            className={`text-sm leading-7 ${
              isModal ? "text-[#fffaf3]/[0.75]" : "text-espresso/70"
            }`}
          >
            Payment links are being prepared. Support options will appear here
            when they are active.
          </p>
        </div>
      ) : (
        <div
          className={
            isModal
              ? "grid grid-cols-2 gap-2.5 sm:grid-cols-6 sm:gap-3"
              : "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4"
          }
        >
          {paymentOptions.map((option, index) => {
            const modalPositionClass =
              index === 3 ? "sm:col-start-2 sm:col-span-2" : "sm:col-span-2";
            const tileClass = isModal
              ? `group flex min-h-24 flex-col items-center justify-center border border-gold/35 bg-[#3a2a22]/[0.88] px-3 py-3 text-center transition hover:-translate-y-0.5 hover:border-gold hover:bg-[#4a3025]/[0.95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-28 sm:px-4 sm:py-4 ${modalPositionClass}`
              : "group flex min-h-32 flex-col items-center justify-center border border-gold/20 bg-linen/80 px-4 py-5 text-center transition hover:-translate-y-0.5 hover:border-gold hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

            if (option.isLink) {
              return (
                <a
                  key={option.id}
                  href={linkHref(option.destination)}
                  target={opensInNewTab(option.destination) ? "_blank" : undefined}
                  rel={
                    opensInNewTab(option.destination) ? "noopener noreferrer" : undefined
                  }
                  onClick={onOptionClick}
                  className={tileClass}
                  aria-label={`Open ${option.label} payment option`}
                >
                  <PaymentTileContent option={option} variant={variant} />
                </a>
              );
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedInfo(option);
                  setCopiedInfo(false);
                }}
                className={tileClass}
                aria-label={`Show ${option.label} payment instructions`}
              >
                <PaymentTileContent option={option} variant={variant} />
              </button>
            );
          })}
        </div>
      )}

      {selectedInfo ? (
        <div
          className={`mt-4 border p-4 ${
            isModal ? "border-gold/25 bg-[#fffaf3]/[0.07]" : "border-gold/25 bg-linen/80"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {selectedInfo.qrImage ? (
              <img
                src={selectedInfo.qrImage}
                alt={`${selectedInfo.label} QR code`}
                className="h-24 w-24 shrink-0 object-contain"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {selectedInfo.label}
              </p>
              {selectedInfo.helperText ? (
                <p
                  className={`mt-2 text-sm leading-7 ${
                    isModal ? "text-[#fffaf3]/[0.72]" : "text-espresso/70"
                  }`}
                >
                  {selectedInfo.helperText}
                </p>
              ) : null}
              <p
                className={`mt-3 break-words text-sm font-medium ${
                  isModal ? "text-[#fffaf3]" : "text-espresso"
                }`}
              >
                {selectedInfo.destination}
              </p>
              {!selectedInfo.destination.startsWith("[") ? (
                <button
                  type="button"
                  onClick={copySelectedInfo}
                  className={`mt-4 inline-flex min-h-10 items-center justify-center border px-4 text-xs font-medium uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                    isModal
                      ? "border-gold/40 text-[#fffaf3] hover:border-gold hover:bg-gold/15"
                      : "border-gold/40 text-espresso hover:border-gold hover:bg-gold"
                  }`}
                >
                  {copiedInfo ? "Copied" : "Copy Instructions"}
                </button>
              ) : (
                <p
                  className={`mt-4 text-xs leading-6 ${
                    isModal ? "text-[#fffaf3]/[0.58]" : "text-espresso/60"
                  }`}
                >
                  This payment destination is a placeholder until the final link
                  or instructions are added in Global Settings.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {includeInstrumentFundCard && instrumentFundOption.active ? (
        <div
          className={`mt-4 border p-4 ${
            isModal ? "border-gold/35 bg-gold/10" : "border-gold/25 bg-gold/10"
          }`}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            Student Instrument Fund
          </p>
          <p
            className={`mt-3 text-sm leading-7 ${
              isModal ? "text-[#fffaf3]/[0.75]" : "text-espresso/70"
            }`}
          >
            {instrumentFundOption.helperText ||
              "Support the student instrument fund for repairs, strings, bows, cases, and maintenance."}
          </p>
          {instrumentFundOption.isLink ? (
            <a
              href={instrumentFundOption.destination}
              target={opensInNewTab(instrumentFundOption.destination) ? "_blank" : undefined}
              rel={
                opensInNewTab(instrumentFundOption.destination)
                  ? "noopener noreferrer"
                  : undefined
              }
              className="mt-4 inline-flex min-h-10 items-center justify-center bg-gold px-4 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Learn More
            </a>
          ) : null}
        </div>
      ) : null}

      {includeDisclosure && siteDetails.paymentTipLinks.donationDisclosureText ? (
        <p
          className={`mt-4 text-xs leading-6 ${
            isModal ? "text-[#fffaf3]/[0.65]" : "text-espresso/65"
          }`}
        >
          {siteDetails.paymentTipLinks.donationDisclosureText}
        </p>
      ) : null}
    </section>
  );
}
