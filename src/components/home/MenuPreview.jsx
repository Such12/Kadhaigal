import { useEffect, useRef, useState } from "react";

/**
 * MenuPreview (blackboard variant) — "Chapter II: The Café" (pg. 24)
 * -----------------------------------------------------------------------
 * A plain black board with a simple brick border — no wood-stripe frame,
 * no chalk-dust dot texture. Content is one short, punchy paragraph
 * about the menu's curation, with a couple of words sized/colored up for
 * emphasis, closing on a small stacked ribbon seal.
 *
 * FONT
 *   Uses "Schoolbell" (Google Fonts) for a genuine chalk look, rather
 *   than the site's default hand font (Caveat), which reads too smooth
 *   for a board. Add this to index.html's <head>:
 *
 *     <link rel="preconnect" href="https://fonts.googleapis.com">
 *     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 *     <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet">
 *
 *   It's applied locally via inline style in the <Chalk> wrapper below,
 *   so it only affects this section — no Tailwind config changes needed.
 *   Chalk letterforms also run through an SVG feTurbulence/
 *   feDisplacementMap filter for roughened edges on top of the font.
 *
 * LINKING TO THE MENU PAGE
 *   The CTA below is a plain <a href="/menu">. If this project uses
 *   React Router, swap it for <Link to="/menu">.
 * -----------------------------------------------------------------------
 */

function useInView(threshold = 0.25) {
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

/** Wraps chalk text in the Schoolbell font + roughened-edge filter. */
function Chalk({ as: Tag = "span", className = "", style = {}, children }) {
  return (
    <Tag
      className={className}
      style={{ fontFamily: "'Schoolbell', cursive", filter: "url(#chalk-roughen)", ...style }}
    >
      {children}
    </Tag>
  );
}

function Flourish({ flip = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={`h-3.5 w-6 fill-none stroke-brand-cream/40 ${flip ? "-scale-x-100" : ""} ${className}`}
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M2 20c8-2 12-8 14-16" />
      <path d="M10 8c2-2 5-2 7 0" />
    </svg>
  );
}

export default function MenuPreview() {
  const [headerRef, headerIn] = useInView(0.5);
  const [boardRef, boardIn] = useInView(0.15);

  return (
    <section id="the-cafe" className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      {/* SVG filter definition — zero size, referenced by every <Chalk> element */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="chalk-roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" />
        </filter>
      </svg>

      <div className="mx-auto max-w-3xl px-3">
        <div
          ref={headerRef}
          className={`text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="font-hand text-2xl text-brand-sage">Chapter II · pg. 24</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            What's On the Board
          </h2>
          <p className="mx-auto mt-3 max-w-md font-display italic text-brand-navy/60">
            Every dish here is entirely plant-based &mdash; here's the whole
            reasoning, in one breath.
          </p>
        </div>

        {/* the board — simple border, no wood-stripe frame */}
        <div
          ref={boardRef}
          className={`relative mt-14 overflow-hidden rounded-lg border-[6px] border-brand-brick/70
            bg-[#111111] px-6 py-10 shadow-2xl transition-all duration-700 ease-out
            sm:px-12 sm:py-14
            ${boardIn ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.98] opacity-0"}`}
        >
          {/* soft vignette for depth, no dot texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)" }}
            aria-hidden="true"
          />

          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2.5">
              <Flourish />
              <Chalk as="span" className="text-2xl tracking-wide text-brand-cream sm:text-3xl">
                Our Menu Philosophy
              </Chalk>
              <Flourish flip />
            </div>
            <svg viewBox="0 0 200 10" className="mx-auto mt-1 h-2 w-40 text-brand-cream/30 sm:w-48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 6c40-6 80-6 120-2s60 3 76-3" />
            </svg>

            <Chalk
              as="p"
              className="mx-auto mt-7 max-w-xl text-xl leading-relaxed text-brand-cream/85 sm:text-2xl"
            >
              Every dish here is{" "}
              <span className="text-brand-sage">entirely plant-based</span>{" "}
              &mdash; not a trend, just the easiest way to make sure{" "}
              <span className="text-2xl text-brand-brick sm:text-3xl">nobody</span>{" "}
              has to ask what they can eat. Tested on real regulars, kept only
              if it earns its place.
            </Chalk>

            <div className="mt-7 flex flex-col items-center gap-1">
              {["PAIRS WELL", "WITH A GOOD", "PARAGRAPH"].map((line, i) => (
                <span
                  key={line}
                  className="rounded-sm bg-brand-brick px-4 py-0.5 font-head text-[10px] tracking-[0.2em] text-brand-cream shadow-md sm:text-xs"
                  style={{
                    transform: `rotate(${i === 0 ? -1.5 : i === 2 ? 1.5 : 0}deg)`,
                    marginTop: i === 0 ? 0 : "-2px",
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/menu"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-brick px-8 py-3
              font-body text-sm text-brand-cream shadow-md transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-lg"
          >
            See What Made the Cut
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
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