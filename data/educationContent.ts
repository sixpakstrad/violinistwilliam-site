export type EducationArticleContent = {
  id: "private-lessons" | "how-to-start-lessons" | "pricing";
  navLabel: string;
  eyebrow: string;
  title: string;
  body: string[];
  secondaryTitle?: string;
  secondaryBody?: string[];
};

export type LessonRate = {
  level: string;
  length: string;
  price: string;
};

export type EducationPhoto = {
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

export type EducationContentData = {
  articles: EducationArticleContent[];
  photos: EducationPhoto[];
  firstLessonItems: string[];
  lessonRates: LessonRate[];
  pricingNote: string;
};

export const defaultEducationContent: EducationContentData = {
  articles: [
    {
      id: "private-lessons",
      navLabel: "Private Lessons",
      eyebrow: "Private Lessons",
      title: "A thoughtful, practical approach to violin study.",
      body: [
        "My teaching is built around the same values that guide my performing: attentive listening, emotional honesty, and a strong technical foundation that helps each student find a beautiful and reliable sound.",
        "Lessons are shaped to the individual student. For younger players, that often means building healthy posture, clear practice habits, note reading, rhythm, and confidence. For advancing students, we work on tone production, shifting, vibrato, musical interpretation, audition preparation, and the skills needed to feel at home in orchestral, chamber, and solo settings.",
        "I want students to understand why something works, not just repeat instructions. A lesson should leave a student with a clearer ear, a more organized path forward, and a stronger sense that progress is possible.",
      ],
      secondaryTitle: "Will’s teaching philosophy and methodology.",
      secondaryBody: [
        "Winspiration Studio is derived from the words “win” and “inspiration.” As Will pushed himself to untangle the many intricacies of violin technique and discover more nuances of musical performance and expression, he found a more profound inspiration in his craft. This inspiration, along with his desire to win auditions and improve his own reputation as a reliable violinist has shaped who he is as a performer and teacher today.",
        "Will is a Suzuki Method registered violin instructor, however, he does teach in other musical methodology that is most beneficial to his students’ unique learning patterns. Likewise, he teaches patience, control, focus, and planning, with the view that a quality practice is better than the quantity of practices.",
        "Music is its own language, and we now know to expect students to learn that language much like they did as a young child: first by listening, then speaking, and eventually reading.",
        "For kids, Will works with parents to ensure the child grows up in a musical household and has regular practice times with their family. Many students who begin violin are at an age where they are not good readers yet, so his students will learn their first book by memory. The pieces are securely learned through regular listening, weekly repetition, and a slow introduction of new skills and concepts.",
        "For adults, Will focuses on teaching ways to refine technique and skill. Whether it is mastering a new concept or fixing a problem you have been stuck on, there is always value to improving musicality.",
      ],
    },
    {
      id: "how-to-start-lessons",
      navLabel: "How to Start Lessons",
      eyebrow: "How to Start Lessons",
      title: "A clear first step into orchestral music.",
      body: [
        "Interested in diving into the world of orchestral music? Contact Will if you have any questions.",
        "For beginners, here is a helpful list of what to bring to your first lesson:",
      ],
    },
    {
      id: "pricing",
      navLabel: "Pricing",
      eyebrow: "Pricing",
      title: "In-person or virtual lesson options.",
      body: [
        "Will teaches privately out of St. Paul, St. Louis Park, and St. Anthony.",
        "Virtual lessons offer the convenience of learning from home, ideal for students looking to save time and reduce travel. Students from outside the Twin Cities area are welcome!",
      ],
    },
  ],
  photos: [
    {
      src: "/media/education/student-church-portrait.jpeg",
      alt: "William Samorey with a young violin student in a church recital setting",
      position: "center 8%",
      fit: "cover",
      zoom: 1,
      cropRatioWidth: 4,
      cropRatioHeight: 5,
      customFrameWidth: 800,
      customFrameHeight: 1000,
      cropPresetName: "About Portrait",
    },
    {
      src: "/media/education/church-student-group.jpeg",
      alt: "William Samorey with student violinists in a church",
      position: "center",
      fit: "cover",
      zoom: 1,
      cropRatioWidth: 16,
      cropRatioHeight: 9,
      customFrameWidth: 1600,
      customFrameHeight: 900,
      cropPresetName: "Gallery Wide",
    },
  ],
  firstLessonItems: [
    "Violin",
    "Violin bow",
    "Instrument carrying case",
    "Rosin & shoulder rest",
    "Essential Elements for Strings Book 1",
    "Suzuki Violin Method Book 1",
    "A pencil",
    "Enthusiasm & patience",
  ],
  lessonRates: [
    { level: "Beginner students", length: "30-minute lessons", price: "$35" },
    {
      level: "Intermediate students",
      length: "45-minute lessons",
      price: "$52.50",
    },
    { level: "Advanced students", length: "60-minute+ lessons", price: "$70" },
    { level: "90 minute lessons", length: "", price: "$90" },
  ],
  pricingNote: "In-home lessons available for an additional $10 per lesson.",
};

function normalizeParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((paragraph) => String(paragraph).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeEducationPhoto(
  photo: Partial<EducationPhoto> | undefined,
): EducationPhoto {
  return {
    src: photo?.src || "/media/education/church-student-group.jpeg",
    alt: photo?.alt || "Education page photo",
    position: photo?.position || "center",
    fit: photo?.fit === "contain" ? "contain" : "cover",
    zoom:
      typeof photo?.zoom === "number" && Number.isFinite(photo.zoom)
        ? photo.zoom
        : 1,
    cropRatioWidth:
      typeof photo?.cropRatioWidth === "number" ? photo.cropRatioWidth : 16,
    cropRatioHeight:
      typeof photo?.cropRatioHeight === "number" ? photo.cropRatioHeight : 9,
    customFrameWidth:
      typeof photo?.customFrameWidth === "number"
        ? photo.customFrameWidth
        : 1600,
    customFrameHeight:
      typeof photo?.customFrameHeight === "number"
        ? photo.customFrameHeight
        : 900,
    cropPresetName: photo?.cropPresetName || "Gallery Wide",
  };
}

export function normalizeEducationContent(value: unknown): EducationContentData {
  const content = value as Partial<EducationContentData> | null;

  if (!content || !Array.isArray(content.articles)) {
    return defaultEducationContent;
  }

  return {
    articles: defaultEducationContent.articles.map((defaultArticle) => {
      const storedArticle = content.articles?.find(
        (article) => article.id === defaultArticle.id,
      ) as Partial<EducationArticleContent> | undefined;

      return {
        ...defaultArticle,
        ...storedArticle,
        body: normalizeParagraphs(storedArticle?.body).length
          ? normalizeParagraphs(storedArticle?.body)
          : defaultArticle.body,
        secondaryBody: normalizeParagraphs(storedArticle?.secondaryBody).length
          ? normalizeParagraphs(storedArticle?.secondaryBody)
          : defaultArticle.secondaryBody,
      };
    }),
    photos: Array.isArray(content.photos)
      ? content.photos.map((photo) => normalizeEducationPhoto(photo))
      : defaultEducationContent.photos,
    firstLessonItems: Array.isArray(content.firstLessonItems)
      ? content.firstLessonItems.map(String).filter(Boolean)
      : defaultEducationContent.firstLessonItems,
    lessonRates: Array.isArray(content.lessonRates)
      ? content.lessonRates.map((rate, index) => ({
          level: rate?.level || `Lesson option ${index + 1}`,
          length: rate?.length || "",
          price: rate?.price || "",
        }))
      : defaultEducationContent.lessonRates,
    pricingNote: content.pricingNote || defaultEducationContent.pricingNote,
  };
}
