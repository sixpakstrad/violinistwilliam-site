export type AboutPhoto = {
  src: string;
  alt: string;
  position?: string;
  fit?: string;
  zoom?: number;
  cropRatioWidth?: number;
  cropRatioHeight?: number;
  customFrameWidth?: number;
  customFrameHeight?: number;
  cropPresetName?: string;
};

export type AboutContentData = {
  intro: {
    eyebrow: string;
    title: string;
    copy: string;
    titleSize?: string;
    titleColor?: string;
    subtitleSize?: string;
    subtitleColor?: string;
  };
  portrait: AboutPhoto & {
    caption: string;
  };
  bio: {
    eyebrow: string;
    paragraphs: string[];
    finalNote: string;
  };
  instrumentLoan: {
    eyebrow: string;
    title: string;
    body: string[];
    buttonLabel: string;
    buttonHref: string;
    linkText: string;
    linkHref: string;
  };
  photos: AboutPhoto[];
};

export const defaultAboutContent: AboutContentData = {
  intro: {
    eyebrow: "About William",
    title:
      "A violin presence shaped by atmosphere, storytelling, and emotional awareness.",
    copy: "",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  portrait: {
    src: "/media/samorey-stage.png",
    alt: "William Samorey standing on stage with violin",
    position: "center",
    fit: "contain",
    zoom: 1,
    cropRatioWidth: 4,
    cropRatioHeight: 5,
    customFrameWidth: 800,
    customFrameHeight: 1000,
    cropPresetName: "About Portrait",
    caption: "Performer / educator",
  },
  bio: {
    eyebrow: "Biography",
    paragraphs: [
      "William Samorey is a Twin Cities violinist known for creating refined live music experiences shaped by atmosphere, emotional awareness, and musical storytelling.",
      "Blending the depth of a classically trained orchestral musician with a warm and expressive performance style, William performs for weddings, private celebrations, luxury events, and concert audiences throughout Minnesota and the Midwest. His approach centers not only on the music itself, but on the feeling a room carries, from intimate ceremonies to energetic receptions and elegant gatherings where every detail matters.",
      "Alongside his event work, William maintains an active orchestral career, performing with ensembles across the Midwest and serving as Concertmaster of both the Golden Valley Orchestra and Buffalo Community Orchestra. His performances are recognized for their sensitivity, versatility, and ability to move naturally between classical repertoire, cinematic selections, and modern music in a way that feels both elevated and personal.",
      "William studied violin performance under Annette-Barbara Vogel and earned his degree in Violin Performance with honors from University of Western Ontario. He has performed as a soloist, chamber musician, and orchestral performer throughout the United States and continues to collaborate with musicians and ensembles across the region.",
    ],
    finalNote:
      "He performs on a custom violin by master maker Jennifer Becker known as “The Falcon.”",
  },
  instrumentLoan: {
    eyebrow: "Education & Access",
    title: "Winspiration Studio Instrument Loan Program",
    body: [
      "One of the most meaningful parts of my work is helping young musicians gain access to instruments that truly support their growth.",
      "Through my instrument fund, I help students access properly set-up violins and violas when cost would otherwise stand in the way. Donations help cover instruments, repairs, bows, cases, strings, and maintenance so students can learn on equipment that supports their progress instead of limiting it.",
    ],
    buttonLabel: "Ask About Instrument Loans",
    buttonHref: "/contact?type=teaching",
    linkText:
      "Interested in donating an instrument or asking a question? Contact me here.",
    linkHref: "/contact#inquiry",
  },
  photos: [],
};
