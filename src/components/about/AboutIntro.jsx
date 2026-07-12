import PhotoPlaceholder from './PhotoPlaceholder.jsx'
import Squiggle1 from '../../assets/images/squiggle_1.svg'
import Squiggle2 from '../../assets/images/squiggle_2.svg'
import Squiggle3 from '../../assets/images/squiggle_3.svg'
import Squiggle4 from '../../assets/images/squiggle_4.svg'
import Star1 from '../../assets/images/star_1.svg'
import Flower from '../../assets/images/flower.svg'

export default function AboutIntro() {
  return (
    <section className="relative container-page py-16 sm:py-20 overflow-hidden">

      {/* ================= BACKGROUND DOODLES ================= */}
      {/* Top Left: Orange Loop */}
      <img 
        src={Squiggle1} 
        alt="" 
        className="absolute top-4 left-4 w-12 h-auto opacity-90 select-none pointer-events-none" 
      />
      
      {/* Bottom Left: Green Loop */}
      <img 
        src={Squiggle2}
        alt="" 
        className="absolute bottom-6 left-6 w-16 h-auto opacity-80 select-none pointer-events-none" 
      />
      
      {/* Top Center-Left: Small Green Star */}
      <img 
        src={Squiggle3}
        alt="" 
        className="absolute top-12 left-[45%] w-6 h-auto opacity-75 select-none pointer-events-none" 
      />
      
      {/* Center-Middle (Above Photos): Orange Loop */}
      <img 
        src={Squiggle3}
        alt="" 
        className="absolute top-8 right-[35%] w-14 h-auto rotate-45 opacity-90 select-none pointer-events-none" 
      />
      
      {/* Mid-Left (Below text, next to photos): Double Stars */}
      <div className="absolute left-[42%] bottom-20 flex flex-col gap-2 select-none pointer-events-none">
        <img src={Squiggle3} alt="" className="w-6 h-auto opacity-75" />
        <img src={Squiggle4} alt="" className="w-8 h-auto opacity-75 translate-x-3" />
      </div>

      {/* Top Right: Large Navy Flower / Squiggle */}
      <img 
        src={Flower}
        alt="" 
        className="absolute -top-4 -right-4 w-28 h-auto opacity-95 select-none pointer-events-none" 
      />
      
      {/* Bottom Right: Small Orange Star */}
      <img 
        src={Star1}
        alt="" 
        className="absolute bottom-10 right-12 w-6 h-auto opacity-80 select-none pointer-events-none filter hue-rotate-15" 
      />
      {/* ====================================================== */}

      <div className="grid lg:grid-cols-2 gap-12 items-start relative">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-navy">
            ABOUT US
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
