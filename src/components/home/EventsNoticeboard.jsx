import { useEffect, useRef, useState } from "react";
import { fetchWeeklyEvents } from "../../data/weeklyEvents.js";

/**
 * EventsNoticeboard — "Chapter III: Community" (pg. 41)
 * -----------------------------------------------------------------------
 * Sixth section on the Home page. Picks up the "III. Community · pg. 41"
 * entry from the Table of Contents.
 *
 * Concept: a corkboard on the café wall, one pinned note per day of the
 * week. Notes are fetched (async, with a loading state) from
 * `fetchWeeklyEvents()` in data/weeklyEvents.js — the file an admin
 * edits every week — rather than hardcoded here, so updating what's on
 * the board never touches this component. Today's note gets a small
 * "TODAY" flag so a same-day visitor's eye lands on it first.
 *
 * DATA
 *   Expects `src/data/weeklyEvents.js` (created alongside this file).
 *   Adjust the import path if your data files live elsewhere.
 * -----------------------------------------------------------------------
 */

const accentStyles = {
  navy: "bg-brand-navy",
  brick: "bg-brand-brick",
  sage: "bg-brand-sage",
};

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1", "rotate-2"];

function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function PinnedNote({ event, index, isToday }) {
  const [ref, inView] = useInView(0.3);
  const accent = accentStyles[event.accent] ?? accentStyles.navy;
  const tilt = tilts[index % tilts.length];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      className={`relative transition-all duration-500 ease-out
        ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      {/* pushpin */}
      <span
        className="absolute -top-2.5 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full
          bg-brand-brick shadow-[0_2px_3px_rgba(0,0,0,0.4)] ring-2 ring-brand-brick/30"
        aria-hidden="true"
      />

      <div
        className={`relative rounded-sm bg-white p-5 pt-6 shadow-md transition-transform duration-300
          hover:-translate-y-1 hover:rotate-0 ${tilt}`}
      >
        {isToday && (
          <span className="absolute -right-2 -top-2 rotate-6 rounded-full bg-brand-sage px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-brand-navy shadow-sm">
            Today
          </span>
        )}

        <span className={`inline-block rounded-full ${accent} px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-wide text-brand-cream`}>
          {event.day}
        </span>

        <h3 className="mt-3 font-display text-lg font-bold leading-tight text-brand-navy">
          {event.title}
        </h3>
        <p className="mt-1 font-hand text-base text-brand-brick">{event.time}</p>
        <p className="mt-2 font-body text-[13px] leading-snug text-brand-navy/65">
          {event.tagline}
        </p>
      </div>
    </div>
  );
}

function NoteSkeleton({ index }) {
  const tilt = tilts[index % tilts.length];
  return (
    <div className={`relative animate-pulse rounded-sm bg-white/60 p-5 pt-6 shadow-md ${tilt}`}>
      <span
        className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-navy/20"
        aria-hidden="true"
      />
      <div className="h-4 w-16 rounded-full bg-brand-navy/10" />
      <div className="mt-3 h-4 w-3/4 rounded bg-brand-navy/10" />
      <div className="mt-2 h-3 w-1/2 rounded bg-brand-navy/10" />
      <div className="mt-3 h-3 w-full rounded bg-brand-navy/10" />
    </div>
  );
}

export default function EventsNoticeboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [headerRef, headerIn] = useInView(0.5);

  useEffect(() => {
    let cancelled = false;
    fetchWeeklyEvents()
      .then((data) => {
        if (!cancelled) setEvents(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="community" className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="font-hand text-2xl text-brand-sage">Chapter III · pg. 41</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            This Week at Kadhaigal
          </h2>
          <p className="mx-auto mt-3 max-w-md font-display italic text-brand-navy/60">
            Pinned fresh every Monday — swing by, no invite needed.
          </p>
        </div>

        {/* the corkboard */}
        <div
          className="relative mt-14 rounded-2xl border-[10px] border-brand-navy/90 p-6 shadow-xl sm:p-10"
          style={{
            backgroundColor: "#C7A876",
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)," +
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px, 18px 18px",
            backgroundPosition: "0 0, 9px 9px",
          }}
        >
          {error ? (
            <p className="py-10 text-center font-body text-brand-navy/60">
              Couldn't load this week's board — please check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 7 }).map((_, i) => <NoteSkeleton key={i} index={i} />)
                : events.map((event, index) => (
                    <PinnedNote
                      key={event.day}
                      event={event}
                      index={index}
                      isToday={event.day === todayName}
                    />
                  ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          section * { transition-duration: 1ms !important; animation-duration: 1ms !important; }
        }
      `}</style>
    </section>
  );
}