export type UpcomingPerformance = {
  id: string;
  eventTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  venueName: string;
  city: string;
  state: string;
  isPublic: boolean;
  ticketUrl: string;
  shortDescription: string;
  featured: boolean;
  published: boolean;
};

export const defaultUpcomingPerformances: UpcomingPerformance[] = [];

export function createUpcomingPerformance(): UpcomingPerformance {
  return {
    id: `performance-${Date.now()}`,
    eventTitle: "New Performance",
    date: "",
    startTime: "",
    endTime: "",
    venueName: "",
    city: "",
    state: "MN",
    isPublic: true,
    ticketUrl: "",
    shortDescription: "",
    featured: false,
    published: false,
  };
}

export function normalizeUpcomingPerformance(
  value: Partial<UpcomingPerformance> | null | undefined,
  index: number,
): UpcomingPerformance {
  return {
    id: value?.id || `performance-${index + 1}`,
    eventTitle: value?.eventTitle || "Untitled Performance",
    date: value?.date || "",
    startTime: value?.startTime || "",
    endTime: value?.endTime || "",
    venueName: value?.venueName || "",
    city: value?.city || "",
    state: value?.state || "",
    isPublic: value?.isPublic ?? true,
    ticketUrl: value?.ticketUrl || "",
    shortDescription: value?.shortDescription || "",
    featured: value?.featured ?? false,
    published: value?.published ?? false,
  };
}
