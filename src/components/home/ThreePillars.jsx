import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    id: 'curation',
    title: 'Curation',
    badge: 'The Shelves',
    badgeStyle: 'bg-brand-brick text-brand-cream',
    description:
      "A thoughtful collection shaped with purpose and care. We champion independent presses, regional translations, local authors, and rare finds you won't get served by a global algorithm.",
  },
  {
    id: 'belonging',
    title: 'Belonging',
    badge: 'The Sanctuary',
    badgeStyle: 'bg-brand-sage text-brand-navy',
    description:
      "A warm, welcoming living room in Sahakarnagar. Whether you're here to share stories, meet neighbors, or simply curl up in a sunlit corner armchair — nobody ever rushes you.",
  },
  {
    id: 'curiosity',
    title: 'Curiosity',
    badge: 'The Discovery',
    badgeStyle: 'bg-[#E8A838] text-brand-navy',
    description:
      'From lively open mics and weekend book clubs to specialty pour-overs and creative hobbies, we make space for open minds to explore unexpected ideas and spark conversation.',
  },
]

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function ThreePillars() {
  const [headerRef, headerIn] = useInView(0.3)
  const [cardsRef, cardsIn] = useInView(0.15)

  return (
    <section className="relative w-full bg-brand-cream pt-1 sm:pt-2 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center transition-all duration-700 ease-out mb-12 sm:mb-14 ${
            headerIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-navy">
            What We Strive For
          </h2>
          <p className="mt-3 font-display text-base sm:text-lg italic text-brand-navy/65 max-w-xl">
            Our foundation is built on more than just bricks and mortar.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className={`group relative flex flex-col transition-all duration-700 ease-out hover:-translate-y-2 ${
                cardsIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Outer Hard Navy Offset Shadow */}
              <div className="absolute inset-0 bg-brand-navy rounded-2xl translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />

              {/* Outer Card Body */}
              <div className="relative bg-[#FCFBF7] rounded-2xl border-[3px] border-brand-navy p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full z-10">
                <div>
                  {/* Top: Theme Badge */}
                  <div className="mb-5">
                    <span
                      className={`inline-flex items-center border-2 border-brand-navy px-3 py-1 rounded-md font-body text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#142950] ${pillar.badgeStyle}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight mb-4">
                    {pillar.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="font-body text-base sm:text-[15px] leading-relaxed text-brand-navy/80">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}