import { Check } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

const promises = [
  'Stories that make big feelings feel normal',
  'Illustrations kids want to look at twice',
  'Pacing that respects a short attention span, not one that rushes it',
  'Nothing we wouldn\'t happily read aloud ourselves, twice a night',
]

export default function KidsCurationPhilosophy() {
  return (
    <section className="bg-white">
      <div className="container-page py-16 sm:py-20 grid md:grid-cols-2 gap-12 items-center">
        <ImagePlaceholder
          label="A child reading illustration"
          className="aspect-[4/5] rounded-2xl shadow-card w-full max-w-sm mx-auto md:mx-0 order-2 md:order-1"
        />

        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
            How We Pick For Little Readers
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
            A Different Bar for Children's Books.
          </h2>
          <p className="text-brand-navy/60 mt-4 max-w-md">
            Picking books for kids isn't a smaller version of picking books
            for adults — it's its own skill. Here's what every book on this
            shelf had to earn.
          </p>

          <ul className="mt-8 space-y-4">
            {promises.map((promise) => (
              <li key={promise} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-sage/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-[#3f6b2a]" strokeWidth={2.5} />
                </span>
                <span className="text-brand-navy/75">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}