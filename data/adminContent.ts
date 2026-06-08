export type PopupFrequency = "once-per-session" | "once-per-day" | "every-visit";

export type SiteDetails = {
  businessIdentity: {
    publicBrandName: string;
    legalBusinessName: string;
    ownerPerformerName: string;
    mainTagline: string;
    shortSiteDescription: string;
    primaryServiceArea: string;
    extendedTravelArea: string;
    primaryBusinessEmail: string;
    optionalPhoneNumber: string;
  };
  socialReviewLinks: {
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    googleReview: string;
    gigSalad: string;
    theBash: string;
  };
  paymentTipLinks: {
    venmoDisplayLabel: string;
    venmoLink: string;
    venmoQrImage: string;
    venmoActive: boolean;
    venmoHelperText: string;
    zelleDisplayName: string;
    zelleContact: string;
    zelleQrImage: string;
    zelleActive: boolean;
    zelleHelperText: string;
    cashAppDisplayLabel: string;
    cashAppLink: string;
    cashAppQrImage: string;
    cashAppActive: boolean;
    cashAppHelperText: string;
    paypalDisplayLabel: string;
    paypalLink: string;
    paypalQrImage: string;
    paypalActive: boolean;
    paypalHelperText: string;
    applePayDisplayLabel: string;
    applePayLink: string;
    applePayQrImage: string;
    applePayActive: boolean;
    applePayHelperText: string;
    stripeDisplayLabel: string;
    stripePaymentLink: string;
    stripeQrImage: string;
    stripeActive: boolean;
    stripeHelperText: string;
    donationDisplayLabel: string;
    donationLink: string;
    donationQrImage: string;
    donationActive: boolean;
    donationHelperText: string;
    donationDisclosureText: string;
  };
  announcementPopup: {
    announcementBarEnabled: boolean;
    announcementBarText: string;
    announcementBarCtaLabel: string;
    announcementBarCtaUrl: string;
    popupEnabled: boolean;
    popupTitle: string;
    popupBody: string;
    popupCtaLabel: string;
    popupCtaUrl: string;
    popupFrequency: PopupFrequency;
    popupOverlayOpacity: string;
  };
  footer: {
    shortDescription: string;
    copyrightText: string;
    serviceAreaText: string;
    donationInstrumentFundText: string;
  };
};

export const adminStorageKeys = {
  songs: "winspiration.admin.songs",
  rateGuides: "winspiration.admin.rateGuides",
  addOns: "winspiration.admin.addOns",
  siteDetails: "winspiration.admin.siteDetails",
  stories: "winspiration.admin.stories",
  education: "winspiration.admin.education",
  repairs: "winspiration.admin.repairs",
  upcomingPerformances: "winspiration.admin.upcomingPerformances",
  mainPage: "winspiration.admin.mainPage",
  about: "winspiration.admin.about",
  donate: "winspiration.admin.donate",
};

export const defaultSiteDetails: SiteDetails = {
  businessIdentity: {
    publicBrandName: "William Samorey",
    legalBusinessName: "Winspiration Studio LLC",
    ownerPerformerName: "William Samorey",
    mainTagline: "Winning Mindsets & Inspiring Music.",
    shortSiteDescription:
      "Live violin performance, teaching, bow repair, and instrument care shaped with artistry and practical experience.",
    primaryServiceArea: "Twin Cities, Minneapolis, St. Paul, and greater Minnesota",
    extendedTravelArea: "Minnesota, Iowa, and the Midwest",
    primaryBusinessEmail: "",
    optionalPhoneNumber: "",
  },
  socialReviewLinks: {
    youtube: "https://www.youtube.com/@williamsamorey",
    instagram: "https://www.instagram.com/violinist_william",
    facebook: "https://www.facebook.com/violinistwilliam/",
    tiktok: "",
    googleReview: "",
    gigSalad: "",
    theBash: "",
  },
  paymentTipLinks: {
    venmoDisplayLabel: "Venmo",
    venmoLink: "[VENMO_LINK]",
    venmoQrImage: "",
    venmoActive: true,
    venmoHelperText: "Optional tips may be sent through Venmo.",
    zelleDisplayName: "Zelle",
    zelleContact: "[ZELLE_INFO_OR_LINK]",
    zelleQrImage: "",
    zelleActive: true,
    zelleHelperText: "Zelle details can be shared when appropriate.",
    cashAppDisplayLabel: "Cash App",
    cashAppLink: "[CASHAPP_LINK]",
    cashAppQrImage: "",
    cashAppActive: true,
    cashAppHelperText: "Use Cash App if that is your preferred way to send a tip.",
    paypalDisplayLabel: "PayPal",
    paypalLink: "[PAYPAL_LINK]",
    paypalQrImage: "",
    paypalActive: true,
    paypalHelperText: "Optional support may be sent through PayPal.",
    applePayDisplayLabel: "Apple Cash / Apple Pay",
    applePayLink: "[APPLE_PAY_INFO_OR_LINK]",
    applePayQrImage: "",
    applePayActive: true,
    applePayHelperText: "Apple Cash or Apple Pay details can be shared when available.",
    stripeDisplayLabel: "Card / Apple Pay / Google Pay",
    stripePaymentLink: "",
    stripeQrImage: "",
    stripeActive: false,
    stripeHelperText: "Use this option for card, Apple Pay, or Google Pay.",
    donationDisplayLabel: "Instrument Fund",
    donationLink: "/donate",
    donationQrImage: "",
    donationActive: true,
    donationHelperText:
      "Support the student instrument fund for repairs, strings, bows, cases, and maintenance.",
    donationDisclosureText:
      "Support through this page should not be assumed to be tax-deductible unless clearly stated.",
  },
  announcementPopup: {
    announcementBarEnabled: false,
    announcementBarText: "",
    announcementBarCtaLabel: "",
    announcementBarCtaUrl: "",
    popupEnabled: false,
    popupTitle: "",
    popupBody: "",
    popupCtaLabel: "",
    popupCtaUrl: "",
    popupFrequency: "once-per-session",
    popupOverlayOpacity: "65",
  },
  footer: {
    shortDescription: "Winspiration Studio LLC · Winning Mindsets & Inspiring Music.",
    copyrightText: "© 2026 Winspiration Studio LLC. All rights reserved.",
    serviceAreaText: "",
    donationInstrumentFundText: "",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function stringFromRecord(
  record: Record<string, unknown> | undefined,
  key: string,
  fallback: string,
) {
  const value = record?.[key];
  return typeof value === "string" ? value : fallback;
}

function booleanFromRecord(
  record: Record<string, unknown> | undefined,
  key: string,
  fallback: boolean,
) {
  const value = record?.[key];
  return typeof value === "boolean" ? value : fallback;
}

function popupFrequencyFromRecord(
  record: Record<string, unknown> | undefined,
  key: string,
  fallback: PopupFrequency,
): PopupFrequency {
  const value = record?.[key];
  return value === "once-per-session" ||
    value === "once-per-day" ||
    value === "every-visit"
    ? value
    : fallback;
}

export function normalizeSiteDetails(value: unknown): SiteDetails {
  if (!isRecord(value)) {
    return defaultSiteDetails;
  }

  const businessIdentity = isRecord(value.businessIdentity)
    ? value.businessIdentity
    : undefined;
  const socialReviewLinks = isRecord(value.socialReviewLinks)
    ? value.socialReviewLinks
    : undefined;
  const paymentTipLinks = isRecord(value.paymentTipLinks)
    ? value.paymentTipLinks
    : undefined;
  const announcementPopup = isRecord(value.announcementPopup)
    ? value.announcementPopup
    : undefined;
  const footer = isRecord(value.footer) ? value.footer : undefined;

  return {
    businessIdentity: {
      publicBrandName: stringFromRecord(
        businessIdentity,
        "publicBrandName",
        defaultSiteDetails.businessIdentity.publicBrandName,
      ),
      legalBusinessName: stringFromRecord(
        businessIdentity,
        "legalBusinessName",
        defaultSiteDetails.businessIdentity.legalBusinessName,
      ),
      ownerPerformerName: stringFromRecord(
        businessIdentity,
        "ownerPerformerName",
        defaultSiteDetails.businessIdentity.ownerPerformerName,
      ),
      mainTagline: stringFromRecord(
        businessIdentity,
        "mainTagline",
        defaultSiteDetails.businessIdentity.mainTagline,
      ),
      shortSiteDescription: stringFromRecord(
        businessIdentity,
        "shortSiteDescription",
        defaultSiteDetails.businessIdentity.shortSiteDescription,
      ),
      primaryServiceArea: stringFromRecord(
        businessIdentity,
        "primaryServiceArea",
        defaultSiteDetails.businessIdentity.primaryServiceArea,
      ),
      extendedTravelArea: stringFromRecord(
        businessIdentity,
        "extendedTravelArea",
        defaultSiteDetails.businessIdentity.extendedTravelArea,
      ),
      primaryBusinessEmail:
        stringFromRecord(businessIdentity, "primaryBusinessEmail", "") ||
        stringFromRecord(value, "contactEmail", ""),
      optionalPhoneNumber:
        stringFromRecord(businessIdentity, "optionalPhoneNumber", "") ||
        stringFromRecord(value, "phone", ""),
    },
    socialReviewLinks: {
      youtube: stringFromRecord(
        socialReviewLinks,
        "youtube",
        defaultSiteDetails.socialReviewLinks.youtube,
      ),
      instagram: stringFromRecord(
        socialReviewLinks,
        "instagram",
        defaultSiteDetails.socialReviewLinks.instagram,
      ),
      facebook: stringFromRecord(
        socialReviewLinks,
        "facebook",
        defaultSiteDetails.socialReviewLinks.facebook,
      ),
      tiktok: stringFromRecord(socialReviewLinks, "tiktok", ""),
      googleReview: stringFromRecord(socialReviewLinks, "googleReview", ""),
      gigSalad: stringFromRecord(socialReviewLinks, "gigSalad", ""),
      theBash: stringFromRecord(socialReviewLinks, "theBash", ""),
    },
    paymentTipLinks: {
      venmoDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "venmoDisplayLabel",
        defaultSiteDetails.paymentTipLinks.venmoDisplayLabel,
      ),
      venmoLink: stringFromRecord(
        paymentTipLinks,
        "venmoLink",
        defaultSiteDetails.paymentTipLinks.venmoLink,
      ),
      venmoQrImage: stringFromRecord(paymentTipLinks, "venmoQrImage", ""),
      venmoActive: booleanFromRecord(
        paymentTipLinks,
        "venmoActive",
        defaultSiteDetails.paymentTipLinks.venmoActive,
      ),
      venmoHelperText: stringFromRecord(
        paymentTipLinks,
        "venmoHelperText",
        defaultSiteDetails.paymentTipLinks.venmoHelperText,
      ),
      zelleDisplayName: stringFromRecord(
        paymentTipLinks,
        "zelleDisplayName",
        defaultSiteDetails.paymentTipLinks.zelleDisplayName,
      ),
      zelleContact: stringFromRecord(
        paymentTipLinks,
        "zelleContact",
        defaultSiteDetails.paymentTipLinks.zelleContact,
      ),
      zelleQrImage: stringFromRecord(paymentTipLinks, "zelleQrImage", ""),
      zelleActive: booleanFromRecord(
        paymentTipLinks,
        "zelleActive",
        defaultSiteDetails.paymentTipLinks.zelleActive,
      ),
      zelleHelperText: stringFromRecord(
        paymentTipLinks,
        "zelleHelperText",
        defaultSiteDetails.paymentTipLinks.zelleHelperText,
      ),
      cashAppDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "cashAppDisplayLabel",
        defaultSiteDetails.paymentTipLinks.cashAppDisplayLabel,
      ),
      cashAppLink: stringFromRecord(
        paymentTipLinks,
        "cashAppLink",
        defaultSiteDetails.paymentTipLinks.cashAppLink,
      ),
      cashAppQrImage: stringFromRecord(paymentTipLinks, "cashAppQrImage", ""),
      cashAppActive: booleanFromRecord(
        paymentTipLinks,
        "cashAppActive",
        defaultSiteDetails.paymentTipLinks.cashAppActive,
      ),
      cashAppHelperText: stringFromRecord(
        paymentTipLinks,
        "cashAppHelperText",
        defaultSiteDetails.paymentTipLinks.cashAppHelperText,
      ),
      paypalDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "paypalDisplayLabel",
        defaultSiteDetails.paymentTipLinks.paypalDisplayLabel,
      ),
      paypalLink: stringFromRecord(
        paymentTipLinks,
        "paypalLink",
        defaultSiteDetails.paymentTipLinks.paypalLink,
      ),
      paypalQrImage: stringFromRecord(paymentTipLinks, "paypalQrImage", ""),
      paypalActive: booleanFromRecord(
        paymentTipLinks,
        "paypalActive",
        defaultSiteDetails.paymentTipLinks.paypalActive,
      ),
      paypalHelperText: stringFromRecord(
        paymentTipLinks,
        "paypalHelperText",
        defaultSiteDetails.paymentTipLinks.paypalHelperText,
      ),
      applePayDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "applePayDisplayLabel",
        defaultSiteDetails.paymentTipLinks.applePayDisplayLabel,
      ),
      applePayLink: stringFromRecord(
        paymentTipLinks,
        "applePayLink",
        defaultSiteDetails.paymentTipLinks.applePayLink,
      ),
      applePayQrImage: stringFromRecord(paymentTipLinks, "applePayQrImage", ""),
      applePayActive: booleanFromRecord(
        paymentTipLinks,
        "applePayActive",
        defaultSiteDetails.paymentTipLinks.applePayActive,
      ),
      applePayHelperText: stringFromRecord(
        paymentTipLinks,
        "applePayHelperText",
        defaultSiteDetails.paymentTipLinks.applePayHelperText,
      ),
      stripeDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "stripeDisplayLabel",
        defaultSiteDetails.paymentTipLinks.stripeDisplayLabel,
      ),
      stripePaymentLink: stringFromRecord(
        paymentTipLinks,
        "stripePaymentLink",
        "",
      ),
      stripeQrImage: stringFromRecord(paymentTipLinks, "stripeQrImage", ""),
      stripeActive: booleanFromRecord(paymentTipLinks, "stripeActive", false),
      stripeHelperText: stringFromRecord(
        paymentTipLinks,
        "stripeHelperText",
        defaultSiteDetails.paymentTipLinks.stripeHelperText,
      ),
      donationDisplayLabel: stringFromRecord(
        paymentTipLinks,
        "donationDisplayLabel",
        defaultSiteDetails.paymentTipLinks.donationDisplayLabel,
      ),
      donationLink: stringFromRecord(
        paymentTipLinks,
        "donationLink",
        defaultSiteDetails.paymentTipLinks.donationLink,
      ),
      donationQrImage: stringFromRecord(paymentTipLinks, "donationQrImage", ""),
      donationActive: booleanFromRecord(paymentTipLinks, "donationActive", true),
      donationHelperText: stringFromRecord(
        paymentTipLinks,
        "donationHelperText",
        defaultSiteDetails.paymentTipLinks.donationHelperText,
      ),
      donationDisclosureText: stringFromRecord(
        paymentTipLinks,
        "donationDisclosureText",
        defaultSiteDetails.paymentTipLinks.donationDisclosureText,
      ),
    },
    announcementPopup: {
      announcementBarEnabled: booleanFromRecord(
        announcementPopup,
        "announcementBarEnabled",
        false,
      ),
      announcementBarText: stringFromRecord(
        announcementPopup,
        "announcementBarText",
        stringFromRecord(value, "publicAnnouncement", ""),
      ),
      announcementBarCtaLabel: stringFromRecord(
        announcementPopup,
        "announcementBarCtaLabel",
        "",
      ),
      announcementBarCtaUrl: stringFromRecord(
        announcementPopup,
        "announcementBarCtaUrl",
        "",
      ),
      popupEnabled: booleanFromRecord(announcementPopup, "popupEnabled", false),
      popupTitle: stringFromRecord(announcementPopup, "popupTitle", ""),
      popupBody: stringFromRecord(announcementPopup, "popupBody", ""),
      popupCtaLabel: stringFromRecord(announcementPopup, "popupCtaLabel", ""),
      popupCtaUrl: stringFromRecord(announcementPopup, "popupCtaUrl", ""),
      popupFrequency: popupFrequencyFromRecord(
        announcementPopup,
        "popupFrequency",
        "once-per-session",
      ),
      popupOverlayOpacity: stringFromRecord(
        announcementPopup,
        "popupOverlayOpacity",
        defaultSiteDetails.announcementPopup.popupOverlayOpacity,
      ),
    },
    footer: {
      shortDescription: stringFromRecord(
        footer,
        "shortDescription",
        defaultSiteDetails.footer.shortDescription,
      ),
      copyrightText: stringFromRecord(
        footer,
        "copyrightText",
        defaultSiteDetails.footer.copyrightText,
      ),
      serviceAreaText: stringFromRecord(footer, "serviceAreaText", ""),
      donationInstrumentFundText: stringFromRecord(
        footer,
        "donationInstrumentFundText",
        "",
      ),
    },
  };
}
