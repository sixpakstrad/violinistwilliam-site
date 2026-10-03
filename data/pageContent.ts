export type EditablePageKey =
  | "main"
  | "about"
  | "education"
  | "music"
  | "stories"
  | "performance"
  | "groups"
  | "rates"
  | "contact"
  | "admin"
  | "requests";

export type EditablePageContent = {
  key: EditablePageKey;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  primaryImage: string;
  titleSize?: string;
  titleColor?: string;
  subtitleSize?: string;
  subtitleColor?: string;
};

export const pageIntroPageKeys = [
  "education",
  "music",
  "performance",
  "groups",
  "rates",
  "contact",
  "requests",
  "admin",
] as const;

export type PageIntroPageKey = (typeof pageIntroPageKeys)[number];

export type PageIntroPageContent = {
  key: PageIntroPageKey;
  eyebrow: string;
  title: string;
  copy: string;
  titleSize: string;
  titleColor: string;
  subtitleSize: string;
  subtitleColor: string;
};

export type PageIntroContent = {
  pages: PageIntroPageContent[];
};

export type PageIntroValidationResult =
  | { success: true; data: PageIntroContent }
  | { success: false; errors: string[] };

export const pageIntroSchemaVersion = 1;

export type SeoSettings = {
  siteTitle: string;
  defaultMetaDescription: string;
  serviceArea: string;
  primaryLocation: string;
  targetSearchPhrases: string;
  venueKeywords: string;
  socialTitle: string;
  socialDescription: string;
  socialImage: string;
  socialImagePosition?: string;
  socialImageFit?: string;
  socialImageZoom?: number;
  socialImageCropRatioWidth?: number;
  socialImageCropRatioHeight?: number;
  socialImageCustomFrameWidth?: number;
  socialImageCustomFrameHeight?: number;
  socialImageCropPresetName?: string;
  pages: SeoPageSettings[];
};

export type SeoPageKey =
  | "home"
  | "performance"
  | "education"
  | "song-library"
  | "about"
  | "stories"
  | "repairs"
  | "contact"
  | "instrument-fund";

export type SeoPageSettings = {
  key: SeoPageKey;
  label: string;
  pageTitle: string;
  metaDescription: string;
  urlSlug: string;
  canonicalUrl: string;
  index: boolean;
  includeInSitemap: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImagePosition?: string;
  ogImageFit?: string;
  ogImageZoom?: number;
  ogImageCropRatioWidth?: number;
  ogImageCropRatioHeight?: number;
  ogImageCustomFrameWidth?: number;
  ogImageCustomFrameHeight?: number;
  ogImageCropPresetName?: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  serviceAreaKeywords: string;
  internalLinkingNotes: string;
  lastUpdated: string;
};

export const pageContentStorageKey = "winspiration.admin.pageContent";
export const seoStorageKey = "winspiration.admin.seo";

export const defaultPageContent: EditablePageContent[] = [
  {
    key: "main",
    label: "Main",
    eyebrow: "Live violin performance",
    title: "William Samorey",
    copy: "Live violin music shaped around YOUR story.",
    primaryImage: "/media/brahms-stained-glass.jpg",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "about",
    label: "About William",
    eyebrow: "About William",
    title:
      "A violin presence shaped by atmosphere, storytelling, and emotional awareness.",
    copy: "",
    primaryImage: "/media/samorey-stage.png",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "education",
    label: "Education",
    eyebrow: "Education",
    title: "Private violin lessons shaped around sound, patience, and progress.",
    copy:
      "A practical teaching home for beginners, advancing students, adult players, and families building a thoughtful musical routine.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "music",
    label: "Song Library",
    eyebrow: "Song Library",
    title: "A song library curated for ceremony, celebration, and atmosphere.",
    copy:
      "Browse repertoire by mood, artist, category, or wedding moment. This is where clients can begin shaping the soundtrack of the event.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "stories",
    label: "Will’s Stories",
    eyebrow: "Will’s Stories",
    title: "Notes from the music, the room, and the road.",
    copy:
      "A journal for reflections on performance, teaching, repertoire, and the moments that make live music feel personal.",
    primaryImage: "/media/brahms-stained-glass.jpg",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "performance",
    label: "Weddings & Events",
    eyebrow: "Weddings & Events",
    title:
      "Live string music, curated by William, for the moments you'll remember.",
    copy:
      "William offers and curates live music ranging from solo violin to chamber ensembles for weddings, celebrations, private events, and special gatherings.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "groups",
    label: "Groups",
    eyebrow: "Groups",
    title:
      "Ensemble options scaled to the room, the guest list, and the feeling.",
    copy:
      "From solo violin to string quartet, each format offers a different level of intimacy, depth, and resonance.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "rates",
    label: "Rates",
    eyebrow: "Rates",
    title: "Wedding packages shaped around timing, location, and musical scope.",
    copy:
      "Pricing below reflects one performer/person. Additional performers, custom requests, and travel details can be quoted after the event date and location are known.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "contact",
    label: "Contact",
    eyebrow: "Contact / Inquire",
    title:
      "Choose the right conversation for the music, lesson, or instrument care you need.",
    copy:
      "Use the inquiry forms below to share performance details, teaching goals, or bow and instrument care questions.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "requests",
    label: "Request Board",
    eyebrow: "Request Board",
    title: "A private dashboard for live song requests.",
    copy:
      "Open this page from your phone during an event to review requests, shape playlists, and pause or reopen guest requests.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  {
    key: "admin",
    label: "Admin",
    eyebrow: "Admin",
    title:
      "Private controls for requests, repertoire, pricing, and site details.",
    copy:
      "This section is designed as the editing home for William Samorey and Winspiration Studio LLC.",
    primaryImage: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
];

const pageIntroPageKeySet = new Set<string>(pageIntroPageKeys);
const maximumPageIntroPayloadBytes = 64 * 1024;

function sourcePageIntroFromLegacyPage(
  page: EditablePageContent,
): PageIntroPageContent {
  return {
    key: page.key as PageIntroPageKey,
    eyebrow: page.eyebrow,
    title: page.title,
    copy: page.copy,
    titleSize: page.titleSize || "",
    titleColor: page.titleColor || "",
    subtitleSize: page.subtitleSize || "",
    subtitleColor: page.subtitleColor || "",
  };
}

export const defaultPageIntroContent: PageIntroContent = {
  pages: pageIntroPageKeys.map((key) => {
    const page = defaultPageContent.find((item) => item.key === key);

    if (!page) {
      throw new Error(`Missing source PageIntro default for ${key}.`);
    }

    return sourcePageIntroFromLegacyPage(page);
  }),
};

export function getSourcePageIntro(
  key: PageIntroPageKey,
): PageIntroPageContent {
  const page = defaultPageIntroContent.pages.find((item) => item.key === key);

  if (!page) {
    throw new Error(`Missing source PageIntro default for ${key}.`);
  }

  return page;
}

function validatePageIntroText(options: {
  value: unknown;
  label: string;
  maximumLength: number;
  allowEmpty?: boolean;
  errors: string[];
}) {
  if (typeof options.value !== "string") {
    options.errors.push(`${options.label} must be text.`);
    return "";
  }

  const normalizedValue = options.value.trim();

  if (!options.allowEmpty && !normalizedValue) {
    options.errors.push(`${options.label} cannot be empty.`);
  } else if (normalizedValue.length > options.maximumLength) {
    options.errors.push(
      `${options.label} cannot exceed ${options.maximumLength} characters.`,
    );
  }

  return normalizedValue;
}

export function validatePageIntroContent(
  value: unknown,
): PageIntroValidationResult {
  const errors: string[] = [];

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, errors: ["PageIntro content must be an object."] };
  }

  let payloadSize = Number.POSITIVE_INFINITY;
  try {
    payloadSize = new TextEncoder().encode(JSON.stringify(value)).length;
  } catch {
    errors.push("PageIntro content must be valid JSON data.");
  }

  if (payloadSize > maximumPageIntroPayloadBytes) {
    errors.push(
      `PageIntro content cannot exceed ${maximumPageIntroPayloadBytes} bytes.`,
    );
  }

  const rawPages = (value as Record<string, unknown>).pages;
  if (!Array.isArray(rawPages)) {
    return {
      success: false,
      errors: [...errors, "PageIntro pages must be an array."],
    };
  }

  if (rawPages.length !== pageIntroPageKeys.length) {
    errors.push(
      `PageIntro content must contain exactly ${pageIntroPageKeys.length} pages.`,
    );
  }

  const recordsByKey = new Map<string, Record<string, unknown>>();
  rawPages.forEach((page, index) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) {
      errors.push(`PageIntro page ${index + 1} must be an object.`);
      return;
    }

    const record = page as Record<string, unknown>;
    const key = typeof record.key === "string" ? record.key : "";
    if (!pageIntroPageKeySet.has(key)) {
      errors.push(`PageIntro page ${index + 1} has an unsupported key.`);
      return;
    }

    if (recordsByKey.has(key)) {
      errors.push(`PageIntro key ${key} appears more than once.`);
      return;
    }

    recordsByKey.set(key, record);
  });

  const pages = pageIntroPageKeys.map((key) => {
    const record = recordsByKey.get(key);
    if (!record) {
      errors.push(`PageIntro content is missing the ${key} page.`);
    }

    return {
      key,
      eyebrow: validatePageIntroText({
        value: record?.eyebrow,
        label: `${key} eyebrow`,
        maximumLength: 120,
        errors,
      }),
      title: validatePageIntroText({
        value: record?.title,
        label: `${key} title`,
        maximumLength: 240,
        errors,
      }),
      copy: validatePageIntroText({
        value: record?.copy,
        label: `${key} supporting copy`,
        maximumLength: 1200,
        allowEmpty: true,
        errors,
      }),
      titleSize: validatePageIntroText({
        value: record?.titleSize,
        label: `${key} title size`,
        maximumLength: 80,
        allowEmpty: true,
        errors,
      }),
      titleColor: validatePageIntroText({
        value: record?.titleColor,
        label: `${key} title color`,
        maximumLength: 80,
        allowEmpty: true,
        errors,
      }),
      subtitleSize: validatePageIntroText({
        value: record?.subtitleSize,
        label: `${key} subtitle size`,
        maximumLength: 80,
        allowEmpty: true,
        errors,
      }),
      subtitleColor: validatePageIntroText({
        value: record?.subtitleColor,
        label: `${key} subtitle color`,
        maximumLength: 80,
        allowEmpty: true,
        errors,
      }),
    };
  });

  return errors.length > 0
    ? { success: false, errors }
    : { success: true, data: { pages } };
}

export const defaultSeoSettings: SeoSettings = {
  siteTitle: "William Samorey | Wedding Violinist in Minnesota",
  defaultMetaDescription:
    "Live violin performance for weddings, private events, and luxury celebrations by William Samorey and Winspiration Studio LLC.",
  serviceArea: "Twin Cities, Minneapolis, St. Paul, greater Minnesota, Iowa, and the Midwest",
  primaryLocation: "Twin Cities, Minnesota",
  targetSearchPhrases:
    "wedding violinist, Minnesota wedding violinist, live violin for weddings, string quartet Minnesota, luxury wedding music",
  venueKeywords: "",
  socialTitle: "William Samorey | Live Violin Storytelling",
  socialDescription:
    "Refined live violin for ceremonies, cocktail hours, private events, and concert settings.",
  socialImage: "/media/samorey-stage.png",
  socialImagePosition: "50% 35%",
  socialImageFit: "cover",
  socialImageZoom: 1,
  socialImageCropRatioWidth: 1200,
  socialImageCropRatioHeight: 630,
  socialImageCustomFrameWidth: 1200,
  socialImageCustomFrameHeight: 630,
  socialImageCropPresetName: "Social Card",
  pages: [
    {
      key: "home",
      label: "Home",
      pageTitle: "William Samorey | Live Violin Performance",
      metaDescription:
        "Live violin music for weddings, private events, education, and instrument care by William Samorey of Winspiration Studio LLC.",
      urlSlug: "/",
      canonicalUrl: "https://violinistwilliam.com/",
      index: true,
      includeInSitemap: true,
      ogTitle: "William Samorey | Live Violin Performance",
      ogDescription:
        "Live violin music shaped around weddings, events, teaching, and the stories behind the music.",
      ogImage: "/media/samorey-stage.png",
      primaryKeyword: "live violinist Minnesota",
      secondaryKeywords: "wedding violinist, event violinist, Twin Cities violinist",
      serviceAreaKeywords: "Twin Cities, Minneapolis, St. Paul, Minnesota",
      internalLinkingNotes: "Link to Performance, Song Library, About, and Contact.",
      lastUpdated: "",
    },
    {
      key: "performance",
      label: "Weddings & Events",
      pageTitle: "Wedding & Event String Music | Minneapolis–St. Paul",
      metaDescription:
        "Live string music curated by William Samorey for weddings, ceremonies, cocktail hours, receptions, private events, and special gatherings throughout the Twin Cities and Midwest.",
      urlSlug: "/weddings-and-events",
      canonicalUrl: "https://violinistwilliam.com/weddings-and-events",
      index: true,
      includeInSitemap: true,
      ogTitle: "Wedding & Event String Music | Minneapolis–St. Paul",
      ogDescription:
        "Live string music curated by William Samorey for weddings, ceremonies, cocktail hours, receptions, private events, and special gatherings throughout the Twin Cities and Midwest.",
      ogImage: "/media/brahms-stained-glass.jpg",
      primaryKeyword: "wedding violinist Minnesota",
      secondaryKeywords: "string quartet Minnesota, ceremony music, cocktail hour violin",
      serviceAreaKeywords: "Twin Cities, Minneapolis, St. Paul, Minnesota, Iowa",
      internalLinkingNotes: "Link to Song Library, Contact, and Rates / Packages.",
      lastUpdated: "",
    },
    {
      key: "education",
      label: "Education",
      pageTitle: "Private Violin Lessons | William Samorey",
      metaDescription:
        "Private violin lessons for beginner, intermediate, advanced, adult, and online students with William Samorey.",
      urlSlug: "/education",
      canonicalUrl: "https://violinistwilliam.com/education",
      index: true,
      includeInSitemap: true,
      ogTitle: "Private Violin Lessons | William Samorey",
      ogDescription:
        "A thoughtful, practical approach to violin study for students building sound, confidence, and musical understanding.",
      ogImage: "/media/education/church-student-group.jpeg",
      primaryKeyword: "private violin lessons Twin Cities",
      secondaryKeywords: "violin teacher, Suzuki violin lessons, online violin lessons",
      serviceAreaKeywords: "St. Paul, St. Louis Park, St. Anthony, Twin Cities",
      internalLinkingNotes: "Link to About, Contact, and Instrument Loan Program.",
      lastUpdated: "",
    },
    {
      key: "song-library",
      label: "Song Library",
      pageTitle: "Violin Song Library | William Samorey",
      metaDescription:
        "Browse William Samorey's violin song library for weddings, funerals, ceremonies, cocktail hours, and live event requests.",
      urlSlug: "/music",
      canonicalUrl: "https://violinistwilliam.com/music",
      index: true,
      includeInSitemap: true,
      ogTitle: "Violin Song Library | William Samorey",
      ogDescription:
        "Explore ceremony favorites, pop selections, classical repertoire, movie music, and live request options.",
      ogImage: "/media/samorey-stage.png",
      primaryKeyword: "violin song list for weddings",
      secondaryKeywords: "wedding violin songs, funeral violin songs, ceremony music",
      serviceAreaKeywords: "Minnesota, Twin Cities, Midwest",
      internalLinkingNotes: "Link to Performance, Contact, and live request information.",
      lastUpdated: "",
    },
    {
      key: "about",
      label: "About",
      pageTitle: "About William Samorey | Violinist",
      metaDescription:
        "Learn about Twin Cities violinist William Samorey, his performance background, orchestral work, teaching, and instrument loan program.",
      urlSlug: "/about",
      canonicalUrl: "https://violinistwilliam.com/about",
      index: true,
      includeInSitemap: true,
      ogTitle: "About William Samorey | Violinist",
      ogDescription:
        "A violinist shaped by atmosphere, storytelling, orchestral experience, teaching, and community music access.",
      ogImage: "/media/samorey-stage.png",
      primaryKeyword: "William Samorey violinist",
      secondaryKeywords: "Twin Cities violinist, Minnesota violinist, concertmaster",
      serviceAreaKeywords: "Twin Cities, Minnesota, Midwest",
      internalLinkingNotes: "Link to Education, Performance, Instrument Loan Program, and Contact.",
      lastUpdated: "",
    },
    {
      key: "stories",
      label: "Stories / Journal",
      pageTitle: "Will’s Stories | William Samorey",
      metaDescription:
        "Reflections from performances, teaching, repertoire, instruments, and the quiet work behind the music.",
      urlSlug: "/stories",
      canonicalUrl: "https://violinistwilliam.com/stories",
      index: true,
      includeInSitemap: true,
      ogTitle: "Will’s Stories | William Samorey",
      ogDescription:
        "A refined personal journal for the moments that happen before, between, and after the notes.",
      ogImage: "/media/brahms-stained-glass.jpg",
      primaryKeyword: "violinist stories",
      secondaryKeywords: "music journal, teaching reflections, performance stories",
      serviceAreaKeywords: "Minnesota, Twin Cities",
      internalLinkingNotes: "Link stories back to Performance, Education, Repairs, and About.",
      lastUpdated: "",
    },
    {
      key: "repairs",
      label: "Repairs",
      pageTitle: "Bow Rehair, Repair, and Instrument Care | William Samorey",
      metaDescription:
        "Professional bow rehair, bow repair, setup, maintenance, and instrument care for violin, viola, cello, bass, and period-instrument bows.",
      urlSlug: "/luthier-services",
      canonicalUrl: "https://violinistwilliam.com/luthier-services",
      index: true,
      includeInSitemap: true,
      ogTitle: "Bow Rehair, Repair, and Instrument Care",
      ogDescription:
        "Player-focused bow work, setup, and maintenance for string players.",
      ogImage: "/media/repair-wood-background.png",
      primaryKeyword: "bow rehair Minnesota",
      secondaryKeywords: "bow repair, violin setup, instrument maintenance",
      serviceAreaKeywords: "Twin Cities, Minnesota, Midwest",
      internalLinkingNotes: "Link to Contact repair inquiry and Training & Background.",
      lastUpdated: "",
    },
    {
      key: "contact",
      label: "Contact / Inquiry",
      pageTitle: "Contact William Samorey | Performance, Lessons, and Repair",
      metaDescription:
        "Contact William Samorey for performance inquiries, teaching inquiries, bow repair, instrument setup, and instrument care.",
      urlSlug: "/contact",
      canonicalUrl: "https://violinistwilliam.com/contact",
      index: true,
      includeInSitemap: true,
      ogTitle: "Contact William Samorey",
      ogDescription:
        "Choose the right inquiry for performance, lessons, bow repair, or instrument care.",
      ogImage: "/media/samorey-stage.png",
      primaryKeyword: "contact William Samorey",
      secondaryKeywords: "book violinist, violin lessons inquiry, bow repair inquiry",
      serviceAreaKeywords: "Twin Cities, Minnesota",
      internalLinkingNotes: "Primary conversion page linked from all services.",
      lastUpdated: "",
    },
    {
      key: "instrument-fund",
      label: "Instrument Fund / Loan Program",
      pageTitle: "Student Instrument Fund and Loan Program | William Samorey",
      metaDescription:
        "Support student access to properly set-up violins and violas through William Samorey's instrument fund and loan program.",
      urlSlug: "/donate",
      canonicalUrl: "https://violinistwilliam.com/donate",
      index: true,
      includeInSitemap: true,
      ogTitle: "Student Instrument Fund and Loan Program",
      ogDescription:
        "Helping young musicians access instruments that support their progress instead of limiting it.",
      ogImage: "/media/education/church-student-group.jpeg",
      primaryKeyword: "student instrument loan program",
      secondaryKeywords: "violin donation, viola loan, student instrument fund",
      serviceAreaKeywords: "Twin Cities, greater Minnesota, Iowa",
      internalLinkingNotes: "Link from About, Education, Footer, and Song Library.",
      lastUpdated: "",
    },
  ],
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

function numberFromRecord(
  record: Record<string, unknown> | undefined,
  key: string,
  fallback: number,
) {
  const value = record?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeSeoPage(value: unknown, fallback: SeoPageSettings): SeoPageSettings {
  const record = isRecord(value) ? value : undefined;

  return {
    ...fallback,
    pageTitle: stringFromRecord(record, "pageTitle", fallback.pageTitle),
    metaDescription: stringFromRecord(
      record,
      "metaDescription",
      fallback.metaDescription,
    ),
    urlSlug: stringFromRecord(record, "urlSlug", fallback.urlSlug),
    canonicalUrl: stringFromRecord(record, "canonicalUrl", fallback.canonicalUrl),
    index: booleanFromRecord(record, "index", fallback.index),
    includeInSitemap: booleanFromRecord(
      record,
      "includeInSitemap",
      fallback.includeInSitemap,
    ),
    ogTitle: stringFromRecord(record, "ogTitle", fallback.ogTitle),
    ogDescription: stringFromRecord(
      record,
      "ogDescription",
      fallback.ogDescription,
    ),
    ogImage: stringFromRecord(record, "ogImage", fallback.ogImage),
    ogImagePosition: stringFromRecord(
      record,
      "ogImagePosition",
      fallback.ogImagePosition || "50% 35%",
    ),
    ogImageFit: stringFromRecord(
      record,
      "ogImageFit",
      fallback.ogImageFit || "cover",
    ),
    ogImageZoom: numberFromRecord(record, "ogImageZoom", fallback.ogImageZoom || 1),
    ogImageCropRatioWidth: numberFromRecord(
      record,
      "ogImageCropRatioWidth",
      fallback.ogImageCropRatioWidth || 1200,
    ),
    ogImageCropRatioHeight: numberFromRecord(
      record,
      "ogImageCropRatioHeight",
      fallback.ogImageCropRatioHeight || 630,
    ),
    ogImageCustomFrameWidth: numberFromRecord(
      record,
      "ogImageCustomFrameWidth",
      fallback.ogImageCustomFrameWidth || 1200,
    ),
    ogImageCustomFrameHeight: numberFromRecord(
      record,
      "ogImageCustomFrameHeight",
      fallback.ogImageCustomFrameHeight || 630,
    ),
    ogImageCropPresetName: stringFromRecord(
      record,
      "ogImageCropPresetName",
      fallback.ogImageCropPresetName || "Social Card",
    ),
    primaryKeyword: stringFromRecord(
      record,
      "primaryKeyword",
      fallback.primaryKeyword,
    ),
    secondaryKeywords: stringFromRecord(
      record,
      "secondaryKeywords",
      fallback.secondaryKeywords,
    ),
    serviceAreaKeywords: stringFromRecord(
      record,
      "serviceAreaKeywords",
      fallback.serviceAreaKeywords,
    ),
    internalLinkingNotes: stringFromRecord(
      record,
      "internalLinkingNotes",
      fallback.internalLinkingNotes,
    ),
    lastUpdated: stringFromRecord(record, "lastUpdated", fallback.lastUpdated),
  };
}

export function normalizeSeoSettings(value: unknown): SeoSettings {
  const record = isRecord(value) ? value : undefined;
  const savedPages = Array.isArray(record?.pages) ? record.pages : [];

  return {
    siteTitle: stringFromRecord(record, "siteTitle", defaultSeoSettings.siteTitle),
    defaultMetaDescription: stringFromRecord(
      record,
      "defaultMetaDescription",
      defaultSeoSettings.defaultMetaDescription,
    ),
    serviceArea: stringFromRecord(
      record,
      "serviceArea",
      defaultSeoSettings.serviceArea,
    ),
    primaryLocation: stringFromRecord(
      record,
      "primaryLocation",
      defaultSeoSettings.primaryLocation,
    ),
    targetSearchPhrases: stringFromRecord(
      record,
      "targetSearchPhrases",
      defaultSeoSettings.targetSearchPhrases,
    ),
    venueKeywords: stringFromRecord(
      record,
      "venueKeywords",
      defaultSeoSettings.venueKeywords,
    ),
    socialTitle: stringFromRecord(
      record,
      "socialTitle",
      defaultSeoSettings.socialTitle,
    ),
    socialDescription: stringFromRecord(
      record,
      "socialDescription",
      defaultSeoSettings.socialDescription,
    ),
    socialImage: stringFromRecord(
      record,
      "socialImage",
      defaultSeoSettings.socialImage,
    ),
    socialImagePosition: stringFromRecord(
      record,
      "socialImagePosition",
      defaultSeoSettings.socialImagePosition || "50% 35%",
    ),
    socialImageFit: stringFromRecord(
      record,
      "socialImageFit",
      defaultSeoSettings.socialImageFit || "cover",
    ),
    socialImageZoom: numberFromRecord(
      record,
      "socialImageZoom",
      defaultSeoSettings.socialImageZoom || 1,
    ),
    socialImageCropRatioWidth: numberFromRecord(
      record,
      "socialImageCropRatioWidth",
      defaultSeoSettings.socialImageCropRatioWidth || 1200,
    ),
    socialImageCropRatioHeight: numberFromRecord(
      record,
      "socialImageCropRatioHeight",
      defaultSeoSettings.socialImageCropRatioHeight || 630,
    ),
    socialImageCustomFrameWidth: numberFromRecord(
      record,
      "socialImageCustomFrameWidth",
      defaultSeoSettings.socialImageCustomFrameWidth || 1200,
    ),
    socialImageCustomFrameHeight: numberFromRecord(
      record,
      "socialImageCustomFrameHeight",
      defaultSeoSettings.socialImageCustomFrameHeight || 630,
    ),
    socialImageCropPresetName: stringFromRecord(
      record,
      "socialImageCropPresetName",
      defaultSeoSettings.socialImageCropPresetName || "Social Card",
    ),
    pages: defaultSeoSettings.pages.map((fallbackPage) => {
      const savedPage = savedPages.find(
        (page) => isRecord(page) && page.key === fallbackPage.key,
      );
      return normalizeSeoPage(savedPage, fallbackPage);
    }),
  };
}
