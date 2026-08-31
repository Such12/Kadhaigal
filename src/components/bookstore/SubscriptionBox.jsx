import { Link } from 'react-router-dom'
import { Sparkles, BookOpen, Users } from 'lucide-react'
import Button from '../ui/Button.jsx'
import boxImg from '../../assets/images/subscription_box_kid_nobg.png'

const features = [
  {
    icon: BookOpen,
    title: 'Curated Stories',
    desc: 'Handpicked books focusing on feelings, curiosity, and world understanding.',
    color: 'bg-[#ff7a59]'
  },
  {
    icon: Users,
    title: 'Parent Community',
    desc: 'Join discussions with simple ideas, reflection prompts, and gentle nudges.',
    color: 'bg-[#7aa066]'
  },
  {
    icon: Sparkles,
    title: 'Storytelling Magic',
    desc: 'Exclusive monthly storytelling sessions right here at Kadhaigal.',
    color: 'bg-[#F7BC05]'
  }
]

export default function SubscriptionBox() {
  return (
    <section className="py-6 sm:py-8 relative bg-brand-cream overflow-hidden">
      
      <div className="container-page">
        
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 relative z-10">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-brick mb-2">
            A Reading Community For Families
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight mb-3">
            The Chintu Pintoo <br /> Subscription Box
          </h2>
          <p className="text-brand-navy/70 text-base">
            We believe reading grows best with consistency and encouragement. 
            Receive thoughtfully selected books each month and let the magic begin!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left: Feature Grid */}
          <div className="space-y-4 lg:pr-8 lg:pl-12 relative z-10">
            <h3 className="font-display text-xl text-brand-navy mb-3">What's inside the box?</h3>
            
            <div className="grid gap-3">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/40 transition-colors border border-transparent hover:border-brand-navy/5">
                  <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-white shadow-md ${item.color}`}>
                    <item.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="pt-0.5">
                    <h4 className="font-display text-lg text-brand-navy mb-1">{item.title}</h4>
                    <p className="text-brand-navy/70 text-sm leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button as={Link} to="/contact" variant="primary" className="w-full sm:w-auto !px-10 !py-3 text-base shadow-xl shadow-brand-brick/20 hover:shadow-brand-brick/40 hover:-translate-y-1 transition-all !bg-brand-brick hover:!bg-brand-brick/90 !border-none">
                Start Their Journey
              </Button>
            </div>
          </div>

          {/* Right: Interactive/Visual representation of the box */}
          <div className="relative flex justify-center group animate-[float_6s_ease-in-out_infinite] mix-blend-multiply mt-4 lg:mt-0">
              <img 
                src={boxImg} 
                alt="Child opening a magical box of books" 
                className="w-[95%] sm:w-full max-w-[650px] max-h-[350px] lg:max-h-[450px] object-contain scale-110 lg:scale-125 origin-center transform-gpu -ml-8"
              />
          </div>
          
        </div>
      </div>
    </section>
  )
}