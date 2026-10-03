export type RateGuide = {
  title: string;
  price: string;
  description: string;
};

export type EnsembleGuide = {
  eyebrow: string;
  heading: string;
  body: string;
  closing: string;
};

export type PricingContent = {
  ensembleGuide: EnsembleGuide;
  rateGuides: RateGuide[];
  addOns: string[];
};

export type PricingValidationResult =
  | { success: true; data: PricingContent }
  | { success: false; errors: string[] };

export const pricingSchemaVersion = 1;

const expectedPackageCount = 5;
const maximumAddOnCount = 30;
const maximumPricingPayloadBytes = 64 * 1024;

export const defaultEnsembleGuide: EnsembleGuide = {
  eyebrow: "Build Your Ensemble",
  heading: "Package prices are per performer.",
  body: "Choose solo violin, duo, trio, or string quartet to create the sound that fits your celebration.",
  closing: "Not sure what fits your event? I’ll help you choose.",
};

export const defaultRateGuides: RateGuide[] = [
  {
    title: "Ceremony Only",
    price: "$275",
    description:
      "Music for the ceremony: processional, incidental music, and recessional. Includes up to one selected song from the provided song list.",
  },
  {
    title: "Golden Bells",
    price: "$325",
    description:
      "Up to 30 minutes of prelude and postlude music, ceremony music, and up to two selected songs from the provided song list.",
  },
  {
    title: "Platinum Deluxe",
    price: "$500",
    description:
      "Prelude, postlude, ceremony music, all ceremony song selections from the list, one hour of cocktail hour or reception performance, and the first 50 miles of travel.",
  },
  {
    title: "Diamond Forever",
    price: "$800",
    description:
      "Prelude, postlude, ceremony music, up to 90 minutes for cocktail hour or reception, up to 90 minutes for dinner, one included song arrangement, the first 100 miles of travel, and a 30% discount on additional performance time.",
  },
  {
    title: "White Glove Concierge",
    price: "$1,000",
    description:
      "The full Diamond Forever experience plus a custom playlist, rehearsal attendance, and the first 150 miles of travel included.",
  },
];

export const defaultAddOns = [
  "1 hour of performance: $200",
  "Cocktail hour / reception, 1 hour: $200",
  "Dinner, 90 minutes: $300",
  "Mileage: $0.70 / mile",
  "Custom song arrangement: $30 per song",
  "Rehearsal attendance: $200",
];

export const defaultPricingContent: PricingContent = {
  ensembleGuide: defaultEnsembleGuide,
  rateGuides: defaultRateGuides,
  addOns: defaultAddOns,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateText(
  value: unknown,
  label: string,
  maximumLength: number,
  errors: string[],
) {
  if (typeof value !== "string") {
    errors.push(`${label} must be text.`);
    return "";
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    errors.push(`${label} cannot be empty.`);
  } else if (normalizedValue.length > maximumLength) {
    errors.push(`${label} cannot exceed ${maximumLength} characters.`);
  }

  return normalizedValue;
}

export function validatePricingContent(
  value: unknown,
): PricingValidationResult {
  const errors: string[] = [];

  if (!isRecord(value)) {
    return { success: false, errors: ["Pricing must be an object."] };
  }

  let payloadSize = Number.POSITIVE_INFINITY;
  try {
    payloadSize = new TextEncoder().encode(JSON.stringify(value)).length;
  } catch {
    errors.push("Pricing must be valid JSON data.");
  }

  if (payloadSize > maximumPricingPayloadBytes) {
    errors.push(
      `Pricing cannot exceed ${maximumPricingPayloadBytes} bytes.`,
    );
  }

  const rawRateGuides = value.rateGuides;
  const rawAddOns = value.addOns;
  const rawEnsembleGuide =
    value.ensembleGuide === undefined
      ? defaultEnsembleGuide
      : value.ensembleGuide;

  if (!isRecord(rawEnsembleGuide)) {
    errors.push("Build Your Ensemble card must be an object.");
  }

  if (!Array.isArray(rawRateGuides)) {
    errors.push("rateGuides must be an array.");
  } else if (rawRateGuides.length !== expectedPackageCount) {
    errors.push(`Pricing must contain exactly ${expectedPackageCount} packages.`);
  }

  if (!Array.isArray(rawAddOns)) {
    errors.push("addOns must be an array.");
  } else if (rawAddOns.length > maximumAddOnCount) {
    errors.push(`Pricing cannot contain more than ${maximumAddOnCount} add-ons.`);
  }

  const rateGuides = Array.isArray(rawRateGuides)
    ? rawRateGuides.map((guide, index) => {
        if (!isRecord(guide)) {
          errors.push(`Package ${index + 1} must be an object.`);
          return { title: "", price: "", description: "" };
        }

        return {
          title: validateText(
            guide.title,
            `Package ${index + 1} title`,
            120,
            errors,
          ),
          price: validateText(
            guide.price,
            `Package ${index + 1} price`,
            80,
            errors,
          ),
          description: validateText(
            guide.description,
            `Package ${index + 1} description`,
            3000,
            errors,
          ),
        };
      })
    : [];

  const addOns = Array.isArray(rawAddOns)
    ? rawAddOns.map((addOn, index) =>
        validateText(addOn, `Add-on ${index + 1}`, 500, errors),
      )
    : [];

  const ensembleGuide = isRecord(rawEnsembleGuide)
    ? {
        eyebrow: validateText(
          rawEnsembleGuide.eyebrow,
          "Build Your Ensemble eyebrow",
          120,
          errors,
        ),
        heading: validateText(
          rawEnsembleGuide.heading,
          "Build Your Ensemble heading",
          240,
          errors,
        ),
        body: validateText(
          rawEnsembleGuide.body,
          "Build Your Ensemble body",
          1200,
          errors,
        ),
        closing: validateText(
          rawEnsembleGuide.closing,
          "Build Your Ensemble closing text",
          500,
          errors,
        ),
      }
    : defaultEnsembleGuide;

  const normalizedTitles = rateGuides
    .map((guide) => guide.title.toLocaleLowerCase())
    .filter(Boolean);
  if (new Set(normalizedTitles).size !== normalizedTitles.length) {
    errors.push("Package titles must be unique.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      ensembleGuide,
      rateGuides,
      addOns,
    },
  };
}
