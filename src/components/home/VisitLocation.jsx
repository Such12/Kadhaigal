import { MapPin, Clock } from 'lucide-react'

export default function VisitLocation() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
            Come Visit the Corner
          </h2>
          <p className="mt-4 text-brand-navy/65 leading-relaxed max-w-md">
            We're tucked away in a quiet lane of Sahakarnagar, just far
            enough from the main road to hear the birds, but close enough
            for your daily caffeine fix.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="w-9 h-9 rounded-full bg-brand-sage/20 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#5b8a3f]" />
              </span>
              <div>
                <p className="font-semibold text-brand-navy text-sm">
                  Kadhaigal Books & Café
                </p>
                <p className="text-sm text-brand-navy/60">
                  Ground Floor, Plot No. 547/16, A Block, Sahakarnagar,
                  Bengaluru-560092
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="w-9 h-9 rounded-full bg-brand-sage/20 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-[#5b8a3f]" />
              </span>
              <div>
                <p className="font-semibold text-brand-navy text-sm">Opening Hours</p>
                <p className="text-sm text-brand-navy/60">
                  Monday - Sunday: 10:00 AM - 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-polaroid border-4 border-white aspect-[4/3]">
            <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#DCE8CE" />
              <path d="M0 40 L400 90 M0 140 L400 60 M0 220 L400 190 M40 0 L90 300 M220 0 L260 300"
                stroke="#C3D6AE" strokeWidth="10" fill="none" />
              <rect x="60" y="60" width="90" height="60" fill="#B7D3A4" opacity="0.7" />
              <rect x="220" y="150" width="110" height="80" fill="#9BC9DA" opacity="0.6" />
              <circle cx="190" cy="140" r="34" fill="#B7410E" opacity="0.15" />
              <g transform="translate(178,120)">
                <path d="M12 0C5 0 0 5 0 12c0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z" fill="#B7410E" />
                <circle cx="12" cy="12" r="4.5" fill="white" />
              </g>
              <rect x="70" y="200" width="18" height="14" fill="#B7410E" opacity="0.8" />
              <rect x="290" y="70" width="18" height="14" fill="#142950" opacity="0.7" />
            </svg>
          </div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-sage text-brand-navy text-xs font-semibold px-4 py-1.5 rounded-full shadow-card flex items-center gap-1">
            We're Here! <span aria-hidden>♡</span>
          </div>
        </div>
      </div>
    </section>
  )
}
