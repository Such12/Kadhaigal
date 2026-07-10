import PhotoPlaceholder from './PhotoPlaceholder.jsx'

const photos = ['craft', 'reading', 'community', 'reading', 'portrait', 'shelf']

export default function GalleryBanner() {
  return (
    <section className="relative bg-brand-navy py-14 sm:py-16 overflow-hidden">
      <div className="container-page relative">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {photos.map((variant, i) => (
            <div key={i} className="aspect-square rounded-md overflow-hidden">
              <PhotoPlaceholder variant={variant} className="w-full h-full" />
            </div>
          ))}
        </div>

        <h2 className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-display font-extrabold uppercase text-brand-brick text-4xl sm:text-6xl lg:text-7xl tracking-tight text-center drop-shadow-[0_4px_0_rgba(20,41,80,0.6)]">
          Kadhaigal
        </h2>
      </div>
    </section>
  )
}
