import { BookOpen, Coffee, Users } from 'lucide-react'
import Card from '../ui/Card.jsx'

const pillars = [
  {
    icon: BookOpen,
    iconBg: 'bg-brand-navy/10',
    iconColor: 'text-brand-navy',
    title: 'The Stacks',
    titleColor: 'text-brand-navy',
    body: "A curated collection that focuses on local authors, diverse voices, and rare finds you won't find on a global algorithm.",
  },
  {
    icon: Coffee,
    iconBg: 'bg-brand-brick/10',
    iconColor: 'text-brand-brick',
    title: 'The Café',
    titleColor: 'text-brand-brick',
    body: 'Specialty roasts and plant-based treats that pair perfectly with a mystery novel or a quiet morning of reflection.',
  },
  {
    icon: Users,
    iconBg: 'bg-brand-sage/20',
    iconColor: 'text-[#5b8a3f]',
    title: 'Community',
    titleColor: 'text-brand-navy',
    body: 'From open mics to book clubs, we are the living room for Sahakarnagar\'s curious minds and creative souls.',
  },
]

export default function ThreePillars() {
  return (
    <section className="container-page py-16 sm:py-20 text-center">
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
        The Three Pillars
      </h2>
      <p className="mt-3 text-brand-navy/60 italic">
        Our foundation is built on more than just bricks and mortar.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mt-12 text-left">
        {pillars.map(({ icon: Icon, iconBg, iconColor, title, titleColor, body }) => (
          <Card key={title} className="p-7">
            <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center mb-5`}>
              <Icon size={20} className={iconColor} strokeWidth={2} />
            </div>
            <h3 className={`font-display font-bold text-lg mb-2 ${titleColor}`}>{title}</h3>
            <p className="text-sm text-brand-navy/60 leading-relaxed">{body}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
