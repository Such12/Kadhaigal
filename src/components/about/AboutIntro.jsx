import PhotoPlaceholder from './PhotoPlaceholder.jsx'

export default function AboutIntro() {
  return (
    <section className="relative container-page py-16 sm:py-20 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-start relative">
        <div>
          <h2 className="font-display italic font-bold text-4xl sm:text-5xl text-brand-navy">
            About Us
          </h2>
          <div className="mt-6 space-y-5 text-brand-navy/75 leading-relaxed max-w-lg">
            <p>
              It started with a simple question over a filter coffee: "Why
              don't we build a home for the stories that haven't been told
              yet?"
            </p>
            <p>
              We're readers the obsessive kind, the kind who press books
              into people's hands and anxiously wait to hear what they
              thought. We wanted a space that felt warm without being
              precious, and open to everyone. We almost called it All
              Things Beautiful. We called it Kadhaigal instead. Stories. All
              of them. Waiting to be found.
            </p>
          </div>
        </div>

        <div className="relative h-72 sm:h-96">
          <div className="absolute left-0 top-6 w-[58%] h-[70%] bg-white p-2 rounded-sm shadow-polaroid -rotate-1">
            <PhotoPlaceholder variant="storefront" className="w-full h-full rounded-sm" />
          </div>
          <div className="absolute right-0 top-0 w-[52%] h-[85%] bg-white p-2 rounded-sm shadow-polaroid rotate-2">
            <PhotoPlaceholder variant="community" className="w-full h-full rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  )
}
