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

          <h2 className="relative mt-2 inline-block font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            Our Story
          </h2>

          <p className="mt-8 font-body text-lg leading-relaxed text-brand-navy/90 sm:text-xl">
            It started with a simple question over a filter coffee:{" "}
            <span className="font-display italic">
              "Why don't we build a home for the stories that haven't been
              told yet?"
            </span>
          </p>

          <p className="mt-6 font-body text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            We love books, we love reading, we have a bunch of different hobbies and love trying out new things, we strongly believe in the power of community and love it when people come together, we love plant based food, and we LOVE Sahakarnagar.
          </p>

        </div>

        {/* illustration column */}
        <div
          ref={artRef}
          className={`relative flex justify-center transition-all duration-700 ease-out lg:justify-end
            ${artIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="relative">

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