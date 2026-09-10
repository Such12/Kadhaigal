// src/components/events/EventsHero.jsx
//
// Deliberately minimal: the film reel is the whole point of this hero, so
// everything else got out of its way. Headline + one line of copy, then
// the reel — no buttons (Featured Events / Upcoming Gatherings right
// below already give people something to click), no overlapping tag
// (it was getting clipped by the reel's own tilt + the section's
// overflow-hidden edge, which is what looked broken in the screenshot).

import FilmReel from './FilmReel'

export default function EventsHero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream pb-32 pt-10 md:pb-40 md:pt-18">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display text-6xl text-brand-navy sm:text-7xl font-bold">Reel Life at Kadhaigal</h1>
        <p className="mx-auto mt-4 max-w-4xl font-body text-lg leading-relaxed text-brand-navy/70">
          Book clubs, open mics, swaps, and workshops — everything happening at Kadhaigal this month.
        </p>
      </div>

      <div className="relative mt-14 md:mt-16">
        <div className="w-[125%] -translate-x-[10%] rotate-[-2.5deg] sm:w-[115%] sm:-translate-x-[6.5%]">
          <FilmReel />
        </div>
      </div>
    </section>
  )
}