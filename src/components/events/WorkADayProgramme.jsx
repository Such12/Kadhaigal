// src/components/events/WorkADayProgramme.jsx
//
// Rebuilt to match the homepage's "What We Strive For" card pattern
// (rotated pastel tag overlapping a white card with a solid offset
// shadow — no blur), and to fit in far less vertical space than the
// previous version. Perks moved from a standalone receipt block into a
// single row of chips, matching the meetup-info-chip style already used
// on the homepage's book-club card.

const SHIFTS = [
  {
    tag: 'Morning',
    tagBg: '#F3D9C4',
    time: '9:30 am – 3:30 pm',
    description:
      "Mostly behind the scenes — opening up, the morning huddle, content and book reviewing. Best if you'd rather focus than chat all day.",
  },
  {
    tag: 'Evening',
    tagBg: '#CFE3BE',
    time: '3:30 pm – 9:30 pm',
    description:
      "Cafe and billing desk, and it moves with whoever walks in. Best if you like people and a bit of unpredictability.",
  },
]

const PERKS = [
  {
    icon: (
      <path d="M9 9h.01M15 15h.01M15 9 9 15M12 3l9 9-9 9-9-9 9-9Z" />
    ),
    label: '10% off your purchase',
  },
  {
    icon: <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3" />,
    label: 'One drink, on the house',
  },
  {
    icon: <path d="M20 12v9H4v-9M2 7h20v5H2V7ZM12 22V7M12 7c-1.5-3-5-3.5-5-1.5S9 7 12 7ZM12 7c1.5-3 5-3.5 5-1.5S15 7 12 7Z" />,
    label: 'A small surprise to take home',
  },
]

function Chip({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-brand-cream px-4 py-2 font-body text-sm text-brand-navy">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-brand-brick"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon}
      </svg>
      {label}
    </div>
  )
}

function ShiftCard({ tag, tagBg, time, description }) {
  return (
    <div className="relative rounded-2xl border-2 border-brand-navy bg-white p-6 pt-8 shadow-[6px_6px_0_0_#142950]">
      <span
        className="absolute -top-4 left-6 -rotate-3 rounded-full px-4 py-1 font-body text-sm font-semibold text-brand-navy"
        style={{ backgroundColor: tagBg }}
      >
        {tag}
      </span>
      <p className="font-body text-sm font-bold uppercase tracking-wide text-brand-brick">
        {time}
      </p>
      <p className="mt-3 font-body text-[0.95rem] leading-relaxed text-brand-navy/75">
        {description}
      </p>
    </div>
  )
}

export default function WorkADayProgramme() {
  return (
    <section id="work-a-day" className="bg-brand-cream py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          {/* Intro + perks + CTA */}
          <div>
            <h2 className="font-head text-4xl text-brand-navy sm:text-[2.75rem]">
              Work A Day
            </h2>
            <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-brand-navy/70">
              So many of you asked to work here for a day, so we opened the
              doors. One shift, real work, a real feel for the shop — no pay,
              but these are on us:
            </p>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              {PERKS.map((perk) => (
                <Chip key={perk.label} icon={perk.icon} label={perk.label} />
              ))}
            </div>
            <p className="mt-3 font-body text-xs text-brand-navy/45">
              Purchase discount excludes children's books and pre-loved
              titles.
            </p>
            <a
              href="#work-a-day-apply"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-brick px-7 py-3 font-body text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-brick/90"
            >
              I'm in — apply for a shift
            </a>
          </div>

          {/* Shift cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-6">
            {SHIFTS.map((shift) => (
              <ShiftCard key={shift.tag} {...shift} />
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-2xl font-body text-sm leading-relaxed text-brand-navy/50">
          Every shift includes its share of physical work too — cleaning,
          dusting shelves, doing the dishes — right alongside the fun parts,
          like reviewing books and shooting videos.
        </p>
      </div>
    </section>
  )
}