import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import kidsFlying from '../../assets/images/kids-flying-book.png'

export default function KidsBooksHero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      {/* Right side illustration — flush to the bottom-right */}
      <img
        src={kidsFlying}
        alt="Kids flying on a book"
        className="hidden md:block absolute bottom-0 right-0 w-[65%] lg:w-[55%] xl:w-[60%] max-w-none h-auto mix-blend-multiply z-0 translate-y-20 lg:translate-y-32 translate-x-8 lg:translate-x-12"
      />

      <div className="container-page relative z-10 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text block on the left */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
              Chintu and Pintoo's Story Corner
            </p>
            <h1 className="font-display font-extrabold text-[56px] text-brand-navy leading-[1.05]">
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
              <Button as={Link} to="#kids-staff-picks" variant="light" className="border border-brand-navy/15 bg-brand-cream/80 backdrop-blur-sm">
                View List
              </Button>
            </div>
          </div>

          {/* Mobile-only image */}
          <div className="md:hidden">
            <img
              src={kidsFlying}
              alt="Kids flying on a book"
              className="w-full h-auto mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  )
}