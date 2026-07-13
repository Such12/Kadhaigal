import { useEffect, useRef, useState } from "react";
import stackOfBooks from "../../assets/images/stack of books.svg";
import bevs from "../../assets/images/bevs.svg";
import teaCake from "../../assets/images/tea cake.svg";
import mascots from "../../assets/images/chintu w pintu.svg";

/**
 * ThreePillars
 * -----------------------------------------------------------------------
 * Second section on the Home page, directly after OurStory.
 *
 * Each pillar now shows its own hand-drawn illustration instead of a
 * generic line icon — the actual stack of books, the actual coffee cups
 * and cake, and Chintu & Pintu themselves for Community. The cards keep
 * the library-index-card styling (dog-eared corner, stitched leg down to
 * a dashed shelf-ledge) established on the Founders' Journey section, so
 * the illustrations read as objects genuinely resting on that shelf.
 *
 * ASSETS
 *   Expects these at src/assets/ (same folder as chintu-pintu.svg from
 *   before): stack_of_books.svg, bevs.svg, tea_cake.svg. Adjust the
 *   import paths if your assets live elsewhere.
 * -----------------------------------------------------------------------
 */

const pillars = [
  {
    id: "stacks",
    title: "The Stacks",
    accent: "navy",
    description:
      "A curated collection that focuses on local authors, diverse voices, and rare finds you won't find on a global algorithm.",
    illustration: (
      <img
        src={stackOfBooks}
        alt="A tall, leaning stack of Kadhaigal's books"
        className="h-40 w-auto transition-transform duration-500 group-hover:-translate-y-1 sm:h-44"
      />
    ),
  },
  {
    id: "cafe",
    title: "The Café",
    accent: "brick",
    description:
      "Specialty roasts and plant-based treats that pair perfectly with a mystery novel or a quiet morning of reflection.",
    illustration: (
      <div className="relative flex items-end">
        <img
          src={bevs}
          alt="Coffee and tea cups from the Kadhaigal café"
          className="h-24 w-auto transition-transform duration-500 group-hover:-translate-y-1 sm:h-28"
        />
        <img
          src={teaCake}
          alt="A slice of cake"
          className="absolute -right-6 bottom-0 h-12 w-auto rotate-6 transition-transform duration-500 group-hover:rotate-3 sm:h-14"
        />
      </div>
    ),
  },
  {
    id: "community",
    title: "Community",
    accent: "sage",
    description:
      "From open mics to book clubs, we are the living room for Sahakarnagar's curious minds and creative souls.",
    illustration: (
      <img
        src={mascots}
        alt="Chintu and Pintu, the Kadhaigal mascots"
        className="h-32 w-auto transition-transform duration-500 group-hover:-translate-y-1 sm:h-36"
      />
    ),
  },
];

const accentStyles = {
  navy: { title: "text-brand-navy", fold: "border-t-brand-navy/70", dot: "bg-brand-navy" },
  brick: { title: "text-brand-brick", fold: "border-t-brand-brick/70", dot: "bg-brand-brick" },
  sage: { title: "text-brand-navy", fold: "border-t-brand-sage/70", dot: "bg-brand-sage" },
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

function PillarCard({ pillar, index }) {
  const [ref, inView] = useInView(0.3);
  const s = accentStyles[pillar.accent];
  const tilt = index === 0 ? "-rotate-1" : index === 2 ? "rotate-1" : "rotate-0";

  return (
    <div className="flex flex-col items-center">
      <div
        ref={ref}
        style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
        className={`group relative flex w-full max-w-sm flex-col items-center rounded-2xl rounded-tr-none
          bg-white px-8 pb-8 pt-6 shadow-card transition-all duration-700 ease-out
          hover:-translate-y-1.5 hover:rotate-0 hover:shadow-polaroid
          ${tilt} ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {/* dog-eared folded corner */}
        <span
          className={`pointer-events-none absolute right-0 top-0 h-0 w-0
            border-l-[22px] border-t-[22px] border-l-transparent
            transition-colors duration-300 ${s.fold}`}
          aria-hidden="true"
        />

        {/* illustration resting on its own mini shelf-line */}
        <div className="relative flex h-40 w-full items-end justify-center sm:h-44">
          {pillar.illustration}
          <span className="absolute inset-x-8 bottom-0 h-px bg-brand-navy/10" aria-hidden="true" />
        </div>

        <h3 className={`mt-5 font-display text-xl font-bold ${s.title}`}>
          {pillar.title}
        </h3>
        <p className="mt-2 text-center font-body text-[15px] leading-relaxed text-brand-navy/70">
          {pillar.description}
        </p>
      </div>

      {/* stitched leg tying the card to the shelf */}
      <span
        className="h-6 w-px bg-[repeating-linear-gradient(180deg,rgba(20,41,80,0.25)_0px,rgba(20,41,80,0.25)_3px,transparent_3px,transparent_7px)]"
        aria-hidden="true"
      />
      <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden="true" />
    </div>
  );
}

export default function ThreePillars() {
  const [headerRef, headerIn] = useInView(0.5);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out
            ${headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <h2 className="font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            The Three Pillars
          </h2>
          <p className="mt-3 font-display text-lg italic text-brand-navy/60">
            Our foundation is built on more than just bricks and mortar.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.id} pillar={pillar} index={index} />
            ))}
          </div>

          {/* shelf ledge running beneath the row, desktop only */}
          <div
            className="absolute -bottom-8 left-0 right-0 hidden h-px bg-[repeating-linear-gradient(90deg,rgba(20,41,80,0.2)_0px,rgba(20,41,80,0.2)_5px,transparent_5px,transparent_11px)] lg:block"
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