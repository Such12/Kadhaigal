// src/components/events/FilmReel.jsx
//
// Self-contained: the marquee keyframes live in a <style> tag right here,
// so this works immediately without needing an edit to tailwind.config.js.
// (Previously this relied on a custom `animate-film-scroll` utility that
// only exists once matching keyframes are registered in the Tailwind
// config — if that step is skipped, Tailwind just drops the class and
// the strip sits still, which is what was happening.)

const STILLS = [
  { seed: 'kadhaigal-openmic', caption: 'Open Mic Night' },
  { seed: 'kadhaigal-bookclub', caption: 'Weekend Book Club' },
  { seed: 'kadhaigal-boardgame', caption: 'Board Game Sunday' },
  { seed: 'kadhaigal-poetry', caption: 'Poetry Reading' },
  { seed: 'kadhaigal-author', caption: 'Author Meetup' },
  { seed: 'kadhaigal-baking', caption: 'Baking Workshop' },
  { seed: 'kadhaigal-swap', caption: 'Community Swap' },
  { seed: 'kadhaigal-quiz', caption: 'Quiz Night' },
]

function Sprockets() {
  return (
    <div className="flex justify-between gap-2 bg-black px-3 py-2">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="h-2 w-3 shrink-0 rounded-[2px] bg-brand-cream/90" />
      ))}
    </div>
  )
}

function FilmCell({ seed, caption }) {
  return (
    <figure className="w-56 shrink-0 border-x border-black/40 bg-black px-2 pb-3 pt-2 sm:w-64">
      <div className="aspect-[4/3] overflow-hidden bg-brand-navy/40">
        <img
          src={`https://picsum.photos/seed/${seed}/480/360`}
          alt={caption}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-2 truncate text-center font-body text-xs text-brand-cream/80">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function FilmReel() {
  // Duplicate the strip once so the -50% loop is seamless.
  const track = [...STILLS, ...STILLS]

  return (
    <div className="film-reel group w-full overflow-hidden rounded-md shadow-polaroid">
      <style>{`
        .film-reel .film-track {
          animation: film-reel-scroll 36s linear infinite;
        }
        .film-reel:hover .film-track {
          animation-play-state: paused;
        }
        @keyframes film-reel-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .film-reel .film-track {
            animation: none;
          }
        }
      `}</style>
      <Sprockets />
      <div className="overflow-hidden bg-black">
        <div className="film-track flex w-max">
          {track.map((still, i) => (
            <FilmCell key={`${still.seed}-${i}`} {...still} />
          ))}
        </div>
      </div>
      <Sprockets />
    </div>
  )
}