import { BookOpen, MessagesSquare, Users, Gift } from 'lucide-react'

const steps = [
  {
    icon: BookOpen,
    title: 'We Read It First',
    body: 'Every title earns its spot on our shelves only after someone on our team has actually finished it, cover to cover.',
  },
  {
    icon: MessagesSquare,
    title: 'We Argue About It',
    body: "If it doesn't spark a real conversation over filter coffee, it doesn't make the cut. We're looking for books people want to talk about.",
  },
  {
    icon: Users,
    title: 'We Check Who It\'s For',
    body: 'We look for books that speak honestly to the reader they were written for — no talking down, no shortcuts.',
  },
  {
    icon: Gift,
    title: 'We Ask: Would We Gift It?',
    body: 'The final test is simple. Would we hand this to someone we love? If the answer is yes, it earns a place at Kadhaigal.',
  },
]

export default function CurationPhilosophy() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
          How We Choose
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
          Every Book Here Passed Four Tests
        </h2>
        <p className="text-brand-navy/60 mt-4">
          We don't stock a book because it's trending. Here's what actually
          gets a title onto our shelves.
        </p>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-brand-sage/50" />

        {steps.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="relative text-center sm:text-left">
            <div className="relative z-10 w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center mx-auto sm:mx-0 mb-5">
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <p className="text-xs font-semibold text-brand-brick mb-1">
              Step {i + 1}
            </p>
            <p className="font-display font-bold text-brand-navy mb-2">{title}</p>
            <p className="text-sm text-brand-navy/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}