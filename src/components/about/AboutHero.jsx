import PhotoPlaceholder from './PhotoPlaceholder.jsx'

export default function AboutHero() {
  return (
    <section className="relative h-[420px] sm:h-[520px] overflow-hidden">
      <PhotoPlaceholder variant="shelf" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-brand-navy/45" />

      <div className="relative h-full container-page flex flex-col items-center justify-center text-center">
        <h1 className="font-head font-extrabold uppercase text-brand-brick text-[2.6rem] sm:text-[3.75rem] lg:text-[4.5rem] leading-[1.15] drop-shadow-[0_6px_0_rgba(20,41,80,0.25)]">
          THE STORY
          <br />
          BEHIND
          <br />
          KADHAIGAL
        </h1>

        <button className="mt-8 bg-brand-cream/90 hover:bg-brand-cream text-brand-navy text-xs sm:text-sm font-semibold tracking-wide uppercase px-6 py-3 rounded-full shadow-card transition-colors">
          Let&apos;s Collaborate
        </button>
      </div>
    </section>
  )
}
