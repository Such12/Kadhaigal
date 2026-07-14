import { useEffect, useRef, useState } from "react";
import chintuBalancing from "../../assets/images/chintu balancing books.svg";

/**
 * ChapterOne — "How It All Began"
 * -----------------------------------------------------------------------
 * Second section on the Home page, directly after the Hero (the cover).
 * id="chapter-one" so the Hero's ribbon can scroll straight to it.
 *
 * Concept: the story is laid out as a literal open book spread — two
 * facing pages sharing one spine, with a soft gutter shadow down the
 * middle and small page numbers tucked in the corners. The left page
 * carries the illustration (Chintu balancing a stack of books — a
 * literal image of what starting Kadhaigal felt like); the right page
 * carries the text, typeset like a printed page: drop cap, a small
 * printer's dinkus between paragraphs, and a pull-quote as the closing
 * line.
 *
 * ASSETS
 *   Expects `chintu_balancing_books.svg` at src/assets/.
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

export default function ChapterOne() {
  const [spreadRef, spreadIn] = useInView(0.2);

  return (
    <section id="chapter-one" className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* chapter tag, centered above the spread */}
        <div className="flex flex-col items-center text-center">
          <span className="font-hand text-2xl text-brand-sage">Chapter One</span>
          <span aria-hidden="true" className="mt-1 font-display text-lg text-brand-brick/40">
            &#10086;
          </span>
        </div>

        {/* the open book */}
        <div
          ref={spreadRef}
          className={`relative mt-8 grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-polaroid
            transition-all duration-700 ease-out md:grid-cols-2
            ${spreadIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {/* spine gutter shadow, desktop only */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-16 -translate-x-1/2
              bg-gradient-to-r from-transparent via-black/10 to-transparent md:block"
            aria-hidden="true"
          />
          {/* page-curl corner shadows */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 opacity-40"
            style={{ background: "radial-gradient(circle at 0 100%, rgba(0,0,0,0.15), transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 opacity-40"
            style={{ background: "radial-gradient(circle at 100% 100%, rgba(0,0,0,0.15), transparent 70%)" }}
            aria-hidden="true"
          />

          {/* left page — illustration */}
          <div className="relative flex flex-col items-center justify-center bg-brand-cream/50 p-10 md:p-14">
            <img
              src={chintuBalancing}
              alt="Chintu, the Kadhaigal mascot, balancing a precarious stack of books"
              className="w-44 animate-sway drop-shadow-xl sm:w-56"
            />
            <div className="mt-3 h-2 w-28 rounded-full bg-brand-navy/10 blur-sm sm:w-36" aria-hidden="true" />
            <span className="absolute bottom-4 left-6 font-hand text-sm text-brand-navy/30">12</span>
          </div>

          {/* right page — the story */}
          <div className="relative p-10 md:p-14">
            <h3 className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
              How It All Began
            </h3>

            <p className="mt-6 font-body text-base leading-relaxed text-brand-navy/85 sm:text-lg">
              <span className="float-left mr-2 mt-1 font-display text-6xl font-bold leading-[0.8] text-brand-brick">
                I
              </span>
              t started with a simple question over a filter coffee:{" "}
              <span className="font-display italic">
                "Why don't we build a home for the stories that haven't been
                told yet?"
              </span>
            </p>

            <p className="mt-5 font-body text-[15px] leading-relaxed text-brand-navy/70 sm:text-base">
              We're readers &mdash; the obsessive kind, the kind who press
              books into people's hands and anxiously wait to hear what they
              thought. We wanted a space that felt warm without being
              precious, and open to everyone.
            </p>

            <div className="my-6 flex items-center gap-3 text-brand-brick/30" aria-hidden="true">
              <span className="h-px flex-1 bg-current" />
              <span className="font-display text-sm">&#10086;</span>
              <span className="h-px flex-1 bg-current" />
            </div>

            <p className="font-body text-[15px] leading-relaxed text-brand-navy/70 sm:text-base">
              We almost called it{" "}
              <span className="line-through decoration-brand-brick/40">
                All Things Beautiful
              </span>
              . We called it Kadhaigal instead.
            </p>

            <p className="mt-6 font-hand text-2xl leading-tight text-brand-brick sm:text-3xl">
              Stories. All of them. Waiting to be found.
            </p>

            <span className="absolute bottom-4 right-6 font-hand text-sm text-brand-navy/30">13</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .animate-sway {
          transform-origin: 50% 90%;
          animation: sway 4.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-sway { animation: none; }
          section * { transition-duration: 1ms !important; }
        }
      `}</style>
    </section>
  );
}