import InclusionDoodle from '../../assets/images/chintu balancing books.svg'
import DialogueDoodle from '../../assets/images/smollie_3.svg'
import PlantDoodle from '../../assets/images/bevs.svg'
import BookHeartDoodle from '../../assets/images/kids w books.svg'

const values = [
  {
    iconUrl: InclusionDoodle, 
    title: 'Radical Inclusion',
    body: 'From the genres we stock to the chairs we provide, everyone has a place at our table.',
  },
  {
    iconUrl: DialogueDoodle,
    title: 'Deep Dialogue',
    body: 'We favor slow conversations over quick transactions. Ask us anything, tell us everything.',
  },
  {
    iconUrl: PlantDoodle,
    title: 'Plant-Powered',
    body: "Our café is 100% plant-based, reflecting our roots and our respect for the earth.",
  },
  {
    iconUrl: BookHeartDoodle,
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
        {values.map(({ iconUrl, title, body }) => (
          <div key={title} className="flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-brand-brick mb-3 text-lg">{title}</h3>
              <p className="text-sm text-brand-navy/70 leading-relaxed mb-6">{body}</p>
            </div>
            <img 
              src={iconUrl} 
              alt={title} 
              className="w-[120px] h-[120px]  object-contain self-start" 
            />
          </div>
        ))}
      </div>
    </section>
  )
}