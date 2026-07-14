import mascots from "../../assets/images/chintu w pintu.svg";

/**
 * Hero — "The Cover"
 * -----------------------------------------------------------------------
 * First section on the Home page.
 *
 * Concept: the hero is staged as the front cover of a closed hardcover
 * book. A double-line frame stands in for the embossed edge of a jacket,
 * the title is foil-stamped (layered text-shadow), and a ribbon bookmark
 * sticks out of the very top of the viewport — like the one poking out
 * of a real book — inviting you to pull it and "Begin." Clicking it
 * scrolls down into Chapter One.
 *
 * Pairs with ChapterOne.jsx (id="chapter-one") and TableOfContents.jsx.
 * For the ribbon's click to animate rather than jump, add this once,
 * globally, e.g. in your base CSS:
 *   html { scroll-behavior: smooth; }
 * -----------------------------------------------------------------------
 */

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-navy px-6 py-24 text-center">
      {/* embossed double-line cover frame */}
      <div className="pointer-events-none absolute inset-5 rounded-sm border border-brand-cream/15 sm:inset-8" />
      <div className="pointer-events-none absolute inset-7 rounded-sm border border-brand-cream/10 sm:inset-10" />

      {/* soft cover vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(183,65,14,0.10), transparent 70%)," +
            "radial-gradient(80% 60% at 50% 100%, rgba(0,0,0,0.25), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ribbon bookmark, sticking out of the top edge */}
      <a
        href="#chapter-one"
        aria-label="Scroll down to begin the story"
        className="group absolute right-8 top-0 z-20 flex h-40 w-12 flex-col items-center justify-between
          bg-brand-brick pb-3 pt-5 shadow-lg transition-transform duration-300
          hover:translate-y-2 sm:right-16 sm:h-52 sm:w-14"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)" }}
      >
        <span className="font-head text-xs tracking-[0.2em] text-brand-cream [writing-mode:vertical-rl]">
          BEGIN
        </span>
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 animate-bounce fill-none stroke-brand-cream"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

      {/* cover content */}
      <div className="relative">
        <span className="font-hand text-2xl text-brand-sage sm:text-3xl">
          A Book Café in Sahakarnagar
        </span>

        <h1
          className="mt-3 font-head text-6xl tracking-wide text-brand-cream sm:text-8xl"
          style={{
            textShadow:
              "0 1px 0 rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.25), 0 -1px 0 rgba(245,245,220,0.15)",
          }}
        >
          KADHAIGAL
        </h1>

        <p className="mx-auto mt-5 max-w-md font-display italic text-brand-cream/70 sm:text-lg">
          Where every cup comes with a chapter, and every visit adds a page.
        </p>

        {/* mascots, resting on a brick shelf-ledge like a cover illustration */}
        <div className="mt-10 flex flex-col items-center">
          <img
            src={mascots}
            alt="Chintu and Pintu, the Kadhaigal mascots"
            className="w-28 animate-float-slow sm:w-36"
          />
          <span className="mt-2 h-[3px] w-24 rounded-full bg-brand-brick/60 sm:w-32" />
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-brand-cream/50">
        <span className="font-hand text-lg">scroll to open the book</span>
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 animate-bounce fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-slow { animation: float-slow 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow, .animate-bounce { animation: none; }
        }
      `}</style>
    </section>
  );
}