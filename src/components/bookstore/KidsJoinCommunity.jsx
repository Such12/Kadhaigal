import { Instagram, Heart, MessageCircle, BookOpen, Users } from 'lucide-react'
import mooseCover from '../../assets/images/this_moose_belongs_to_me.jpg'

export default function KidsJoinCommunity() {
  return (
    <section className="py-16 sm:py-24 relative bg-brand-cream overflow-hidden">
      <div className="container-page relative z-10">

        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-bold tracking-widest uppercase text-[#ff7a59] mb-4 inline-flex items-center gap-2">
            <Instagram size={16} />
            Follow Along on Instagram
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight mb-4">
            Discover Books <span className="text-[#ff7a59]">We Love.</span>
          </h2>
          <p className="text-brand-navy/70 text-lg max-w-xl mx-auto leading-relaxed">
            Every week, we spotlight a children's book on Instagram — sharing what makes it special and why your child will love it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">

          {/* Left: Mock Instagram Post */}
          <div className="relative flex justify-center">

            {/* Card */}
            <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">

              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff7a59] to-brand-navy flex items-center justify-center text-white font-display font-bold text-lg shrink-0">
                  K
                </div>
                <div>
                  <p className="font-bold text-sm text-brand-navy leading-tight">kadhaigal</p>
                  <p className="text-xs text-brand-navy/50">Bookstore & Community</p>
                </div>
              </div>

              {/* Post Image */}
              <div className="bg-[#fef6eb] rounded-2xl aspect-square flex items-center justify-center mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffdca8]/50 to-[#E3ECD9]/30" />
                <img
                  src={mooseCover}
                  alt="This Moose Belongs to Me Book Cover"
                  className="w-2/3 object-contain relative z-10 shadow-2xl shadow-brand-navy/20 rounded-md -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>

              {/* Post Actions */}
              <div className="flex items-center gap-4 mb-3 text-brand-navy">
                <Heart size={22} className="fill-red-400 text-red-400" />
                <MessageCircle size={22} className="text-brand-navy/60" />
                <BookOpen size={22} className="text-[#ff7a59] ml-auto" />
              </div>

              {/* Post Caption */}
              <div className="text-sm text-brand-navy/80 leading-relaxed">
                <span className="font-bold text-brand-navy mr-1">kadhaigal</span>
                This week's favorite! 🦌 "This Moose Belongs to Me" by Oliver Jeffers. A hilarious and beautiful story about the rules of ownership (and how moose don't care about them). 
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-2 bg-[#ff7a59] text-white font-display font-bold text-xs px-4 py-2 rounded-full shadow-lg shadow-[#ff7a59]/30 rotate-12">
              Weekly Pick ✨
            </div>
          </div>

          {/* Right: Text + CTA */}
          <div className="text-center md:text-left">

            <div className="space-y-4 mb-8">
              {[
                { 
                  icon: BookOpen, 
                  color: 'text-brand-brick bg-[#ffdca8]', 
                  title: 'Curated Weekly', 
                  desc: 'We pick one book every week that we absolutely love for young readers.' 
                },
                { 
                  icon: MessageCircle, 
                  color: 'text-[#3f6b2a] bg-[#E3ECD9]', 
                  title: 'Deep Dives', 
                  desc: 'We talk about the story, the themes, and why it matters for your child.' 
                },
                { 
                  icon: Users, 
                  color: 'text-brand-navy bg-brand-navy/10', 
                  title: 'Join the Discussion', 
                  desc: 'Share it with other parents and start a conversation about reading.' 
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/60 transition-colors border border-transparent hover:border-brand-navy/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-display text-lg text-brand-navy mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-navy/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://instagram.com/kadhaigal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-[#fd1d1d]/20 transition-all hover:-translate-y-1 text-base ml-2"
            >
              <Instagram size={20} />
              Follow @kadhaigal
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
