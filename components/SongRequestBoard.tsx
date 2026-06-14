"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type ReviewStatus,
  type RequestStatus,
  type StoredSongRequest,
} from "@/data/songRequests";
import { songRequestSettings } from "@/data/songRequestSettings";

type RequestSettings = {
  enabled: boolean;
  currentEvent: string;
};

function getExternalHref(value: string) {
  const trimmedValue = value.trim();

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^www\./i.test(trimmedValue)) {
    return `https://${trimmedValue}`;
  }

  return "";
}

export function SongRequestBoard() {
  const [requests, setRequests] = useState<StoredSongRequest[]>([]);
  const [filter, setFilter] = useState<RequestStatus | "active" | "all">(
    "active",
  );
  const [currentEvent, setCurrentEvent] = useState("Open Requests");
  const [eventDraft, setEventDraft] = useState("Open Requests");
  const [requestsEnabled, setRequestsEnabled] = useState<boolean>(
    songRequestSettings.enabled,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshRequests();
  }, []);

  const applyRequestPayload = (data: {
    requests?: StoredSongRequest[];
    settings?: RequestSettings;
  }) => {
    if (Array.isArray(data.requests)) {
      setRequests(data.requests);
    }

    if (data.settings) {
      setRequestsEnabled(data.settings.enabled);
      setCurrentEvent(data.settings.currentEvent || "Open Requests");
      setEventDraft(data.settings.currentEvent || "Open Requests");
    }
  };

  const showMessage = (nextMessage: string) => {
    setMessage(nextMessage);
    window.setTimeout(() => setMessage(""), 5000);
  };

  const fetchAdminRequests = async () => {
    const response = await fetch("/api/admin/requests", { cache: "no-store" });
    const data = (await response.json().catch(() => ({}))) as {
      requests?: StoredSongRequest[];
      settings?: RequestSettings;
      error?: string;
    };

    if (!response.ok) {
      throw new Error(data.error || "Unable to load live requests.");
    }

    return data;
  };

  const filteredRequests = useMemo(() => {
    const eventRequests = requests.filter(
      (request) => request.eventName === currentEvent,
    );

    if (filter === "all") {
      return eventRequests;
    }

    if (filter === "active") {
      return eventRequests.filter(
        (request) =>
          request.status === "new" || request.status === "playlist",
      );
    }

    return eventRequests.filter((request) => request.status === filter);
  }, [currentEvent, filter, requests]);

  const reviewRequests = useMemo(
    () =>
      requests.filter(
        (request) =>
          request.review.trim() &&
          request.eventName === currentEvent &&
          request.reviewStatus !== "archived",
      ),
    [currentEvent, requests],
  );

  const updateStatus = async (id: string, status: RequestStatus) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        requests?: StoredSongRequest[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to update request.");
      }

      if (Array.isArray(data.requests)) {
        setRequests(data.requests);
      }
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Unable to update request.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateReviewStatus = async (id: string, reviewStatus: ReviewStatus) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, reviewStatus }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        requests?: StoredSongRequest[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to update review.");
      }

      if (Array.isArray(data.requests)) {
        setRequests(data.requests);
      }
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Unable to update review.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const clearRequestsByStatus = async (status: "played" | "archived") => {
    const matchingCount = requests.filter(
      (request) =>
        request.eventName === currentEvent && request.status === status,
    ).length;

    if (matchingCount === 0) {
      showMessage(`No ${status} requests to delete for ${currentEvent}.`);
      return;
    }

    const confirmed = window.confirm(
      `Delete all ${status} requests for ${currentEvent}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/requests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, eventName: currentEvent }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        requests?: StoredSongRequest[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || `Unable to delete ${status} requests.`);
      }

      if (Array.isArray(data.requests)) {
        setRequests(data.requests);
      }

      showMessage(
        `Deleted ${matchingCount} ${status} request${
          matchingCount === 1 ? "" : "s"
        } for ${currentEvent}.`,
      );
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : `Unable to delete ${status} requests.`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  async function refreshRequests() {
    setIsLoading(true);

    try {
      const data = await fetchAdminRequests();
      applyRequestPayload(data);
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Unable to load live requests.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveRequestSettings = async (settings: Partial<RequestSettings>) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/request-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      const data = (await response.json().catch(() => ({}))) as {
        settings?: RequestSettings;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to update request settings.");
      }

      if (data.settings) {
        setRequestsEnabled(data.settings.enabled);
        setCurrentEvent(data.settings.currentEvent || "Open Requests");
        setEventDraft(data.settings.currentEvent || "Open Requests");
      }
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : "Unable to update request settings.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const toggleRequests = () => {
    const nextEnabled = !requestsEnabled;
    saveRequestSettings({ enabled: nextEnabled, currentEvent });
  };

  const saveEventMode = () => {
    const nextEvent = eventDraft.trim() || "Open Requests";
    saveRequestSettings({ enabled: requestsEnabled, currentEvent: nextEvent });
  };

  const currentEventCount = requests.filter(
    (request) => request.eventName === currentEvent,
  ).length;

  return (
    <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="elegant-surface mb-8 grid gap-6 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm leading-7 text-ivory-muted">
              Event Mode keeps the guest request experience public and your
              live request board private.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold/80">
              Requests are currently {requestsEnabled ? "open" : "paused"} /{" "}
              {currentEventCount} request{currentEventCount === 1 ? "" : "s"}{" "}
              for {currentEvent}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleRequests}
              disabled={isSaving}
              className={`border px-4 py-3 text-xs uppercase tracking-[0.18em] transition ${
                requestsEnabled
                  ? "border-gold bg-gold/10 text-ivory"
                  : "border-ivory/10 text-ivory-muted hover:border-gold/50 hover:text-ivory"
              }`}
            >
              {requestsEnabled ? "Turn Requests Off" : "Turn Requests On"}
            </button>
            <button
              type="button"
              onClick={refreshRequests}
              disabled={isLoading || isSaving}
              className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Loading" : "Refresh"}
            </button>
          </div>
        </div>

        {message ? (
          <div className="mb-8 border border-gold/25 bg-gold/10 p-4 text-sm leading-7 text-ivory-muted">
            {message}
          </div>
        ) : null}

        <div className="elegant-surface mb-8 grid gap-4 border border-ivory/10 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-gold/80">
              Current Event
            </span>
            <input
              value={eventDraft}
              onChange={(event) => setEventDraft(event.target.value)}
              placeholder="Airport show, wedding cocktail hour, restaurant set..."
              className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/40 focus:border-gold/70"
            />
          </label>
          <button
            type="button"
            onClick={saveEventMode}
            disabled={isSaving}
            className="inline-flex min-h-12 items-center justify-center bg-ivory px-5 text-xs font-medium uppercase tracking-[0.18em] text-espresso transition hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            Set Event Mode
          </button>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-7 text-ivory-muted">
            Showing {filteredRequests.length} active-board item
            {filteredRequests.length === 1 ? "" : "s"} for this event.
          </p>
          <div className="flex flex-wrap gap-2">
            {(["active", "all", "new", "playlist", "played", "archived"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  filter === item
                    ? "border-gold bg-gold/10 text-ivory"
                    : "border-ivory/10 text-ivory-muted hover:border-gold/50 hover:text-ivory"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filter === "played" || filter === "archived" ? (
          <div className="mb-8 flex flex-col gap-3 border border-gold/20 bg-gold/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-7 text-ivory-muted">
              Clear only {filter} requests for {currentEvent}. Other request
              tabs and the main song library are untouched.
            </p>
            <button
              type="button"
              onClick={() => clearRequestsByStatus(filter)}
              disabled={isSaving || filteredRequests.length === 0}
              className="inline-flex min-h-11 items-center justify-center border border-gold/45 px-4 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear {filter} requests
            </button>
          </div>
        ) : null}

        {filteredRequests.length === 0 ? (
          <div className="elegant-surface border border-ivory/10 p-8 text-center text-ivory-muted">
            No song requests yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRequests.map((request) => {
              const sheetMusicHref = getExternalHref(request.sheetMusic);
              const backingTrackHref = getExternalHref(request.backingTrack);
              const referenceHref = getExternalHref(request.url);

              return (
              <article
                key={request.id}
                className="elegant-surface grid gap-6 border border-ivory/10 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gold/75">
                    {request.status} / {request.eventName}
                  </p>
                  <h2 className="font-display text-4xl leading-none text-ivory">
                    {request.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-ivory-muted">
                    {[request.artist, request.source, request.genre]
                      .filter(Boolean)
                      .join(" / ")}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-smoke-brown">
                    {request.guestName ? `Requested by ${request.guestName}. ` : ""}
                    {request.review}
                  </p>
                  {request.review ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-smoke-brown">
                      Review permission:{" "}
                      {request.reviewMarketingPermission ? "yes" : "not given"}{" "}
                      / credit as {request.reviewDisplayName}
                    </p>
                  ) : null}
                  {request.notes ||
                  request.sheetMusic ||
                  request.backingTrack ||
                  request.url ? (
                    <div className="mt-5 border border-gold/20 bg-gold/10 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-gold">
                        Music Prep
                      </p>
                      <div className="grid gap-3 text-sm leading-6 text-ivory-muted sm:grid-cols-2">
                        {request.notes ? (
                          <div className="sm:col-span-2">
                            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-smoke-brown">
                              Notes
                            </span>
                            <p>{request.notes}</p>
                          </div>
                        ) : null}
                        {request.sheetMusic ? (
                          <div>
                            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-smoke-brown">
                              Sheet Music
                            </span>
                            {sheetMusicHref ? (
                              <a
                                href={sheetMusicHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold underline-offset-4 hover:underline"
                              >
                                Open sheet music
                              </a>
                            ) : (
                              <p>{request.sheetMusic}</p>
                            )}
                          </div>
                        ) : null}
                        {request.backingTrack ? (
                          <div>
                            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-smoke-brown">
                              Backing Track
                            </span>
                            {backingTrackHref ? (
                              <a
                                href={backingTrackHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold underline-offset-4 hover:underline"
                              >
                                Open backing track
                              </a>
                            ) : (
                              <p>{request.backingTrack}</p>
                            )}
                          </div>
                        ) : null}
                        {request.url ? (
                          <div>
                            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-smoke-brown">
                              URL
                            </span>
                            {referenceHref ? (
                              <a
                                href={referenceHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold underline-offset-4 hover:underline"
                              >
                                Open Reference ↗
                              </a>
                            ) : (
                              <p>{request.url}</p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-smoke-brown">
                    {new Date(request.requestedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(request.id, "playlist")}
                    disabled={isSaving}
                    className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                  >
                    Add to Playlist
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(request.id, "played")}
                    disabled={isSaving}
                    className="border border-gold/35 bg-gold/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/20"
                  >
                    Played
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(request.id, "archived")}
                    disabled={isSaving}
                    className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-ivory/35 hover:text-ivory"
                  >
                    Archive
                  </button>
                  {request.status !== "new" ? (
                    <button
                      type="button"
                      onClick={() => updateStatus(request.id, "new")}
                      disabled={isSaving}
                      className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
                    >
                      Restore
                    </button>
                  ) : null}
                </div>
              </article>
              );
            })}
          </div>
        )}

        <div className="mt-12">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-gold/80">
                Review Archive
              </p>
              <h2 className="font-display text-4xl leading-none text-ivory">
                Reviews from this event
              </h2>
            </div>
            <p className="text-sm leading-7 text-ivory-muted">
              {reviewRequests.length} review
              {reviewRequests.length === 1 ? "" : "s"} awaiting your decision.
            </p>
          </div>

          {reviewRequests.length === 0 ? (
            <div className="elegant-surface border border-ivory/10 p-8 text-center text-ivory-muted">
              No reviews for this event yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {reviewRequests.map((request) => (
                <article
                  key={`review-${request.id}`}
                  className="elegant-surface grid gap-5 border border-ivory/10 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-gold/75">
                      {request.reviewStatus} /{" "}
                      {request.reviewMarketingPermission
                        ? "marketing permission given"
                        : "private review"}
                    </p>
                    <p className="text-lg leading-8 text-ivory-muted">
                      “{request.review}”
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-smoke-brown">
                      {request.guestName || "Anonymous"} / credit as{" "}
                      {request.reviewDisplayName}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => updateReviewStatus(request.id, "approved")}
                      disabled={isSaving}
                      className="border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updateReviewStatus(request.id, "featured")}
                      disabled={isSaving}
                      className="border border-gold/35 bg-gold/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/20"
                    >
                      Feature
                    </button>
                    <button
                      type="button"
                      onClick={() => updateReviewStatus(request.id, "archived")}
                      disabled={isSaving}
                      className="border border-ivory/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-ivory/35 hover:text-ivory"
                    >
                      Archive Review
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
