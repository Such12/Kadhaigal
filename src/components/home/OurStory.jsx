import { DoodleArrow, DoodleCharacters } from './DoodleCharacters.jsx'

export default function OurStory() {
  return (
    <section className="container-page pb-20 sm:pb-28">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
        {/* doodle column */}
        <div className="hidden lg:flex flex-col items-center pt-6">
          <DoodleArrow className="w-32 h-20" />
          <DoodleCharacters className="w-40 h-32 mt-2" />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-brick text-white rounded-2xl px-8 py-6 sm:px-10 sm:py-7 max-w-2xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl">Our Story</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-card mt-4 px-8 py-8 sm:px-10 sm:py-10 max-w-2xl space-y-5 text-brand-navy/80 leading-relaxed">
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
      </div>
    </section>
  )
}
