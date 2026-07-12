import Chintu from '../../assets/images/chintu w specs.svg'
import Pintoo from '../../assets/images/pintu w specs_3.svg'

export default function MascotsSection() {
  return (
    <section className="relative container-page py-16 sm:py-20 overflow-hidden">
      

      <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 items-center">
        <div className="flex flex-col items-center text-center">
          <img src={Chintu} alt="Chintu" className="w-40 sm:w-48" />
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
          <h2 className="font-head  uppercase text-brand-brick text-5xl sm:text-6xl !leading-[1.5]">
            Meet <br /> Chintu <br /> &amp; <br /> Pintoo
          </h2>
        </div>

        <div className="flex flex-col items-center text-center">
          <img src={Pintoo} alt="Pintoo" className="w-40 sm:w-48" />
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
