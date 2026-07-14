import { useState } from "react";
import stackOfBooks from "../../assets/images/stack of books.svg";
import bevs from "../../assets/images/bevs.svg";
import teaCake from "../../assets/images/tea cake.svg";
import mascots from "../../assets/images/chintu w pintu.svg";

/**
 * TableOfContents — "Turn the Page"
 * -----------------------------------------------------------------------
 * Third section on the Home page (replaces the old "Three Pillars" grid).
 *
 * Concept: instead of three side-by-side cards, the pillars are laid out
 * as entries in a book's table of contents — roman numeral, title, a
 * dotted leader line, and a page number, exactly like the contents page
 * of a real book. Clicking (or tapping) an entry "turns to that page":
 * it expands in place to reveal the illustration and description, using
 * a pure-CSS grid-rows trick for a smooth height animation without
 * measuring anything in JS. Only one entry is open at a time.
 *
 * ASSETS
 *   Expects stack_of_books.svg, bevs.svg, tea_cake.svg, and
 *   chintu-pintu.svg at src/assets/.
 * -----------------------------------------------------------------------
 */

const entries = [
  {
    id: "stacks",
    numeral: "I",
    title: "The Stacks",
    page: "07",
    description:
      "A curated collection that focuses on local authors, diverse voices, and rare finds you won't find on a global algorithm.",
    illustration: (
      <img
        src={stackOfBooks}
        alt="A tall, leaning stack of Kadhaigal's books"
        className="h-32 w-auto sm:h-36"
      />
    ),
  },
  {
    id: "cafe",
    numeral: "II",
    title: "The Café",
    page: "24",
    description:
      "Specialty roasts and plant-based treats that pair perfectly with a mystery novel or a quiet morning of reflection.",
    illustration: (
      <div className="relative flex items-end">
        <img src={bevs} alt="Coffee and tea cups from the Kadhaigal café" className="h-20 w-auto sm:h-24" />
        <img
          src={teaCake}
          alt="A slice of cake"
          className="absolute -right-5 bottom-0 h-10 w-auto rotate-6 sm:h-12"
        />
      </div>
    ),
  },
  {
    id: "community",
    numeral: "III",
    title: "Community",
    page: "41",
    description:
      "From open mics to book clubs, we are the living room for Sahakarnagar's curious minds and creative souls.",
    illustration: (
      <img
        src={mascots}
        alt="Chintu and Pintu, the Kadhaigal mascots"
        className="h-28 w-auto sm:h-32"
      />
    ),
  },
];

function TocEntry({ entry, isOpen, onToggle }) {
  return (
    <div className="border-b border-brand-cream/15 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-baseline gap-4 py-6 text-left"
      >
        <span className="font-display text-lg text-brand-brick/70 sm:text-xl">
          {entry.numeral}.
        </span>
        <span className="font-display text-2xl font-bold text-brand-cream transition-colors duration-300 group-hover:text-brand-sage sm:text-3xl">
          {entry.title}
        </span>
        <span
          className="mx-2 h-px flex-1 self-center border-t border-dashed border-brand-cream/25"
          aria-hidden="true"
        />
        <span className="font-hand text-lg text-brand-cream/50 sm:text-xl">
          pg. {entry.page}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 fill-none stroke-brand-cream/60 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* pure-CSS height transition, no JS measurement needed */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-center gap-6 pb-8 text-center sm:flex-row sm:text-left">
            <div className="flex shrink-0 items-end justify-center sm:w-40">
              {entry.illustration}
            </div>
            <p className="font-body text-[15px] leading-relaxed text-brand-cream/70 sm:text-base">
              {entry.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TableOfContents() {
  const [openId, setOpenId] = useState(entries[0].id);

  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 45% at 85% 15%, rgba(157,193,131,0.08), transparent 70%)," +
            "radial-gradient(50% 45% at 15% 90%, rgba(183,65,14,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        <div className="text-center">
          <span className="font-hand text-2xl text-brand-sage">Turn the Page</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-brand-cream sm:text-5xl">
            What You&rsquo;ll Find Inside
          </h2>
        </div>

        <div className="mt-12">
          {entries.map((entry) => (
            <TocEntry
              key={entry.id}
              entry={entry}
              isOpen={openId === entry.id}
              onToggle={() => setOpenId(openId === entry.id ? null : entry.id)}
            />
          ))}
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