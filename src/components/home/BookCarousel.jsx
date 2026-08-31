import { useEffect, useRef, useState } from "react";
import thisMooseCover from "../../assets/images/this_moose_belongs_to_me.jpg";

/**
 * Bestsellers of the Week
 * -----------------------------------------------------------------------
 * Replaces generic carousel with a rich, tactile 3D book presentation.
 * Features 3D hardcover perspective, book spine & page depth,
 * vintage ranking seals, dangling ribbon bookmarks, and handwritten
 * bookstore shelf-talker cards taped with washi tape.
 */

const bestsellers = [
  {
    rank: 1,
    title: "This Moose Belongs to Me",
    author: "Oliver Jeffers",
    genre: "Children's Illustrated",
    rating: "4.9",
    tag: "Staff Favorite",
    accent: "brick",
    cover: thisMooseCover,
    blurb: "Rules of moose ownership: sweet, absurd, and gorgeously illustrated. Kids and parents fight over who gets to read it first.",
    recommender: "— Ananya, Children's Section",
    rotate: -2.5,
    elevation: "translate-y-0",
  },
  {
    rank: 2,
    title: "Days at the Morisaki Bookshop",
    author: "Satoshi Yagisawa",
    genre: "Cozy Fiction / Japanese",
    rating: "4.8",
    tag: "Reader's Choice",
    accent: "navy",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684941961i/64000492.jpg",
    blurb: "A love letter to second-hand bookstores, quiet healing, and good coffee. You'll want to move into Jimbocho by page 30.",
    recommender: "— Dev, Weekend Barista",
    rotate: 2,
    elevation: "translate-y-2 lg:translate-y-4",
  },
  {
    rank: 3,
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    genre: "Magical Realism",
    rating: "4.7",
    tag: "Trending",
    accent: "sage",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569420790i/44421460.jpg",
    blurb: "What would you change if you could travel back in time for just four minutes? Bring tissues along with your Americano.",
    recommender: "— Aisha, Front Counter",
    rotate: -1.5,
    elevation: "translate-y-1 lg:translate-y-2",
  },
  {
    rank: 4,
    title: "The Boy, the Mole, the Fox and the Horse",
    author: "Charlie Mackesy",
    genre: "All-Ages Art & Wisdom",
    rating: "4.9",
    tag: "Heartwarming",
    accent: "brick",
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566838384i/43708884.jpg",
    blurb: "A warm hug in book form. Beautiful brush-and-ink calligraphy that reminds everyone why kindness matters most.",
    recommender: "— Sahakarnagar Book Club Pick",
    rotate: 3,
    elevation: "translate-y-3 lg:translate-y-6",
  },
];

const badgeColors = {
  brick: { badge: "bg-brand-brick text-brand-cream", tape: "bg-brand-brick/80", ribbon: "#B7410E" },
  navy: { badge: "bg-brand-navy text-brand-cream", tape: "bg-brand-navy/80", ribbon: "#142950" },
  sage: { badge: "bg-brand-sage text-brand-navy", tape: "bg-brand-sage/90", ribbon: "#9DC183" },
};

function useInView(threshold = 0.2) {
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

function BestsellerBookCard({ book, index }) {
  const [ref, inView] = useInView(0.15);
  const [imgLoaded, setImgLoaded] = useState(true);
  const colors = badgeColors[book.accent];

  return (
    <div
      ref={ref}
      className={`group flex flex-col items-center w-full max-w-[280px] mx-auto ${book.elevation} transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      {/* ─── 3D Hardcover Book Display ─── */}
      <div
        className="relative cursor-pointer transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-105"
        style={{
          transform: `rotate(${book.rotate}deg)`,
          perspective: "1200px",
        }}
      >
        {/* The 3D Book Cover Container */}
        <div className="relative w-48 sm:w-52 h-64 sm:h-72 rounded-r-md rounded-l-sm bg-[#111] shadow-2xl overflow-hidden border-l-[6px] border-l-brand-navy/60 transition-shadow duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(20,41,80,0.35)]">
          {/* Spine crease reflection */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/15 to-transparent z-20 pointer-events-none" />

          {/* Book cover image */}
          {imgLoaded ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgLoaded(false)}
            />
          ) : (
            /* Fallback stylized clothbound cover */
            <div className={`w-full h-full p-5 flex flex-col justify-between ${book.accent === "brick" ? "bg-brand-brick" : book.accent === "navy" ? "bg-brand-navy" : "bg-brand-sage"} text-brand-cream`}>
              <span className="h-0.5 w-8 bg-brand-cream/40" />
              <div>
                <p className="font-display text-lg font-bold leading-tight">{book.title}</p>
                <p className="mt-2 font-body text-xs tracking-wider uppercase opacity-75">{book.author}</p>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-60">Kadhaigal Press</span>
            </div>
          )}

          {/* Gloss overlay sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          {/* Subtle page block edge indicator on the right */}
          <div className="absolute right-0 top-1 bottom-1 w-1 bg-gradient-to-l from-[#e6dfd3] to-[#cfc4b2] z-20 rounded-r-xs opacity-90 shadow-sm" />
        </div>

        {/* 3D Under-book Depth Shadow */}
        <div className="absolute -bottom-3 inset-x-3 h-4 bg-brand-navy/20 blur-md rounded-full -z-10 group-hover:bg-brand-navy/30 group-hover:blur-lg transition-all duration-500" />
      </div>

      {/* ─── Clean Book Typography ─── */}
      <div className="mt-5 text-center px-1">
        <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-brand-brick font-semibold">
          {book.genre}
        </span>
        <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-brand-navy leading-tight group-hover:text-brand-brick transition-colors">
          {book.title}
        </h3>
        <p className="mt-1 font-body text-xs text-brand-navy/60">
          by {book.author}
        </p>
      </div>
    </div>
  );
}

export default function BookCarousel() {
  const [headerRef, headerIn] = useInView(0.5);

  return (
    <section id="the-stacks" className="relative overflow-hidden bg-brand-cream py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
            headerIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >

          <h2 className="mt-3 font-display text-4xl font-bold text-brand-navy sm:text-5xl">
            Bestsellers of the Week
          </h2>

          <p className="mx-auto mt-3 max-w-xl font-display text-base sm:text-lg italic text-brand-navy/65">
            The most borrowed, bought, and dog-eared stories at Kadhaigal this week.
          </p>
        </div>

        {/* ─── 3D Bookshelf Grid ─── */}
        <div className="relative mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 items-start justify-items-center">
            {bestsellers.map((book, index) => (
              <BestsellerBookCard key={book.rank} book={book} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/bookstore"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-navy px-8 py-3.5 font-body text-sm font-semibold text-brand-cream shadow-md transition-all duration-300 hover:bg-brand-brick hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore All Bookstore Shelves
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
    </section>
  );
}