import { useEffect, useRef, useState, useCallback } from "react";

/**
 * FoundersJourney (pinned scrollytelling edition)
 * -----------------------------------------------------------------------
 * "About the Founders' Journey" section for the Kadhaigal About page.
 *
 * STRUCTURE
 *   1. A normal, non-pinned title block ("Kadhaigal Diaries" / "The
 *      Founders' Journey" / subtitle). It scrolls past like any other
 *      section — nothing pins yet.
 *   2. The chapter stage, wrapped in a tall spacer div. Its inner
 *      section is `sticky top-0 h-screen`, so once the title has
 *      scrolled out and this section reaches the top of the viewport,
 *      it pins there for the duration of the spacer's extra height.
 *      While pinned, scroll progress translateX's the chapter track
 *      sideways, so ordinary scrolling pans through the chapters. Once
 *      you pass the spacer's full height, it un-pins and the page
 *      continues to whatever comes next.
 *
 *   Because the title lives outside the pinned stage, the stage gets the
 *   full viewport height for cards — nothing gets clipped.
 *
 * VIDEO MODAL
 *   Sized from height (max 65vh / 480px), not width, so it never grows
 *   larger than comfortably fits the screen. Esc, backdrop click, or the
 *   close button dismiss it; background scroll locks while it's open.
 *
 * TUNING
 *   `vhPerChapter` controls how much vertical scrolling each chapter
 *   costs. `gap-x-*` classes on the track control chapter spacing.
 *
 * CONNECTING REAL INSTAGRAM REELS
 *   Fill in `reelUrl` per chapter, e.g.
 *   "https://www.instagram.com/reel/C1a2B3cDeFg/" — "embed/" is appended
 *   automatically.
 * -----------------------------------------------------------------------
 */

const vhPerChapter = 65;

const chapters = [
  {
    id: "ch1",
    label: "Chapter One",
    year: "2019",
    title: "Two Readers, One Napkin",
    description:
      "A rented table at a friend's tea stall, a shared paperback, and a napkin sketch of a room lined floor-to-ceiling with books.",
    quote: "We wanted to open a shelf, not a business.",
    reelUrl: "",
    accent: "brick",
  },
  {
    id: "ch2",
    label: "Chapter Two",
    year: "2020",
    title: "The Shuttered Shopfront",
    description:
      "Eleven months of walking past the same empty corner unit before we finally asked for the keys. Leaking roof included.",
    quote: "The roof leaked for a week. The books stayed dry.",
    reelUrl: "",
    accent: "sage",
  },
  {
    id: "ch3",
    label: "Chapter Three",
    year: "2021",
    title: "Five Hundred Spines",
    description:
      "We asked everyone we knew to lend or gift their favourite books — the ones re-read until the spines cracked.",
    quote: "Every book on that shelf came with a story attached.",
    reelUrl: "",
    accent: "brick",
  },
  {
    id: "ch4",
    label: "Chapter Four",
    year: "2022",
    title: "A Menu Like a Contents Page",
    description:
      "Filter kaapi named after monsoon poems, a chai built for slow chapters, and dishes tested one book at a time.",
    quote: "If it doesn't pair with a paragraph, it's off the menu.",
    reelUrl: "",
    accent: "sage",
  },
  {
    id: "ch5",
    label: "Chapter Five",
    year: "2022",
    title: "Opening Day, Six Customers",
    description:
      "We printed twenty flyers and expected a quiet Tuesday. Six strangers walked in, four stayed past closing.",
    quote: '"Found my new Sunday." — Guestbook, page one.',
    reelUrl: "",
    accent: "brick",
  },
  {
    id: "ch6",
    label: "Chapter Six",
    year: "Now",
    title: "Still Writing This One",
    description:
      "Two thousand books, a reading circle that's outgrown three rooms, and a community shelf for notes to strangers.",
    quote: "This chapter doesn't have an ending. Come help write it.",
    reelUrl: "",
    accent: "sage",
  },
];

function useInView(threshold = 0.5) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ChapterSeal({ index, accent, active }) {
  const bg = accent === "sage" ? "bg-brand-sage" : "bg-brand-brick";
  return (
    <div
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${bg}
        ring-4 ring-brand-navy transition-all duration-500 ease-out
        ${active ? "scale-100 opacity-100" : "scale-75 opacity-50"}`}
    >
      <span className="font-hand text-base leading-none text-brand-cream">
        {index + 1}
      </span>
    </div>
  );
}

/** Poster + play button. Opens the shared lightbox rather than playing inline. */
function ReelPoster({ chapter, tilt, onOpen }) {
  const hasReel = Boolean(chapter.reelUrl);
  return (
    <div
      className={`group relative mx-auto w-full max-w-[150px] rounded-sm bg-brand-cream p-1.5 pb-3
        shadow-polaroid transition-transform duration-500 ease-out
        ${tilt} hover:rotate-0`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-brand-navy/90">
        <button
          type="button"
          onClick={() => onOpen(chapter)}
          aria-label={hasReel ? `Play reel: ${chapter.title}` : `Preview reel for ${chapter.title}`}
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-1.5
            bg-gradient-to-br from-brand-navy via-[#1c355f] to-brand-navy"
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full
              ${hasReel ? "bg-brand-brick" : "bg-brand-cream/20"}
              transition-transform duration-300 group-hover:scale-110`}
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-brand-cream">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="px-2 text-center font-body text-[10px] leading-tight text-brand-cream/70">
            {hasReel ? "Watch reel" : "Coming soon"}
          </span>
        </button>
      </div>
    </div>
  );
}

function ChapterCard({ chapter, tilt, index, active, onOpenReel }) {
  const [ref, visible] = useInView(0.45);
  return (
    <div
      ref={ref}
      className={`flex w-[210px] shrink-0 flex-col items-center sm:w-[230px]
        transition-opacity duration-500 ease-out
        ${visible ? "opacity-100" : "opacity-40"}`}
    >
      <div className="mb-2 flex flex-col items-center gap-1.5">
        <ChapterSeal index={index} accent={chapter.accent} active={active} />
        <span className="whitespace-nowrap font-hand text-base text-brand-brick">
          {chapter.label} · {chapter.year}
        </span>
      </div>

      {/* stitch connecting the seal to the card */}
      <span
        className="h-4 w-px bg-[repeating-linear-gradient(180deg,rgba(245,245,220,0.4)_0px,rgba(245,245,220,0.4)_3px,transparent_3px,transparent_7px)]"
        aria-hidden="true"
      />

      <div className="mt-2 w-full rounded-sm bg-brand-cream/95 p-3 shadow-card">
        <h3 className="font-head text-base leading-tight text-brand-navy">
          {chapter.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 font-body text-[11px] leading-snug text-brand-navy/75">
          {chapter.description}
        </p>
        <p className="mt-1.5 line-clamp-2 border-l-2 border-brand-brick/40 pl-2 font-hand text-[13px] leading-tight text-brand-navy/55">
          {chapter.quote}
        </p>
        <div className="mt-2">
          <ReelPoster chapter={chapter} tilt={tilt} onOpen={onOpenReel} />
        </div>
      </div>
    </div>
  );
}

function NavButton({ direction, onClick, disabled }) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous chapter" : "Next chapter"}
      className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full
        bg-brand-cream/10 text-brand-cream ring-1 ring-brand-cream/25 backdrop-blur-sm
        transition-all duration-300 hover:bg-brand-brick hover:ring-brand-brick
        disabled:pointer-events-none disabled:opacity-0"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
        <path
          d={isLeft ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * Fullscreen lightbox that plays the reel. Sized from height (not width)
 * so it scales to the viewport instead of ballooning to fill it.
 */
function ReelModal({ chapter, onClose }) {
  useEffect(() => {
    if (!chapter) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [chapter, onClose]);

  if (!chapter) return null;

  const hasReel = Boolean(chapter.reelUrl);
  const embedSrc = hasReel ? `${chapter.reelUrl.replace(/\/?$/, "/")}embed/` : null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-navy/90 p-6 backdrop-blur-sm animate-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${chapter.title} reel`}
    >
      <div
        className="relative inline-block animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full
            bg-brand-cream/10 text-brand-cream ring-1 ring-brand-cream/25
            transition-colors duration-300 hover:bg-brand-brick hover:ring-brand-brick"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex flex-col items-center rounded-sm bg-brand-cream p-3 pb-4 shadow-polaroid">
          {/* Sized by height so a tall viewport gets a bigger player and a
              short one never overflows; width follows from the 9:16 ratio. */}
          <div className="relative h-[60vh] max-h-[440px] aspect-[9/16] overflow-hidden rounded-[2px] bg-brand-navy">
            {hasReel ? (
              <iframe
                title={chapter.title}
                src={embedSrc}
                className="absolute inset-0 h-full w-full border-0"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-body text-xs text-brand-cream/50">
                  This reel isn&rsquo;t linked yet.
                </span>
                <span className="font-hand text-base text-brand-cream/40">
                  Add a reelUrl for &ldquo;{chapter.title}&rdquo;
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 text-center font-hand text-base text-brand-navy/70">
            {chapter.label} — {chapter.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FoundersJourney() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeReel, setActiveReel] = useState(null);

  // Measure how far the track needs to travel horizontally to reveal
  // the last chapter, and keep it correct across resizes.
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      setMaxTranslate(Math.max(0, trackWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive progress from ordinary page scroll while the section is pinned.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = wrapperRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pinnedDistance = el.offsetHeight - window.innerHeight;
        const raw = pinnedDistance > 0 ? -rect.top / pinnedDistance : 0;
        const clamped = Math.min(1, Math.max(0, raw));
        setProgress(clamped);
        setActiveIndex(
          Math.min(
            chapters.length - 1,
            Math.round(clamped * (chapters.length - 1))
          )
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToChapter = useCallback((dir) => {
    const el = wrapperRef.current;
    if (!el) return;
    const pinnedDistance = el.offsetHeight - window.innerHeight;
    const step = pinnedDistance / (chapters.length - 1);
    window.scrollBy({ top: dir * step, behavior: "smooth" });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      scrollToChapter(1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollToChapter(-1);
    }
  };

  const translateX = progress * maxTranslate;

  return (
    <>
      {/* Title block — normal document flow, scrolls past like any section */}
      <div className="relative overflow-hidden bg-brand-navy px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 45% at 20% 20%, rgba(157,193,131,0.08), transparent 70%)," +
              "radial-gradient(50% 45% at 80% 80%, rgba(183,65,14,0.10), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <span className="font-hand text-2xl text-brand-sage">
            Kadhaigal Diaries
          </span>
          <h2 className="mt-2 font-head text-4xl text-brand-cream sm:text-5xl">
            The Founders&rsquo; Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-brand-cream/70">
            We filmed almost every step on Instagram, half by accident. Keep
            scrolling — the chapters take it from here.
          </p>
        </div>
      </div>

      {/* Pinned horizontal chapter stage */}
      <div
        ref={wrapperRef}
        className="relative bg-brand-navy"
        style={{ height: `calc(100vh + ${chapters.length * vhPerChapter}vh)` }}
      >
        <section
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="region"
          aria-label="Founders' journey chapters, scroll to move through each one"
          className="sticky top-0 flex h-screen flex-col overflow-hidden bg-brand-navy outline-none"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(50% 45% at 15% 10%, rgba(157,193,131,0.08), transparent 70%)," +
                "radial-gradient(50% 45% at 85% 90%, rgba(183,65,14,0.10), transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* pinned horizontal stage */}
          <div className="relative min-h-0 flex-1 mt-[5px] sm:mt-[10px]">
            {/* nav arrows, aligned to roughly where the cards sit */}
            <div className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center pt-16 sm:pt-20">
              <NavButton
                direction="left"
                onClick={() => scrollToChapter(-1)}
                disabled={progress <= 0.01}
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-2 z-20 flex items-center pt-16 sm:pt-20">
              <NavButton
                direction="right"
                onClick={() => scrollToChapter(1)}
                disabled={progress >= 0.99}
              />
            </div>

            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-navy to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-navy to-transparent sm:w-16" />

            {/* progress rail — pinned near the TOP of the stage, seals hang from it */}
            <div className="pointer-events-none absolute left-[9%] right-[9%] top-16 z-10 h-px sm:left-[11%] sm:right-[11%] sm:top-20">
              <div className="h-px w-full bg-[repeating-linear-gradient(90deg,rgba(245,245,220,0.3)_0px,rgba(245,245,220,0.3)_4px,transparent_4px,transparent_9px)]" />
              <div
                className="absolute inset-y-0 left-0 h-px bg-[repeating-linear-gradient(90deg,#B7410E_0px,#B7410E_4px,transparent_4px,transparent_9px)] transition-[width] duration-100 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-0 -translate-x-1/2 -translate-y-full transition-[left] duration-100 ease-out"
                style={{ left: `${progress * 100}%` }}
              >
                <div className="h-5 w-3 bg-brand-sage" />
                <div className="absolute -bottom-1.5 left-0 h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-brand-sage" />
              </div>
            </div>

            {/* the moving track — top-anchored, seals sit on the rail above */}
            <div
              ref={trackRef}
              className="absolute inset-0 flex w-max items-start gap-x-20 px-[9vw] pt-14 will-change-transform sm:gap-x-28 sm:pt-[76px]"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  tilt={index % 2 === 0 ? "-rotate-2" : "rotate-2"}
                  index={index}
                  active={index === activeIndex}
                  onOpenReel={setActiveReel}
                />
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="relative shrink-0 px-6 pb-6 pt-3 text-center">
            
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-body text-xs text-brand-cream/70
                transition-colors duration-300 hover:text-brand-cream"
            >
              Watch every reel on Instagram
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      <ReelModal chapter={activeReel} onClose={() => setActiveReel(null)} />

      <style>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-backdrop { animation: modal-backdrop-in 0.2s ease-out; }
        .animate-modal-in { animation: modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
        @media (prefers-reduced-motion: reduce) {
          section *, .animate-modal-backdrop, .animate-modal-in {
            transition-duration: 1ms !important;
            animation-duration: 1ms !important;
          }
        }
      `}</style>
    </>
  );
}