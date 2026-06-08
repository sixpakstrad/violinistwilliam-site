export type DonateContentData = {
  intro: {
    eyebrow: string;
    title: string;
    copy: string;
    titleSize?: string;
    titleColor?: string;
    subtitleSize?: string;
    subtitleColor?: string;
  };
  primary: {
    eyebrow: string;
    title: string;
    body: string[];
    buttonLabel: string;
    buttonHref: string;
  };
  support: {
    eyebrow: string;
    items: string[];
  };
};

export const defaultDonateContent: DonateContentData = {
  intro: {
    eyebrow: "Instrument Fund",
    title: "Student instruments that help young musicians grow.",
    copy:
      "Payment links are not active yet. For now, this page points visitors to the Instrument Loan Program information.",
    titleSize: "",
    titleColor: "",
    subtitleSize: "",
    subtitleColor: "",
  },
  primary: {
    eyebrow: "Instrument Loan Program",
    title: "Learn about the program.",
    body: [
      "I am not collecting online payments through this site yet. The Instrument Loan Program page explains the purpose of the program and how it helps students access properly set-up violins and violas.",
    ],
    buttonLabel: "View Instrument Loan Program",
    buttonHref: "/about#instrument-loans",
  },
  support: {
    eyebrow: "What The Program Supports",
    items: [
      "Student-size violins and violas",
      "Bows, cases, strings, and shoulder rests",
      "Repairs, setup work, and routine maintenance",
      "Emergency replacement support when an instrument no longer fits",
    ],
  },
};
