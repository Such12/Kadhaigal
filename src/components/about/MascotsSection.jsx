import Mascot from './Mascot.jsx'
import { CurlyArrow, FlowerDoodle } from './Doodles.jsx'

export default function MascotsSection() {
  return (
    <section className="relative container-page py-16 sm:py-20 overflow-hidden">
      <FlowerDoodle className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10" color="#142950" />
      <CurlyArrow className="hidden lg:block absolute bottom-24 right-4 w-24 h-16" color="#142950" />

      <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 items-center">
        <div className="flex flex-col items-center text-center">
          <Mascot variant="chintu" className="w-40 sm:w-48" />
          <h3 className="font-display font-bold text-brand-navy mt-4 tracking-wide">
            CHINTU
          </h3>
          <p className="text-brand-brick text-sm mt-3 max-w-xs leading-relaxed">
            The one with the recommendations. Has read everything on the
            shelf, has feelings about all of it, and will tell you
            unprompted. Believes a good book can fix most things. The hot
            chocolate was his idea.
          </p>
        </div>

        <div className="text-center">
          <h2 className="font-display font-extrabold uppercase text-brand-brick text-4xl sm:text-5xl leading-[0.95]">
            Meet <br /> Chintu <br /> &amp; <br /> Pintoo
          </h2>
        </div>

        <div className="flex flex-col items-center text-center">
          <Mascot variant="pintoo" flip className="w-40 sm:w-48" />
          <h3 className="font-display font-bold text-brand-navy mt-4 tracking-wide">
            PINTOO
          </h3>
          <p className="text-brand-brick text-sm mt-3 max-w-xs leading-relaxed">
            The one with the questions. Quieter, funnier, finishes half
            your sentence before you do. Has read all the same books as
            Chintu and disagrees with at least half his opinions. They
            still recommend the same ones though because the good ones
            are obvious.
          </p>
        </div>
      </div>
    </section>
  )
}
