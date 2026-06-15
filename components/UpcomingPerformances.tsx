"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  defaultUpcomingPerformances,
  type UpcomingPerformance,
} from "@/data/upcomingPerformances";

const eventsPerPage = 10;

function formatEventDate(value: string) {
  if (!value) {
    return "Date TBA";
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventTime(event: UpcomingPerformance) {
  if (!event.startTime && !event.endTime) {
    return "Time TBA";
  }

  if (event.startTime && event.endTime) {
    return `${event.startTime}–${event.endTime}`;
  }

  return event.startTime || event.endTime;
}

export function UpcomingPerformances() {
  const [events, setEvents] = useState<UpcomingPerformance[]>(
    defaultUpcomingPerformances,
  );
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [eventPage, setEventPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const response = await fetch("/api/upcoming-events", {
          cache: "no-store",
        });
        const result = (await response.json()) as {
          events?: UpcomingPerformance[];
          error?: string;
        };

        if (!response.ok) {
          throw new Error(result.error || "Unable to load upcoming events.");
        }

        if (isMounted) {
          setEvents(Array.isArray(result.events) ? result.events : []);
          setEventsError("");
        }
      } catch (error) {
        console.error("Unable to load upcoming events:", error);
        if (isMounted) {
          setEvents([]);
          setEventsError(
            error instanceof Error
              ? error.message
              : "Unable to load upcoming events.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          (event.visibility === "public" || event.visibility === "private"),
      ),
    [events],
  );
  const pageCount = Math.max(1, Math.ceil(visibleEvents.length / eventsPerPage));
  const currentPage = Math.min(eventPage, pageCount);
  const pageStart = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = visibleEvents.slice(
    pageStart,
    pageStart + eventsPerPage,
  );

  useEffect(() => {
    setEventPage((page) => Math.min(page, pageCount));
  }, [pageCount]);

  return (
    <section
      id="upcoming-performances"
      className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16"
    >
      <div className="absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-champagne/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.36em] text-bronze-soft">
            Upcoming Performances
          </p>
          <h2 className="font-display text-5xl leading-[1.03] text-ivory text-balance sm:text-6xl md:text-7xl">
            Hear William live.
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="elegant-surface border border-ivory/10 p-6 sm:p-9 lg:p-12"
        >
          {isLoadingEvents ? (
            <p className="text-lg leading-8 text-ivory-muted">
              Loading upcoming performances...
            </p>
          ) : eventsError ? (
            <p className="border border-gold/20 bg-gold/10 px-5 py-4 text-sm leading-7 text-gold">
              {eventsError}
            </p>
          ) : visibleEvents.length ? (
            <>
              <div className="grid gap-4">
                {paginatedEvents.map((event) =>
                  event.visibility === "private" ? (
                    <article
                      key={event.id}
                      className="border border-ivory/10 bg-espresso/35 px-4 py-3"
                    >
                      <p className="text-sm leading-6 text-ivory-muted">
                        <span className="text-ivory">
                          {formatEventDate(event.date)}
                        </span>{" "}
                        · {formatEventTime(event)}
                        {[event.city, event.state].filter(Boolean).length ? (
                          <>
                            {" "}
                            · {[event.city, event.state]
                              .filter(Boolean)
                              .join(", ")}
                          </>
                        ) : null}{" "}
                        — Private Event:{" "}
                        {event.privateEventLabel ||
                          event.eventTitle ||
                          "Private Event"}
                      </p>
                    </article>
                  ) : (
                    <article
                      key={event.id}
                      className={`border px-5 py-5 ${
                        event.featured
                          ? "border-gold/45 bg-gold/10"
                          : "border-ivory/10 bg-espresso/45"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-gold/80">
                            {formatEventDate(event.date)}
                            {" · "}
                            {formatEventTime(event)}
                          </p>
                          <h3 className="mt-3 font-display text-3xl leading-tight text-ivory">
                            {event.eventTitle}
                          </h3>
                        </div>
                        {event.featured ? (
                          <span className="border border-gold/40 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-ivory-muted">
                        {[event.venueName, event.city, event.state]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {event.shortDescription ? (
                        <p className="mt-4 text-base leading-7 text-ivory-muted">
                          {event.shortDescription}
                        </p>
                      ) : null}
                      {event.ticketUrl ? (
                        <a
                          href={event.ticketUrl}
                          className="mt-5 inline-flex min-h-11 items-center justify-center border border-gold/40 px-5 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition hover:border-gold hover:bg-gold/10"
                        >
                          Event Info
                        </a>
                      ) : null}
                    </article>
                  ),
                )}
              </div>

              {visibleEvents.length > eventsPerPage ? (
                <div className="mt-7 flex flex-col gap-4 border-t border-ivory/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-7 text-ivory-muted">
                    Showing {pageStart + 1}-
                    {Math.min(pageStart + eventsPerPage, visibleEvents.length)}{" "}
                    of {visibleEvents.length} performances
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setEventPage((page) => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEventPage((page) => Math.min(pageCount, page + 1))
                      }
                      disabled={currentPage === pageCount}
                      className="border border-ivory/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-ivory-muted transition hover:border-gold/50 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-lg leading-8 text-ivory-muted">
                Upcoming public performances will be listed here as dates are
                announced. For private event availability, use the inquiry form
                to begin a conversation about your date, venue, and musical
                direction.
              </p>
              <div className="mt-8 border border-ivory/10 bg-espresso/45 px-5 py-5">
                <p className="text-sm uppercase tracking-[0.16em] text-ivory-muted">
                  No upcoming performances are currently listed.
                </p>
              </div>
              <a
                href="/contact#inquiry"
                className="mt-8 inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition hover:bg-gold"
              >
                Ask About Availability
              </a>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
