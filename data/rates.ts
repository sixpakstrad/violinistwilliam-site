export type RateGuide = {
  title: string;
  price: string;
  description: string;
};

export const defaultRateGuides: RateGuide[] = [
  {
    title: "Ceremony Only",
    price: "$250",
    description:
      "Music for the ceremony: processional, incidental music, and recessional. Includes up to one selected song from the provided song list.",
  },
  {
    title: "Golden Bells",
    price: "$300",
    description:
      "Up to 30 minutes of prelude and postlude music, ceremony music, and up to two selected songs from the provided song list.",
  },
  {
    title: "Platinum Deluxe",
    price: "$475",
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
  "Mileage: $0.65 / mile",
  "Custom song arrangement: $30 per song",
  "Rehearsal attendance: $200",
];
