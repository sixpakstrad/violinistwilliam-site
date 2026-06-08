import { songRequestSettings } from "@/data/songRequestSettings";

export type RequestStatus = "new" | "playlist" | "played" | "archived";
export type ReviewStatus = "new" | "approved" | "featured" | "archived";

export type StoredSongRequest = {
  id: string;
  eventName: string;
  title: string;
  artist: string;
  source: string;
  genre: string;
  notes: string;
  sheetMusic: string;
  backingTrack: string;
  url: string;
  guestName: string;
  review: string;
  reviewMarketingPermission: boolean;
  reviewDisplayName: string;
  reviewStatus: ReviewStatus;
  requestedAt: string;
  status: RequestStatus;
};

function normalizeSongRequest(request: Partial<StoredSongRequest>): StoredSongRequest {
  return {
    id: request.id || createRequestId(),
    eventName: request.eventName || "Open Requests",
    title: request.title || "Untitled Song",
    artist: request.artist || "",
    source: request.source || "",
    genre: request.genre || "",
    notes: request.notes || "",
    sheetMusic: request.sheetMusic || "",
    backingTrack: request.backingTrack || "",
    url: request.url || "",
    guestName: request.guestName || "",
    review: request.review || "",
    reviewMarketingPermission: Boolean(request.reviewMarketingPermission),
    reviewDisplayName: request.reviewDisplayName || "First name only",
    reviewStatus: request.reviewStatus || "new",
    requestedAt: request.requestedAt || new Date().toISOString(),
    status: request.status || "new",
  };
}

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function createRequestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function readSongRequests(): StoredSongRequest[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(songRequestSettings.storageKey);
    return raw
      ? (JSON.parse(raw) as Partial<StoredSongRequest>[]).map(
          normalizeSongRequest,
        )
      : [];
  } catch {
    return [];
  }
}

export function saveSongRequests(requests: StoredSongRequest[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    songRequestSettings.storageKey,
    JSON.stringify(requests),
  );
}

export function readRequestsEnabled() {
  if (!canUseStorage()) {
    return songRequestSettings.enabled;
  }

  const raw = window.localStorage.getItem(
    songRequestSettings.enabledStorageKey,
  );

  if (raw === "true") {
    return true;
  }

  if (raw === "false") {
    return false;
  }

  return songRequestSettings.enabled;
}

export function saveRequestsEnabled(enabled: boolean) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    songRequestSettings.enabledStorageKey,
    String(enabled),
  );
}

export function readCurrentEventName() {
  if (!canUseStorage()) {
    return "Open Requests";
  }

  const raw = window.localStorage.getItem(
    songRequestSettings.currentEventStorageKey,
  );

  return raw?.trim() || "Open Requests";
}

export function saveCurrentEventName(eventName: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    songRequestSettings.currentEventStorageKey,
    eventName.trim() || "Open Requests",
  );
}
