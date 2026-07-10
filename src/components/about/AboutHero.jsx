import PhotoPlaceholder from './PhotoPlaceholder.jsx'

export default function AboutHero() {
  return (
    <section className="relative h-[420px] sm:h-[520px] overflow-hidden">
      <PhotoPlaceholder variant="shelf" className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-brand-navy/45" />

      <div className="relative h-full container-page flex flex-col items-center justify-center text-center">
        <h1 className="font-display font-extrabold uppercase text-brand-brick text-[2.6rem] sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight [-webkit-text-stroke:2px_#142950] drop-shadow-[0_6px_0_rgba(20,41,80,0.25)]">
          The Story
          <br />
          Behind
          <br />
          Kadhaigal
        </h1>

        <button className="mt-8 bg-brand-cream/90 hover:bg-brand-cream text-brand-navy text-xs sm:text-sm font-semibold tracking-wide uppercase px-6 py-3 rounded-full shadow-card transition-colors">
          Let's Collaborate
        </button>
      </div>
    </section>
  )
}
