import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function KidsBooksHero() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ImagePlaceholder
          label="Chintu & Pintoo storytime illustration"
          className="aspect-square rounded-2xl w-full max-w-sm mx-auto md:mx-0"
        />

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
            Chintu and Pintoo's Story Corner
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy leading-[1.05]">
            Where Little Adventures Begin.
          </h1>
          <p className="mt-5 text-brand-navy/70 leading-relaxed max-w-md">
            A shelf built entirely for young readers — picture books for
            the very beginning, fantasy worlds to disappear into, and
            first stories that ask big questions gently.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button as={Link} to="#kids-staff-picks" variant="primary">
              Shop Now
            </Button>
            <Button as={Link} to="#kids-staff-picks" variant="light" className="border border-brand-navy/15">
              View List
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 border-t-2 border-dashed border-brand-sage/50" />
    </section>
  )
}