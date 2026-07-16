import { useEffect, useRef, useState } from "react";
import bevs from "../../assets/images/bevs.svg";
import teaCake from "../../assets/images/tea cake.svg";

/**
 * MenuPreview (recipe-card variant) — "Chapter II: The Café" (pg. 24)
 * -----------------------------------------------------------------------
 * Same content job as the two-note-card version — why the menu is
 * plant-based, and how it gets built — staged instead as a single
 * vintage recipe index card: a punch-hole, a red margin rule, faint
 * ruled lines, an "INGREDIENTS" list for the values behind the menu,
 * and a numbered "METHOD" for how each dish actually gets approved.
 *
 * This variant sits on brand-navy, matching the page's alternating
 * navy/cream rhythm (Hero → navy, Chapter One → cream, Table of
 * Contents → navy, Stacks → cream, Café → navy, Events → cream). The
 * card itself floats on the dark background the same way the reel
 * frames and TOC panels do elsewhere on the site, rather than sitting
 * in its own boxed-off, differently-colored section.
 *
 * LINKING TO THE MENU PAGE
 *   The CTA below is a plain <a href="/menu">. If this project uses
 *   React Router, swap it for <Link to="/menu">.
 * -----------------------------------------------------------------------
 */

const ingredients = [
  "One part kindness, always plant-based",
  "A season's worth of local produce",
  "Zero artificial shortcuts",
  "One very firm kitchen rule",
];

const method = [
  {
    step: "Ask a simple question",
    detail: "Does this dish survive a full chapter, start to finish?",
  },
  {
    step: "Hand it to a regular",
    detail: "Alongside whatever book they happen to be reading that week.",
  },
  {
    step: "Keep only what gets finished",
    detail: "Plate and book, both. If either gets abandoned, it's back to testing.",
  },
];

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

export default function MenuPreview() {
  const [headerRef, headerIn] = useInView(0.5);
  const [cardRef, cardIn] = useInView(0.15);

  return (
    <section id="the-cafe" className="relative overflow-hidden bg-brand-navy py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 45% at 85% 10%, rgba(157,193,131,0.08), transparent 70%)," +
            "radial-gradient(50% 45% at 10% 95%, rgba(183,65,14,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        <div
          ref={headerRef}
          className={`text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="font-hand text-2xl text-brand-sage">Chapter II · pg. 24</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-brand-cream sm:text-5xl">
            The Recipe Behind the Menu
          </h2>
          <p className="mx-auto mt-3 max-w-md font-display italic text-brand-cream/60">
            Every dish here is entirely plant-based. Here's the actual reasoning.
          </p>
        </div>

        {/* the recipe index card, floating on navy like the reel frames elsewhere */}
        <div
          ref={cardRef}
          className={`relative mt-14 -rotate-1 rounded-sm bg-brand-cream p-8 pl-14 shadow-polaroid
            transition-all duration-700 ease-out hover:rotate-0 sm:p-10 sm:pl-16
            ${cardIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {/* punch hole */}
          <span
            className="absolute left-5 top-8 h-3 w-3 rounded-full bg-brand-navy shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] sm:left-6"
            aria-hidden="true"
          />
          {/* red margin rule */}
          <span className="absolute bottom-6 left-9 top-6 w-px bg-brand-brick/30 sm:left-11" aria-hidden="true" />
          {/* faint ruled lines */}
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 34px, rgba(20,41,80,0.07) 34px, rgba(20,41,80,0.07) 35px)",
            }}
            aria-hidden="true"
          />

          <img
            src={teaCake}
            alt=""
            aria-hidden="true"
            className="absolute -right-4 -top-5 h-16 w-16 rotate-6 opacity-90 sm:h-20 sm:w-20"
          />

          <div className="relative">
            <span className="font-hand text-xl text-brand-brick">Kitchen Notes</span>
            <h3 className="mt-1 font-display text-2xl font-bold text-brand-navy sm:text-3xl">
              Why Plant-Based
            </h3>

            <p className="mt-4 font-body text-[15px] leading-relaxed text-brand-navy/75">
              We didn't set out to be a "plant-based café." We set out to be
              a café where nobody has to ask if there's something they can
              eat. It turned out kindness was the easiest ingredient to
              always keep on hand.
            </p>

            <div className="mt-7 flex items-center gap-2 text-brand-brick/70">
              <img src={bevs} alt="" aria-hidden="true" className="h-6 w-6" />
              <span className="font-body text-xs font-bold uppercase tracking-widest">
                Ingredients
              </span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {ingredients.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-brand-navy/75">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-sage" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 text-brand-brick/70">
              <span className="font-body text-xs font-bold uppercase tracking-widest">
                Method
              </span>
            </div>
            <ol className="mt-2 space-y-3">
              {method.map((m, i) => (
                <li key={m.step} className="flex gap-3">
                  <span className="font-hand text-lg leading-none text-brand-brick">
                    {i + 1}.
                  </span>
                  <p className="font-body text-sm leading-relaxed text-brand-navy/75">
                    <span className="font-bold text-brand-navy">{m.step}.</span>{" "}
                    {m.detail}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex items-baseline justify-between border-t border-dashed border-brand-navy/15 pt-4 font-body text-xs text-brand-navy/50">
              <span>Serves: everyone.</span>
              <span>Prep time: since 2022.</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
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