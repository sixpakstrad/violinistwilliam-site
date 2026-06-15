export type EventVisibility = "public" | "private" | "hidden";

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
  visibility: EventVisibility;
  privateEventLabel: string;
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
    visibility: "public",
    privateEventLabel: "Private Event",
    ticketUrl: "",
    shortDescription: "",
    featured: false,
    published: true,
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
    visibility:
      value?.visibility === "private" || value?.visibility === "hidden"
        ? value.visibility
        : value?.isPublic === false
          ? "private"
          : "public",
    privateEventLabel: value?.privateEventLabel || "Private Event",
    ticketUrl: value?.ticketUrl || "",
    shortDescription: value?.shortDescription || "",
    featured: value?.featured ?? false,
    published: true,
  };
}
