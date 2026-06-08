export type RepairSectionContent = {
  id: string;
  navLabel?: string;
  eyebrow: string;
  title: string;
  body: string[];
  listTitle?: string;
  listItems?: string[];
};

export type RepairSlideshowImage = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  zoom?: number;
  cropRatioWidth?: number;
  cropRatioHeight?: number;
  customFrameWidth?: number;
  customFrameHeight?: number;
  cropPresetName?: string;
};

export type RepairContentData = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    titleSize?: string;
    titleColor?: string;
    subtitleSize?: string;
    subtitleColor?: string;
    body: string[];
    ctaLabel: string;
  };
  bench: RepairSectionContent;
  slideshowImages: RepairSlideshowImage[];
  sections: RepairSectionContent[];
  finalCta: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
  };
};

export const defaultRepairSlideshowImages: RepairSlideshowImage[] = [
  {
    src: "/media/repair/bow-tip-workbench.jpeg",
    alt: "Bow repair work at the bench",
  },
  {
    src: "/media/repair/bow-winding-workbench.jpeg",
    alt: "Bow winding work in progress",
  },
  {
    src: "/media/repair/bow-winding-close.jpeg",
    alt: "Close detail of bow winding",
  },
  {
    src: "/media/repair/bow-frog-close.jpeg",
    alt: "Close detail of a bow frog",
  },
  {
    src: "/media/repair/bow-side-case.jpeg",
    alt: "Bow head and stick detail",
  },
  {
    src: "/media/repair/bow-hair-end.jpeg",
    alt: "Bow hair and tip detail",
  },
  {
    src: "/media/repair/bow-head-side.jpeg",
    alt: "Bow head side detail",
  },
  {
    src: "/media/repair/bow-tip-close.jpeg",
    alt: "Close view of bow tip repair work",
  },
  {
    src: "/media/repair/bow-tip-front.jpeg",
    alt: "Front view of a bow tip",
  },
  {
    src: "/media/repair/bow-pearl-slide.jpeg",
    alt: "Pearl slide detail for bow repair",
  },
];

export const defaultRepairContent: RepairContentData = {
  hero: {
    eyebrow: "Instrument Care",
    title: "Bow Rehair, Repair, and Instrument Care",
    subtitle: "Professional bow work and player-focused setup for string players.",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
    body: [
      "Your instrument and bow should help you play with confidence. When the setup is uncomfortable, the bow hair is worn, the bridge is poorly fitted, or the instrument feels slow to respond, playing becomes harder than it needs to be.",
      "I offer bow rehair and bow repair for violin, viola, cello, bass, and period-instrument bows, along with instrument care and setup support for violin, viola, and cello players.",
      "My work combines professional performance experience with practical bench training, giving me a player’s understanding of sound, response, comfort, and function.",
    ],
    ctaLabel: "Request Bow or Instrument Service",
  },
  bench: {
    id: "bench",
    eyebrow: "At the Bench",
    title: "Close work, careful materials, and practical results.",
    body: [],
  },
  slideshowImages: defaultRepairSlideshowImages,
  sections: [
    {
      id: "bow-rehairs-repair",
      navLabel: "Bow Rehairs and Repair",
      eyebrow: "Bow Rehair & Repair",
      title: "Control, response, and a bow that feels reliable in the hand.",
      body: [
        "A well-maintained bow gives you better control, cleaner articulation, and a more consistent sound. Worn hair, damaged fittings, a loose button, poor camber, or structural damage can all affect how the bow feels in the hand and how it performs on the string.",
        "I provide bow rehair, repair, and maintenance services for violin, viola, cello, bass, and period-instrument bows, from routine rehairs to more involved restoration work.",
        "Not every bow needs the same level of work. Some bows only need a fresh rehair or minor adjustment, while others may require more careful repair. I will evaluate the condition of the bow and explain what is practical before moving forward.",
      ],
      listTitle: "Bow services include",
      listItems: [
        "Bow rehairs",
        "Cleaning and refinishing",
        "Thumb grip and winding replacement",
        "Tip replacement",
        "Metal tip replacement",
        "Frog crack repair and missing wood fill",
        "Straightening and camber adjustment",
        "Button and screw repairs",
        "Pearl replacement",
        "Broken head repair",
        "Broken stick repair",
      ],
    },
    {
      id: "setup-maintenance",
      navLabel: "Set-up & Maintenance",
      eyebrow: "Setup & Maintenance",
      title: "Small adjustments can make an instrument easier to play.",
      body: [
        "A good setup can dramatically improve how an instrument feels and responds. Bridge fit, soundpost placement, peg function, fingerboard condition, string height, and fittings all affect comfort, tone, and playability.",
        "This work is especially important for students and advancing players. Many players struggle with instruments that are simply not set up well. A better setup can make the instrument easier to play, more even across the strings, and more enjoyable to practice.",
        "Setup is not one-size-fits-all. The right setup depends on the player, the instrument, and the goal. A young student, adult amateur, professional performer, and player dealing with tension or discomfort may each need different adjustments.",
        "For larger restoration needs, I may recommend referral to a specialized restoration shop or maker. My goal is to give you an honest assessment of what your instrument needs, what can wait, and what will make the biggest practical difference.",
      ],
      listTitle: "Instrument services include",
      listItems: [
        "Initial setup",
        "Custom setup and playability adjustment",
        "Tone adjustment",
        "Edge gluing",
        "Basic crack repair",
        "Fingerboard planing",
        "Peg refitting",
        "New bridge or bridge refit",
        "New soundpost or soundpost refit",
        "Filling worn edges",
        "Tailpiece replacement",
        "Chin rest replacement",
      ],
    },
    {
      id: "training-background",
      navLabel: "Training & Background",
      eyebrow: "Training & Background",
      title: "Bench work informed by the realities of playing.",
      body: [
        "My repair and setup work is grounded in formal training with Jennifer Becker and continued hands-on study with respected makers and bow specialists including Rodney Mohr, Roger Zabinski, and David Orlin.",
        "That training is paired with years of professional performing and teaching experience. I understand what players feel under the hand and bow, and I use that perspective when evaluating setup, tone, response, comfort, and repair needs.",
      ],
    },
    {
      id: "who-this-is-for",
      eyebrow: "Who This Is For",
      title: "Practical care for students, performers, teachers, and families.",
      body: [],
      listItems: [
        "Violin, viola, and cello students",
        "Parents who want to know whether an instrument is properly set up",
        "Teachers seeking a trusted referral for student instruments",
        "Adult amateurs who want their instrument to feel easier to play",
        "Players needing bow rehairs or bow maintenance",
        "Bass players needing bow rehair or bow repair",
        "Period-instrument players needing bow service",
        "Musicians preparing for auditions, recitals, weddings, or performances",
        "Anyone unsure whether their instrument or bow needs repair",
      ],
    },
    {
      id: "practical-approach",
      eyebrow: "A Practical, Honest Approach",
      title: "Clear recommendations before work begins.",
      body: [
        "Some repairs are essential. Some are optional. Some are not worth doing on a particular instrument or bow.",
        "I will always aim to explain the issue clearly before moving forward. The goal is not to push unnecessary work. The goal is to improve function, sound, comfort, and reliability so the instrument and bow support the player.",
      ],
    },
  ],
  finalCta: {
    eyebrow: "Request a Repair Assessment",
    title: "Need a bow rehair, bow repair, or instrument setup evaluation?",
    body: "Send a message with a few details about the instrument or bow, along with photos if there is visible damage. I’ll let you know whether it sounds like a simple adjustment, a repair, or something that should be evaluated in person.",
    ctaLabel: "Request Bow or Instrument Service",
  },
};

function normalizeParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((paragraph) => String(paragraph).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeList(value: unknown, fallback: string[] = []) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : fallback;
}

function mergeSection(
  defaultSection: RepairSectionContent,
  storedSection?: Partial<RepairSectionContent>,
): RepairSectionContent {
  return {
    ...defaultSection,
    ...storedSection,
    body: normalizeParagraphs(storedSection?.body).length
      ? normalizeParagraphs(storedSection?.body)
      : defaultSection.body,
    listItems: storedSection?.listItems
      ? normalizeList(storedSection.listItems, defaultSection.listItems)
      : defaultSection.listItems,
  };
}

function normalizeSlideshowImages(value: unknown): RepairSlideshowImage[] {
  if (!Array.isArray(value)) {
    return defaultRepairSlideshowImages;
  }

  const images = value
    .map((image): RepairSlideshowImage | null => {
      if (!image || typeof image !== "object") {
        return null;
      }

      const slide = image as Partial<RepairSlideshowImage>;
      const src = typeof slide.src === "string" ? slide.src.trim() : "";

      if (!src) {
        return null;
      }

      return {
        src,
        alt: typeof slide.alt === "string" ? slide.alt : "",
        objectFit: slide.objectFit === "contain" ? "contain" : "cover",
        objectPosition:
          typeof slide.objectPosition === "string"
            ? slide.objectPosition
            : "50% 50%",
        zoom:
          typeof slide.zoom === "number" && Number.isFinite(slide.zoom)
            ? slide.zoom
            : 1,
        cropRatioWidth:
          typeof slide.cropRatioWidth === "number" ? slide.cropRatioWidth : 16,
        cropRatioHeight:
          typeof slide.cropRatioHeight === "number" ? slide.cropRatioHeight : 9,
        customFrameWidth:
          typeof slide.customFrameWidth === "number"
            ? slide.customFrameWidth
            : 1600,
        customFrameHeight:
          typeof slide.customFrameHeight === "number"
            ? slide.customFrameHeight
            : 900,
        cropPresetName:
          typeof slide.cropPresetName === "string" ? slide.cropPresetName : "",
      };
    })
    .filter((image): image is RepairSlideshowImage => Boolean(image));

  return images.length ? images : defaultRepairSlideshowImages;
}

export function normalizeRepairContentData(value: unknown): RepairContentData {
  const content = value as Partial<RepairContentData> | null;

  if (!content) {
    return defaultRepairContent;
  }

  return {
    hero: {
      ...defaultRepairContent.hero,
      ...content.hero,
      body: normalizeParagraphs(content.hero?.body).length
        ? normalizeParagraphs(content.hero?.body)
        : defaultRepairContent.hero.body,
    },
    bench: mergeSection(defaultRepairContent.bench, content.bench),
    slideshowImages: normalizeSlideshowImages(content.slideshowImages),
    sections: defaultRepairContent.sections.map((defaultSection) =>
      mergeSection(
        defaultSection,
        content.sections?.find((section) => section.id === defaultSection.id),
      ),
    ),
    finalCta: {
      ...defaultRepairContent.finalCta,
      ...content.finalCta,
    },
  };
}
