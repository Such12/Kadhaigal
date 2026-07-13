import { useEffect, useRef, useState } from "react";
import chintuBalancing from "../../assets/images/chintu balancing books.svg";
//import funBg from "../../assets/images/fun bg.svg";

/**
 * OurStory
 * -----------------------------------------------------------------------
 * First section after the Hero on the Home page.
 *
 * Concept — "The Balancing Act": rather than a boxed card, the story is
 * laid out as an open editorial spread. Chintu literally balancing a
 * stack of books stands in for what starting Kadhaigal actually felt
 * like — precarious, a little absurd, and somehow it worked out — so the
 * illustration does the emotional work the copy is making explicit. It
 * sways gently, like it's mid-balance, and a hand-written speech bubble
 * lands the punchline. The whimsical fun_bg scene sits low behind
 * everything as a soft, oversized backdrop rather than a boxed graphic.
 *
 * ASSETS
 *   Expects `chintu_balancing_books.svg` and `fun_bg.svg` at src/assets/
 *   (same folder as the other brand illustrations). Adjust the import
 *   paths if yours live elsewhere.
 * -----------------------------------------------------------------------
 */

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

export default function OurStory() {
  const [textRef, textIn] = useInView(0.3);
  const [artRef, artIn] = useInView(0.3);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      {/* oversized whimsical scene, bleeding off the bottom edge as a soft backdrop */}
      

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* text column */}
        <div
          ref={textRef}
          className={`transition-all duration-700 ease-out
            ${textIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <span className="font-hand text-2xl text-brand-sage">
            How it all began
          </span>

          <h2 className="relative mt-2 inline-block font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            Our Story
            <svg
              viewBox="0 0 180 14"
              className="absolute -bottom-3 left-0 h-3 w-40 text-brand-brick sm:w-48"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M3 8c30-8 60-8 90-3s60 3 84-4" />
            </svg>
          </h2>

          <p className="mt-8 font-body text-lg leading-relaxed text-brand-navy/90 sm:text-xl">
            <span className="float-left mr-2 mt-1 font-display text-6xl font-bold leading-[0.8] text-brand-brick sm:text-7xl">
              I
            </span>
            t started with a simple question over a filter coffee:{" "}
            <span className="font-display italic">
              "Why don't we build a home for the stories that haven't been
              told yet?"
            </span>
          </p>

          <p className="mt-6 font-body text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            We're readers &mdash; the obsessive kind, the kind who press
            books into people's hands and anxiously wait to hear what they
            thought. We wanted a space that felt warm without being
            precious, and open to everyone. We almost called it{" "}
            <span className="line-through decoration-brand-brick/40">
              All Things Beautiful
            </span>
            .
          </p>

          <div className="relative mt-10">
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-8 select-none font-display text-8xl text-brand-brick/15"
            >
              &ldquo;
            </span>
            <p className="relative font-hand text-3xl leading-tight text-brand-brick sm:text-4xl">
              We called it Kadhaigal instead. Stories. All of them. Waiting
              to be found.
            </p>
          </div>
        </div>

        {/* illustration column */}
        <div
          ref={artRef}
          className={`relative flex justify-center transition-all duration-700 ease-out lg:justify-end
            ${artIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="relative">
            {/* hand-written speech bubble, the punchline to the illustration */}
            <div className="absolute -right-2 -top-6 z-10 rotate-3 rounded-2xl rounded-bl-sm bg-white px-4 py-2 shadow-card sm:-right-8">
              <span className="whitespace-nowrap font-hand text-lg text-brand-navy/80">
                Somehow, it all balanced out.
              </span>
            </div>

            <img
              src={chintuBalancing}
              alt="Chintu, the Kadhaigal mascot, balancing a precarious stack of books"
              className="w-56 animate-sway drop-shadow-xl sm:w-72"
            />

            {/* grounding shadow, so the balance feels like it has weight */}
            <div
              className="mx-auto h-3 w-40 rounded-full bg-brand-navy/10 blur-sm sm:w-52"
              aria-hidden="true"
            />
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