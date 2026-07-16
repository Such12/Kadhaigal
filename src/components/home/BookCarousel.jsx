import { useEffect, useRef, useState } from "react";

/**
 * StacksSpotlight — "Chapter I: The Stacks" (pg. 07)
 * -----------------------------------------------------------------------
 * Fourth section on the Home page. Picks up the "I. The Stacks · pg. 07"
 * entry from the Table of Contents.
 *
 * Concept: staged like the staff-recommendation shelf you'd find in an
 * actual indie bookstore — a stylized cover, a handwritten shelf-talker
 * card clipped beneath it with a one-line pitch and the recommender's
 * initials, and a rank badge for the week's top 3. All three "lean" on a
 * shared shelf-ledge, echoing the same shelf motif used elsewhere on the
 * site.
 *
 * SWAPPING IN REAL BOOKS / COVERS
 *   Replace the `picks` array below with your real weekly picks. If you
 *   have real cover art, swap the colored `coverAccent` div for an
 *   <img src={...} /> of the same size — everything else (badge, card,
 *   shelf) keeps working unchanged.
 * -----------------------------------------------------------------------
 */

const picks = [
  {
    rank: 1,
    title: "The Monsoon Diaries",
    author: "Meera Krishnan",
    accent: "brick",
    blurb: "Rain, regret, and one really good adrak chai. Read it twice.",
    staff: "— Aisha, front counter",
  },
  {
    rank: 2,
    title: "Small Gods of Sahakarnagar",
    author: "Arvind Rao",
    accent: "navy",
    blurb: "Magical realism set three streets from here. Uncanny, honestly.",
    staff: "— Dev, weekend barista",
  },
  {
    rank: 3,
    title: "Letters I Never Sent",
    author: "Priya Suresh",
    accent: "sage",
    blurb: "Bring tissues. Bring a highlighter. Bring both.",
    staff: "— Founder's pick",
  },
];

const accentStyles = {
  brick: { cover: "bg-brand-brick", badge: "bg-brand-brick", tape: "bg-brand-brick/70" },
  navy: { cover: "bg-brand-navy", badge: "bg-brand-navy", tape: "bg-brand-navy/70" },
  sage: { cover: "bg-brand-sage", badge: "bg-brand-sage", tape: "bg-brand-sage/80" },
};

function useInView(threshold = 0.3) {
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

function PickCard({ pick, index }) {
  const [ref, inView] = useInView(0.3);
  const s = accentStyles[pick.accent];
  const tilt = index === 0 ? "-rotate-2" : index === 2 ? "rotate-2" : "rotate-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 130}ms` : "0ms" }}
      className={`relative flex flex-col items-center transition-all duration-700 ease-out
        ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {/* rank badge */}
      <span
        className={`absolute -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full
          ${s.badge} font-display text-sm font-bold text-brand-cream shadow-md`}
      >
        No.{pick.rank}
      </span>

      {/* stylized cover — swap for a real <img> when you have cover art */}
      <div
        className={`flex h-56 w-40 flex-col justify-between rounded-sm ${s.cover} p-4 shadow-polaroid
          transition-transform duration-500 hover:-translate-y-1 ${tilt} hover:rotate-0`}
      >
        <span className="h-px w-8 bg-brand-cream/40" />
        <div>
          <p className="font-display text-lg font-bold leading-tight text-brand-cream">
            {pick.title}
          </p>
          <p className="mt-2 font-body text-xs uppercase tracking-wide text-brand-cream/60">
            {pick.author}
          </p>
        </div>
        <span className="h-px w-8 self-end bg-brand-cream/40" />
      </div>

      {/* shelf-talker card, clipped beneath the cover */}
      <div className="relative -mt-2 w-48 rounded-sm bg-white p-4 pt-5 text-center shadow-card">
        <span
          className={`absolute -top-1.5 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full ${s.tape}`}
          aria-hidden="true"
        />
        <p className="font-hand text-lg leading-snug text-brand-navy/80">
          {pick.blurb}
        </p>
        <p className="mt-2 font-body text-[11px] text-brand-navy/40">{pick.staff}</p>
      </div>
    </div>
  );
}

export default function StacksSpotlight() {
  const [headerRef, headerIn] = useInView(0.5);

  return (
    <section id="the-stacks" className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="font-hand text-2xl text-brand-sage">Chapter I · pg. 07</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            Fresh Off the Stacks
          </h2>
          <p className="mx-auto mt-3 max-w-md font-display italic text-brand-navy/60">
            Handpicked every Monday by people who actually read them.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-3 sm:gap-x-6">
            {picks.map((pick, index) => (
              <PickCard key={pick.rank} pick={pick} index={index} />
            ))}
          </div>
          {/* shared shelf-ledge, desktop only */}
          <div
            className="absolute -bottom-6 left-0 right-0 hidden h-px bg-[repeating-linear-gradient(90deg,rgba(20,41,80,0.2)_0px,rgba(20,41,80,0.2)_5px,transparent_5px,transparent_11px)] sm:block"
            aria-hidden="true"
          />
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          section * { transition-duration: 1ms !important; }
        }
      `}</style>
    </section>
  );
}