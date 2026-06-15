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
    title: "Winspiration Studio Instrument Loan and Support Program",
    body: [
      "Purpose: The Winspiration Studio Instrument Loan and Support Program helps motivated K-12 string students access appropriately sized, well-maintained instruments when financial hardship, family circumstances, or the need for an upgraded instrument creates a barrier to continued musical growth.",
      "This program is intended for students in Minnesota, Iowa, and Wisconsin, with preference given to applicants within approximately 150 miles of the Twin Cities.",
      "Instrument loans are considered for students who are currently in K-12, play violin, viola, or cello, have demonstrated ongoing interest and experience in music study, take regular private lessons, have financial need or hardship, and need an appropriate instrument or an upgraded instrument that better matches their current level of playing.",
      "Loaned instruments must be cared for responsibly and returned in good condition, normal wear excepted. A written loan agreement is required before any instrument is released. For students under 18, a parent or guardian must sign the agreement.",
    ],
    buttonLabel: "Ask About the Program",
    buttonHref: "/contact?type=instrument-program#inquiry",
    linkText:
      "Use the program inquiry form to request a loan, offer an instrument, or ask about support contributions.",
    linkHref: "/contact?type=instrument-program#inquiry",
  },
  photos: [],
};
