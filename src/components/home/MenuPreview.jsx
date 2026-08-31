import { useEffect, useRef, useState } from "react";

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

const ArrowRightUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-brick inline-block ml-0.5"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

/* Each card has its own height, rotation, and vertical offset to create
   the organic, hand-arranged collage look from the reference. */
const menuCards = [
  {
    title: "KIDS MENU",
    description: "Healthy, fun, and bite-sized snacks perfect for our little readers.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400&h=600",
    height: 320,
    rotate: -3,
    offsetY: 60,
  },
  {
    title: "FRESH BAKES",
    description: "Warm croissants, fluffy cakes, and treats to pair with a good story.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=600",
    height: 360,
    rotate: 2,
    offsetY: -20,
  },
  {
    title: "COFFEE & TEA",
    description: "Freshly brewed specialty coffee and soothing teas for the grown-ups.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=600",
    height: 340,
    rotate: -1.5,
    offsetY: 40,
  },
  {
    title: "REFRESHMENTS",
    description: "Cool smoothies and fresh juices to refresh after a long adventure in the books.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=400&h=600",
    height: 310,
    rotate: 3,
    offsetY: -10,
  },
];

export default function MenuPreview() {
  const [ref, inView] = useInView(0.08);

  return (
    <section
      id="the-cafe"
      className="relative bg-brand-cream py-8 sm:py-10"
    >
      <div
        ref={ref}
        className={`mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-6 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* ─── Left: Welcome + CTA, vertically centered ─── */}
        <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left flex-shrink-0 w-full lg:w-[300px] xl:w-[340px] lg:min-h-[360px]">
          <h3 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold text-brand-navy leading-tight">
            Welcome to Kadhaigal's cafe
          </h3>
          <p className="mt-4 text-brand-navy/60 font-body text-sm sm:text-base leading-relaxed max-w-[280px]">
            Grab a bite, sip something warm, and lose yourself in a good book.
          </p>

          <a
            href="/menu"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-brick px-7 py-3
              font-body text-sm text-brand-cream shadow-md transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-lg"
          >
            See What's Brewing
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

        {/* ─── Right: Overlapping card collage ─── */}
        <div className="w-full lg:flex-1 pb-4 pt-4 overflow-hidden">
          <div
            className="flex items-start gap-4 sm:gap-6 px-2"
          >
            {menuCards.map((card, idx) => (
              <div
                key={idx}
                className="group flex flex-col flex-1 min-w-0 cursor-pointer transition-all duration-500 ease-out hover:z-20"
                style={{
                  marginTop: card.offsetY,
                  transform: `rotate(${card.rotate}deg)`,
                  zIndex: idx + 1,
                }}
              >
                {/* Image with hover zoom + overlay */}
                <div
                  className="rounded-[1.4rem] overflow-hidden shadow-xl transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-brand-brick/20"
                  style={{ height: card.height }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Warm gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Label */}
                <div className="mt-4 px-0.5" style={{ transform: `rotate(${-card.rotate}deg)` }}>
                  <h4
                    className="font-bold tracking-[0.08em] uppercase text-brand-navy flex items-center gap-1 text-xs sm:text-sm"
                  >
                    {card.title} <ArrowRightUp />
                  </h4>
                  <p
                    className="text-brand-navy/65 mt-1.5 leading-snug text-xs"
                    style={{
                      fontFamily: "'Courier Prime', 'Courier New', monospace",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

