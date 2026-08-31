import { useEffect, useRef, useState } from "react";
import stackOfBooks from "../../assets/images/stack of books.svg";
import bevs from "../../assets/images/bevs.svg";
import teaCake from "../../assets/images/tea cake.svg";
import mascots from "../../assets/images/chintu w pintu.svg";

const pillars = [
  {
    id: "stacks",
    title: "The Stacks",
    accent: "navy",
    description:
      "A curated collection that focuses on local authors, diverse voices, and rare finds you won't find on a global algorithm.",
    illustration: stackOfBooks,
    illustrationAlt: "A tall, leaning stack of Kadhaigal's books",
    baseRotate: -2.5,
    swayClass: "animate-sway-1",
    cardOffsetY: "lg:translate-y-2",
  },
  {
    id: "cafe",
    title: "The Café",
    accent: "brick",
    description:
      "Specialty roasts and plant-based treats that pair perfectly with a mystery novel or a quiet morning of reflection.",
    illustration: bevs,
    illustrationAlt: "Coffee and tea cups from the Kadhaigal café",
    secondaryIllustration: teaCake,
    baseRotate: 1.5,
    swayClass: "animate-sway-2",
    cardOffsetY: "lg:translate-y-7",
  },
  {
    id: "community",
    title: "Community",
    accent: "sage",
    description:
      "From open mics to book clubs, we are the living room for Sahakarnagar's curious minds and creative souls.",
    illustration: mascots,
    illustrationAlt: "Chintu and Pintu, the Kadhaigal mascots",
    baseRotate: -1.5,
    swayClass: "animate-sway-3",
    cardOffsetY: "lg:translate-y-3",
  },
];

const accentColors = {
  navy: { pin: "#142950", title: "text-brand-navy", shadow: "shadow-brand-navy/10" },
  brick: { pin: "#B7410E", title: "text-brand-brick", shadow: "shadow-brand-brick/10" },
  sage: { pin: "#9DC183", title: "text-brand-navy", shadow: "shadow-brand-sage/10" },
};

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

/* SVG Clothespin / clip that sits on top of each card */
function Clothespin({ color = "#9DC183" }) {
  return (
    <svg
      width="24"
      height="38"
      viewBox="0 0 24 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 -translate-x-1/2 -top-[24px] z-30 drop-shadow-md"
    >
      {/* Top Clip grip */}
      <rect x="7" y="0" width="10" height="18" rx="3" fill={color} />
      {/* Spring / metal coil */}
      <circle cx="12" cy="16" r="3.5" fill="#EAE8DB" stroke={color} strokeWidth="2" />
      {/* Pin prongs clamping the card */}
      <rect x="7.5" y="18" width="3.5" height="18" rx="1.5" fill={color} />
      <rect x="13" y="18" width="3.5" height="18" rx="1.5" fill={color} />
      {/* Highlight groove */}
      <line x1="9" y1="22" x2="9" y2="32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="15" y1="22" x2="15" y2="32" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function PillarCard({ pillar, index }) {
  const [ref, inView] = useInView(0.15);
  const colors = accentColors[pillar.accent];

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center w-full ${pillar.cardOffsetY} transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Wind Swaying Card Container with Pivot at Top Center */}
      <div
        className={`w-full max-w-[300px] origin-top ${pillar.swayClass} transition-transform duration-300 hover:pause`}
      >
        <div
          className="group relative bg-white rounded-2xl px-6 pb-7 pt-9 shadow-lg
            transition-all duration-500 cursor-pointer w-full
            hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-navy/15 border border-brand-navy/5"
        >
          {/* Clothespin attached at top */}
          <Clothespin color={colors.pin} />

          {/* Illustration */}
          <div className="relative flex h-36 w-full items-end justify-center sm:h-40 mb-4">
            <img
              src={pillar.illustration}
              alt={pillar.illustrationAlt}
              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {pillar.secondaryIllustration && (
              <img
                src={pillar.secondaryIllustration}
                alt="A slice of cake"
                className="absolute -right-2 bottom-0 h-12 w-auto rotate-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 sm:h-14"
              />
            )}
          </div>

          {/* Text */}
          <h3 className={`font-display text-xl font-bold text-center ${colors.title}`}>
            {pillar.title}
          </h3>
          <p className="mt-2 text-center font-body text-sm leading-relaxed text-brand-navy/65">
            {pillar.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ThreePillars() {
  const [headerRef, headerIn] = useInView(0.5);

  return (
    <section className="relative overflow-hidden bg-brand-cream py-16 sm:py-24">
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

        {/* Clothesline + Cards */}
        <div className="relative mt-20">
          {/* The string/clothesline — full width with a natural hanging sag curve */}
          <div
            className="absolute -top-3 -left-[20vw] -right-[20vw] hidden lg:block pointer-events-none z-10"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1400 90"
              preserveAspectRatio="none"
              className="w-full h-24"
              fill="none"
            >
              {/* Soft shadow for depth */}
              <path
                d="M 0 18 Q 700 88 1400 18"
                stroke="rgba(20, 41, 80, 0.08)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Main sagging rope */}
              <path
                d="M 0 15 Q 700 85 1400 15"
                stroke="#142950"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 pt-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.id} pillar={pillar} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Gentle wind / breeze swinging animation styles */}
      <style>{`
        @keyframes gentleSway1 {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(-0.5deg) translateY(-2px);
          }
        }

        @keyframes gentleSway2 {
          0%, 100% {
            transform: rotate(2deg);
          }
          50% {
            transform: rotate(-1.5deg) translateY(-3px);
          }
        }

        @keyframes gentleSway3 {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(1.5deg) translateY(-2px);
          }
        }

        .animate-sway-1 {
          animation: gentleSway1 4.8s ease-in-out infinite;
        }

        .animate-sway-2 {
          animation: gentleSway2 5.4s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        .animate-sway-3 {
          animation: gentleSway3 4.2s ease-in-out infinite;
          animation-delay: 1.6s;
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-sway-1,
          .animate-sway-2,
          .animate-sway-3 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}