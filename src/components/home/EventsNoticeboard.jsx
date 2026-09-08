import { useEffect, useRef, useState } from "react";
import { getNoticeboardEvents, hasEventEnded } from "../../lib/eventsStore.js";

const accentStyles = {
  navy: "bg-brand-navy",
  brick: "bg-brand-brick",
  sage: "bg-brand-sage",
};

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1", "rotate-2"];

function formatTimeRange(event) {
  if (event.scheduleLabel) return event.scheduleLabel;
  if (!event.startTime) return "";
  const format = (t) => {
    const [h, m] = t.split(":");
    const hour = ((Number(h) + 11) % 12) + 1;
    const ampm = Number(h) < 12 ? "AM" : "PM";
    return `${hour}:${m} ${ampm}`;
  };
  return event.endTime ? `${format(event.startTime)} – ${format(event.endTime)}` : format(event.startTime);
}

function dayNameFor(dateStr) {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", { weekday: "long" });
}

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
      style={{ transitionDelay: inView ? `${index * 50}ms` : "0ms" }}
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
        className={`relative rounded-sm bg-white p-4 pt-5 shadow-md transition-transform duration-300
          hover:-translate-y-1 hover:rotate-0 ${tilt}`}
      >
        {isToday && (
          <span className="absolute -right-2 -top-2 rotate-6 rounded-full bg-brand-sage px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-brand-navy shadow-sm">
            Today
          </span>
        )}

        <span className={`inline-block rounded-full ${accent} px-2 py-0.5 font-body text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-brand-cream`}>
          {dayNameFor(event.date)}
        </span>

        <h3 className="mt-2 font-display text-base font-bold leading-tight text-brand-navy">
          {event.title}
        </h3>
        <p className="mt-1 font-hand text-sm text-brand-brick">{formatTimeRange(event)}</p>
        {event.description && (
          <p className="mt-1.5 font-body text-xs leading-snug text-brand-navy/65">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

function NoteSkeleton({ index }) {
  const tilt = tilts[index % tilts.length];
  return (
    <div className={`relative animate-pulse rounded-sm bg-white/60 p-4 pt-5 shadow-md ${tilt}`}>
      <span
        className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-navy/20"
        aria-hidden="true"
      />
      <div className="h-3.5 w-14 rounded-full bg-brand-navy/10" />
      <div className="mt-2.5 h-3.5 w-3/4 rounded bg-brand-navy/10" />
      <div className="mt-1.5 h-3 w-1/2 rounded bg-brand-navy/10" />
      <div className="mt-2 h-2.5 w-full rounded bg-brand-navy/10" />
    </div>
  );
}

export default function EventsNoticeboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(new Date());
  const [headerRef, headerIn] = useInView(0.5);

  useEffect(() => {
    let cancelled = false;
    getNoticeboardEvents()
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

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const todayStr = now.toISOString().slice(0, 10);
  const activeEvents = events.filter((ev) => !hasEventEnded(ev, now)).slice(0, 12);

  return (
    <section id="community" className="relative overflow-hidden bg-brand-cream py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl xl:max-w-[1480px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <h2 className="mt-2 font-display text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl">
            This Week at Kadhaigal
          </h2>
          <p className="mx-auto mt-2 max-w-md font-display italic text-sm sm:text-base text-brand-navy/60">
            Pinned fresh every Monday.
          </p>
        </div>

        <div
          className="relative mt-8 sm:mt-10 rounded-2xl border-[10px] border-brand-navy/90 p-5 shadow-xl sm:p-7 lg:p-8"
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {loading
                ? Array.from({ length: 12 }).map((_, i) => <NoteSkeleton key={i} index={i} />)
                : activeEvents.length > 0
                ? activeEvents.map((event, index) => (
                    <PinnedNote
                      key={event.id}
                      event={event}
                      index={index}
                      isToday={event.date === todayStr}
                    />
                  ))
                : Array.from({ length: 1 }).map((_, i) => (
                    <div key={`empty-${i}`} className="col-span-2 py-10 text-center font-body text-brand-navy/60">
                      No upcoming events.
                    </div>
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