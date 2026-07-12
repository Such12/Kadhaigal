

export default function FoundersSection() {
  return (
    <section className="relative bg-brand-cream overflow-hidden">
      <div className="container-page grid lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch py-16 sm:py-20">
        <div className="relative flex items-center">
          
          <h2 className="font-head font-extrabold uppercase text-brand-brick text-4xl sm:text-5xl lg:text-6xl !leading-[1.15] ">
            The <br /> Ones <br /> Who <br /> Started <br /> It <br />All
          </h2>
        </div>

        <div className="relative bg-brand-brick rounded-2xl min-h-[320px] sm:min-h-[420px] flex items-center justify-center overflow-hidden">
          
          <div className="absolute top-10 left-6 sm:left-16 bg-white rounded-md shadow-card px-6 py-3 -rotate-6">
            <p className="font-display font-bold text-brand-navy tracking-wide">LAKSHMI</p>
          </div>
          <div className="absolute bottom-10 right-6 sm:right-14 bg-white rounded-md shadow-card px-6 py-3 rotate-6">
            <p className="font-display font-bold text-brand-navy tracking-wide">RAMON</p>
          </div>
        </div>
      </div>
    </section>
  )
}
