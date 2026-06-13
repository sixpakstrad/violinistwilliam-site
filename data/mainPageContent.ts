export type MainPageSocialLink = {
  label: string;
  href: string;
};

export type MainPageReview = {
  quote: string;
  source: string;
  label: string;
};

export type MainPageGalleryImage = {
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

export type MainPageContentData = {
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    titleSize?: string;
    titleColor?: string;
    subtitleSize?: string;
    subtitleColor?: string;
    primaryImage: string;
    primaryImagePosition: string;
    primaryImageFit: string;
    primaryImageZoom?: number;
    primaryImageCropRatioWidth?: number;
    primaryImageCropRatioHeight?: number;
    primaryImageCustomFrameWidth?: number;
    primaryImageCustomFrameHeight?: number;
    primaryImageCropPresetName?: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    footerLabels: string[];
  };
  weddings: {
    eyebrow: string;
    title: string;
    body: string[];
    eventTypes: string[];
    socialLinks: MainPageSocialLink[];
  };
  experience: {
    eyebrow: string;
    title: string;
    body: string[];
    image: string;
    imageAlt: string;
    imagePosition: string;
    imageFit: string;
    imageZoom?: number;
    imageCropRatioWidth?: number;
    imageCropRatioHeight?: number;
    imageCustomFrameWidth?: number;
    imageCustomFrameHeight?: number;
    imageCropPresetName?: string;
    leftCaption: string;
    rightCaption: string;
  };
  featuredPerformance: {
    eyebrow: string;
    title: string;
    copy: string;
    youtubeUrl: string;
    embedUrl: string;
    buttonLabel: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    items: MainPageReview[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    copy: string;
    images: MainPageGalleryImage[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    copy: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

export const defaultMainPageContent: MainPageContentData = {
  hero: {
    eyebrow: "Live Violin Storytelling",
    title: "William Samorey",
    copy: "Live violin music shaped around YOUR story.",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
    primaryImage: "/media/brahms-stained-glass.jpg",
    primaryImagePosition: "48% 45%",
    primaryImageFit: "cover",
    primaryImageZoom: 1,
    primaryImageCropRatioWidth: 16,
    primaryImageCropRatioHeight: 9,
    primaryImageCustomFrameWidth: 1600,
    primaryImageCustomFrameHeight: 900,
    primaryImageCropPresetName: "Homepage Hero",
    primaryCtaLabel: "Inquire",
    primaryCtaHref: "/contact#inquiry",
    secondaryCtaLabel: "Explore Songs",
    secondaryCtaHref: "/music#songs",
    footerLabels: ["Weddings", "Private Events", "Concert Atmosphere"],
  },
  weddings: {
    eyebrow: "Weddings & Events",
    title: "Music you will cherish and your guests will remember.",
    body: [
      "Whether you need music for a ceremony, cocktail hour, dinner, or full celebration, I help shape the emotional flow of the event. I can perform solo violin with high-quality tracks, collaborate with piano, or arrange a live duo, trio, or quartet depending on the size and feeling of the occasion.",
      "Customize your musical experience by choosing one of the many performance packages William has available. If you are looking for something more grand, inquire about string duos, trios, or quartets.",
    ],
    eventTypes: [
      "Weddings",
      "Proposals",
      "Funerals",
      "Parties",
      "Corporate Events",
      "Art and Music Festivals",
    ],
    socialLinks: [
      { label: "YouTube", href: "https://www.youtube.com/@williamsamorey" },
      {
        label: "Instagram",
        href: "https://www.instagram.com/violinist_william",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/violinistwilliam/",
      },
    ],
  },
  experience: {
    eyebrow: "The Experience",
    title: "Music that hushes the room and engages conversation.",
    body: [
      "William creates a live violin atmosphere for weddings and gatherings where each moment feels personal, present, and emotionally connected.",
      "From quiet entrances to joyful receptions and full-room celebrations, the performance moves with the emotional rhythm of the room.",
      "For select performances, guests can request songs live from your event page, creating a shared musical experience that stays personal, organized, and present in the moment.",
    ],
    image: "/media/collection/27-lounge-violin-portrait.jpeg",
    imageAlt: "William Samorey seated with violin in a lounge setting",
    imagePosition: "center",
    imageFit: "cover",
    imageZoom: 1,
    imageCropRatioWidth: 4,
    imageCropRatioHeight: 5,
    imageCustomFrameWidth: 800,
    imageCustomFrameHeight: 1000,
    imageCropPresetName: "About Portrait",
    leftCaption: "Live performance",
    rightCaption: "Energized atmosphere",
  },
  featuredPerformance: {
    eyebrow: "Featured Performance",
    title: 'Watch William perform his arrangement of Ed Sheeran\'s "Perfect".',
    copy: "A modern ceremony favorite shaped for live performance, warmth, and emotional pacing.",
    youtubeUrl: "https://youtu.be/q-Ut8a0JI-I?si=1YM7b7Hr8VOj6OWj",
    embedUrl: "https://www.youtube.com/embed/q-Ut8a0JI-I",
    buttonLabel: "Watch on YouTube",
  },
  reviews: {
    eyebrow: "Reviews",
    title: "The music becomes part of what people remember.",
    items: [
      {
        quote:
          "My congregation LOVED the musical performance. I received numerous texts and positive comments from those in attendance.",
        source: "Amy C.",
        label: "5-Star Google Review",
      },
      {
        quote:
          "He coordinated the timing perfectly so the moment unfolded exactly as planned.",
        source: "Daniel S.",
        label: "5-Star Google Review",
      },
      {
        quote: "His music truly brought warmth and emotion to the day.",
        source: "Alicia R.",
        label: "5-Star Google Review",
      },
      {
        quote: "His talent and attention to detail made every moment magical.",
        source: "Hector P.",
        label: "5-Star Google Review",
      },
      {
        quote:
          "Will is not only an incredible musician, but also a wonderful human being.",
        source: "Ramona F.",
        label: "5-Star Google Review",
      },
      {
        quote: "Our guests are still raving about the music.",
        source: "Jeanette H.",
        label: "5-Star Google Review",
      },
    ],
  },
  gallery: {
    eyebrow: "Photo Album",
    title: "A glimpse of the rooms, stages, and moments behind the music.",
    copy: "This gallery is ready for your preferred wedding, concert, and behind-the-scenes photos once the permanent media library is connected.",
    images: [
      {
        src: "/media/collection/27-lounge-violin-portrait.jpeg",
        alt: "William Samorey seated with violin in a lounge setting",
        position: "center",
        fit: "contain",
      },
      {
        src: "/media/collection/24-wedding-couple-color.jpeg",
        alt: "String quartet performing at a wedding",
        position: "center",
        fit: "contain",
      },
      {
        src: "/media/brahms-stained-glass.jpg",
        alt: "William Samorey performing with orchestra",
        position: "center",
        fit: "contain",
      },
      {
        src: "/media/collection/16-barn-solo-color.jpeg",
        alt: "William Samorey performing violin in a warm barn venue",
        position: "center",
        fit: "contain",
      },
      {
        src: "/media/collection/31-holiday-stage-portrait.jpeg",
        alt: "William Samorey with violin in a holiday performance setting",
        position: "center",
        fit: "contain",
      },
    ],
  },
  finalCta: {
    eyebrow: "Inquire",
    title: "Let's shape the sound of the day.",
    copy: "Send the date, location, and the kind of atmosphere you want the music to create. William will follow up with availability, performance options, and next steps.",
    buttonLabel: "Start an Inquiry",
    buttonHref: "/contact#inquiry",
  },
};
