export type MediaCollectionItem = {
  title: string;
  src: string;
  category:
    | "weddings"
    | "concerts"
    | "events"
    | "education"
    | "portraits"
    | "seasonal";
  colorMode: "color" | "black-and-white";
  orientation: "portrait" | "landscape" | "square-ish";
};

export const mediaCollection: MediaCollectionItem[] = [
  {
    title: "Holiday trees performance portrait",
    src: "/media/collection/01-holiday-trees.jpeg",
    category: "seasonal",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Violin and cello event selfie",
    src: "/media/collection/02-violin-duo-selfie.jpeg",
    category: "events",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Outdoor public performance",
    src: "/media/collection/03-outdoor-performance.jpeg",
    category: "events",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Student music school performance",
    src: "/media/collection/04-crowd-music-school.jpeg",
    category: "education",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Close violin performance",
    src: "/media/collection/05-close-performance.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Outdoor trio selfie",
    src: "/media/collection/06-selfie-outdoor-trio.jpeg",
    category: "events",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Instrument loan students",
    src: "/media/collection/07-church-student-program.jpeg",
    category: "education",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Barn solo performance",
    src: "/media/collection/08-barn-solo-bw.jpeg",
    category: "weddings",
    colorMode: "black-and-white",
    orientation: "portrait",
  },
  {
    title: "Barn string quartet",
    src: "/media/collection/09-barn-quartet-bw.jpeg",
    category: "weddings",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Holiday portrait",
    src: "/media/collection/10-older-holiday-portrait.jpeg",
    category: "seasonal",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Classic formal violin portrait",
    src: "/media/collection/11-classic-portrait.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Performance screenshot one",
    src: "/media/collection/12-chrome-screenshot-1.jpeg",
    category: "portraits",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Holiday lobby selfie",
    src: "/media/collection/13-holiday-lobby-selfie.jpeg",
    category: "seasonal",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Wedding couple performance",
    src: "/media/collection/14-wedding-couple.jpeg",
    category: "weddings",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Barn quartet wide",
    src: "/media/collection/15-barn-quartet-wide.jpeg",
    category: "weddings",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Barn solo performance color",
    src: "/media/collection/16-barn-solo-color.jpeg",
    category: "weddings",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Formal event selfie",
    src: "/media/collection/17-formal-selfie.jpeg",
    category: "events",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Rustic solo performance",
    src: "/media/collection/18-rustic-solo-color.jpeg",
    category: "concerts",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Barn quartet color",
    src: "/media/collection/19-barn-quartet-color.jpeg",
    category: "weddings",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Orchestra solo acknowledgement",
    src: "/media/collection/20-orchestra-smile.jpeg",
    category: "concerts",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Performance screenshot two",
    src: "/media/collection/21-chrome-screenshot-2.jpeg",
    category: "portraits",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Recital demonstration",
    src: "/media/collection/22-recital-demo.jpeg",
    category: "education",
    colorMode: "black-and-white",
    orientation: "portrait",
  },
  {
    title: "Orchestra solo wide",
    src: "/media/collection/23-orchestra-solo-wide.jpeg",
    category: "concerts",
    colorMode: "black-and-white",
    orientation: "landscape",
  },
  {
    title: "Wedding couple performance color",
    src: "/media/collection/24-wedding-couple-color.jpeg",
    category: "weddings",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Scenic violin portrait",
    src: "/media/collection/25-scenic-portrait.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "City violin selfie",
    src: "/media/collection/26-city-violin-selfie.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "portrait",
  },
  {
    title: "Lounge violin portrait",
    src: "/media/collection/27-lounge-violin-portrait.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Covered bridge performance",
    src: "/media/collection/28-covered-bridge-performance.jpeg",
    category: "events",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "City violin profile",
    src: "/media/collection/29-city-violin-profile.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "landscape",
  },
  {
    title: "Red curtain performance",
    src: "/media/collection/30-red-curtain-performance.jpeg",
    category: "portraits",
    colorMode: "color",
    orientation: "landscape",
  },
];
