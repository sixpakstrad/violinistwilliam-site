export type StoryEntry = {
  id: string;
  date?: string;
  marker?: string;
  title: string;
  category: string;
  teaser: string;
  image?: string;
  imagePosition?: string;
  imageFit?: string;
  imageZoom?: number;
  imageCropRatioWidth?: number;
  imageCropRatioHeight?: number;
  imageCustomFrameWidth?: number;
  imageCustomFrameHeight?: number;
  imageCropPresetName?: string;
  published: boolean;
  body: string[];
};

export const storyEntries: StoryEntry[] = [
  {
    id: "first-note",
    date: "May 12, 2024",
    marker: "Personal Journey",
    title: "The First Note",
    category: "Beginnings",
    published: true,
    teaser:
      "Every musician remembers the moment sound first felt like a doorway.",
    body: [
      "There is a particular kind of silence that arrives before music begins. It is not empty. It is expectant, alive with the feeling that something is about to change.",
      "The first note I remember loving was not impressive because it was difficult. It mattered because it made me want to listen more closely. That feeling still guides the way I perform and teach.",
      "Whether I am playing for a wedding, a private celebration, a student lesson, or a concert audience, I am always trying to return to that first sense of discovery.",
    ],
  },
  {
    id: "wedding-to-remember",
    date: "Mar 3, 2024",
    marker: "Performance Stories",
    title: "A Wedding to Remember",
    category: "Weddings",
    published: true,
    teaser:
      "Some weddings stay with you long after the final note has faded.",
    image: "/media/brahms-stained-glass.jpg",
    imageZoom: 1,
    imageCropRatioWidth: 3,
    imageCropRatioHeight: 2,
    imageCustomFrameWidth: 1200,
    imageCustomFrameHeight: 800,
    imageCropPresetName: "Story Header",
    body: [
      "The most memorable weddings are rarely about perfection in the technical sense. They are about timing, attention, and the feeling that everyone in the room understands the importance of the moment.",
      "Music has a way of gathering that emotion without explaining it. A melody can soften the room, lift the recessional, or give guests permission to feel what words cannot quite hold.",
      "That is the part of live performance I care about most: not simply playing the notes, but helping the room breathe with the story already unfolding.",
    ],
  },
  {
    id: "teaching-next-generation",
    date: "Jan 18, 2024",
    marker: "Teaching",
    title: "Teaching the Next Generation",
    category: "Education",
    published: true,
    teaser:
      "Every student has a story, and every lesson is an opportunity to make progress feel possible.",
    body: [
      "A strong lesson is not just a correction. It is a clearer path forward. Students need practical tools, but they also need to feel that their effort is leading somewhere.",
      "I try to teach in a way that connects technique to sound. Posture, bow control, rhythm, shifting, and intonation all matter because they help a student communicate more freely.",
      "When a student begins to hear their own progress, confidence changes. Practice becomes less like a task and more like a conversation with possibility.",
    ],
  },
  {
    id: "instrument-that-opens",
    date: "Nov 2, 2023",
    marker: "Instrument Fund",
    title: "The Instrument That Opens the Door",
    category: "Access",
    published: true,
    teaser:
      "A properly set-up violin or viola can change how a young musician hears their own potential.",
    body: [
      "Some students work incredibly hard on instruments that fight them at every turn. Poor setup, weak tone, and difficult response can make progress feel far more frustrating than it needs to be.",
      "A better instrument does not replace dedication, but it can remove unnecessary barriers. It can let a student hear warmth, resonance, and response where they previously heard only resistance.",
      "That is the heart of the instrument loan program: helping students meet an instrument that supports their growth instead of limiting it.",
    ],
  },
  {
    id: "live-requests",
    date: "Aug 9, 2023",
    marker: "Repertoire",
    title: "When a Guest Requests the Right Song",
    category: "Live Requests",
    published: true,
    teaser:
      "A request can be lighthearted, nostalgic, emotional, or suddenly exactly what the room needed.",
    body: [
      "Live requests are interesting because they reveal what people are carrying with them. Sometimes a guest asks for a favorite pop song. Sometimes they ask for something connected to a memory.",
      "The best requests do not interrupt the event. They become part of it. They give the audience a moment of recognition and make the performance feel personal in real time.",
      "That is why I am building request tools into the website: to make the process easy for guests while keeping the performance organized and intentional.",
    ],
  },
];
