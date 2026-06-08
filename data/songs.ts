export type SongCategory =
  | "Ceremony"
  | "Cocktail Hour"
  | "Romantic"
  | "Cinematic"
  | "Classical"
  | "Pop"
  | "Upbeat";

export type Song = {
  title: string;
  artist: string;
  categories: SongCategory[];
  mood: string[];
  moment: string;
};

export const songCategories: SongCategory[] = [
  "Ceremony",
  "Cocktail Hour",
  "Romantic",
  "Cinematic",
  "Classical",
  "Pop",
  "Upbeat",
];

export const songs: Song[] = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    categories: ["Ceremony", "Romantic", "Pop"],
    mood: ["tender", "luminous", "intimate"],
    moment: "Processional or first look",
  },
  {
    title: "Wildest Dreams",
    artist: "Taylor Swift",
    categories: ["Cocktail Hour", "Cinematic", "Pop"],
    mood: ["cinematic", "modern", "glowing"],
    moment: "Cocktail hour entrance",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    categories: ["Ceremony", "Romantic", "Pop"],
    mood: ["devotional", "soft", "timeless"],
    moment: "Bride's entrance",
  },
  {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    categories: ["Ceremony", "Romantic", "Classical"],
    mood: ["classic", "warm", "graceful"],
    moment: "Vows or unity moment",
  },
  {
    title: "Viva La Vida",
    artist: "Coldplay",
    categories: ["Cocktail Hour", "Cinematic", "Upbeat", "Pop"],
    mood: ["bright", "regal", "celebratory"],
    moment: "Recessional or cocktail hour",
  },
  {
    title: "Clair de Lune",
    artist: "Claude Debussy",
    categories: ["Ceremony", "Classical", "Romantic"],
    mood: ["moonlit", "delicate", "dreamlike"],
    moment: "Prelude seating",
  },
  {
    title: "Canon in D",
    artist: "Johann Pachelbel",
    categories: ["Ceremony", "Classical"],
    mood: ["traditional", "poised", "ceremonial"],
    moment: "Wedding party processional",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    categories: ["Romantic", "Pop", "Ceremony"],
    mood: ["sincere", "emotional", "velvet"],
    moment: "Ceremony or dinner",
  },
  {
    title: "La Vie en Rose",
    artist: "Edith Piaf",
    categories: ["Cocktail Hour", "Romantic", "Classical"],
    mood: ["Parisian", "softly nostalgic", "chic"],
    moment: "Champagne hour",
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    categories: ["Romantic", "Pop", "Cinematic"],
    mood: ["golden", "open-hearted", "ambient"],
    moment: "Sunset portraits",
  },
  {
    title: "Experience",
    artist: "Ludovico Einaudi",
    categories: ["Cinematic", "Classical", "Ceremony"],
    mood: ["sweeping", "dramatic", "ascending"],
    moment: "Grand processional",
  },
  {
    title: "Here Comes the Sun",
    artist: "The Beatles",
    categories: ["Upbeat", "Cocktail Hour", "Pop"],
    mood: ["joyful", "easy", "sunlit"],
    moment: "Garden cocktails",
  },
  {
    title: "Signed, Sealed, Delivered",
    artist: "Stevie Wonder",
    categories: ["Upbeat", "Cocktail Hour", "Pop"],
    mood: ["playful", "soulful", "sparkling"],
    moment: "Recessional celebration",
  },
  {
    title: "Meditation from Thais",
    artist: "Jules Massenet",
    categories: ["Classical", "Ceremony", "Romantic"],
    mood: ["reverent", "serene", "radiant"],
    moment: "Memorial reflection",
  },
];
