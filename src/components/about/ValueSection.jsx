import { InclusionDoodle, DialogueDoodle, PlantDoodle, BookHeartDoodle } from './ValueIcons.jsx'

const values = [
  {
    Icon: InclusionDoodle,
    title: 'Radical Inclusion',
    body: 'From the genres we stock to the chairs we provide, everyone has a place at our table.',
  },
  {
    Icon: DialogueDoodle,
    title: 'Deep Dialogue',
    body: 'We favor slow conversations over quick transactions. Ask us anything, tell us everything.',
  },
  {
    Icon: PlantDoodle,
    title: 'Plant-Powered',
    body: "Our café is 100% plant-based, reflecting our roots and our respect for the earth.",
  },
  {
    Icon: BookHeartDoodle,
    title: 'Everlasting Tales',
    body: "We believe stories bridge generations. Your grandmother's favorite book is waiting for you here.",
  },
]

export default function ValuesSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <h2 className="font-display font-bold text-brand-navy text-3xl sm:text-4xl max-w-md leading-tight">
        The Spines That Holds Us Together
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
        {values.map(({ Icon, title, body }) => (
          <div key={title}>
            <h3 className="font-display font-bold text-brand-brick mb-3">{title}</h3>
            <p className="text-sm text-brand-navy/70 leading-relaxed mb-6">{body}</p>
            <Icon className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
        ))}
      </div>
    </section>
  )
}
