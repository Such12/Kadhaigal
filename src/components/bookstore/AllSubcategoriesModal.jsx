import { useRef, useEffect, useCallback } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
  BookOpen, Brain, Globe, Landmark, TrendingUp, DollarSign, Target, Sprout, Briefcase, Cpu,
  MapPin, Clock, Rainbow, Languages, Star, Castle,
  Rocket, AlertTriangle, Monitor,
  Eye, Coffee, Search,
  Heart, Moon, Calendar, Zap,
  Wand2, Sword, Skull, Building2,
  FlaskConical, TreePine, Lightbulb, CloudRain, Mountain,
  Palette, PenTool, Utensils, Brush
} from 'lucide-react'

// Icon per subcategory (no color — color is assigned by cycling brand themes)
const SUB_ICON_MAP = {
  'Memoir': BookOpen, 'Contemporary issuses': Globe, 'Understanding the world': Brain,
  'Indian History': Landmark, 'Indian Politics': Landmark, 'Economics': TrendingUp,
  'Personal Finance': DollarSign, 'Leadership': Target, 'Growth': Sprout,
  'Buisness memoirs': Briefcase, 'AI': Cpu,
  'Indian fiction': MapPin, 'Historical Fiction': Clock, 'Queer Fiction': Rainbow,
  'Translated Fiction': Languages, 'Modern Classics': Star, 'Greek Mythology': Castle,
  'Hard Sci fic': Rocket, 'Dystopian': AlertTriangle, 'Cyberpunk': Monitor,
  'Pyschological thrillers': Eye, 'Cozy mystries': Coffee,
  'Crime and Detective Fiction': Search, 'Spy Thrillers': Search,
  'Contemporary romance': Heart, 'Dark romance': Moon,
  'Historical romance': Calendar, 'Enemies to lovers': Zap,
  'Romantasy': Heart, 'High/Epic Fantasy': Sword, 'Dark Fantasy': Skull, 'Urban Fantasy': Building2,
  'Science': FlaskConical, 'Nature': TreePine, 'Pyschology': Lightbulb,
  'Cimate change': CloudRain, 'Adventure': Mountain,
  'Art': Palette, 'Design': PenTool, 'Food': Utensils, 'Adult Colouring': Brush,
}

// Three brand color themes to cycle through
const BRAND_THEMES = [
  { bg: 'bg-brand-brick/10', border: 'border-brand-brick/25', text: 'text-brand-brick', iconColor: 'text-brand-brick/70' },
  { bg: 'bg-brand-navy/[0.06]', border: 'border-brand-navy/15', text: 'text-brand-navy', iconColor: 'text-brand-navy/60' },
  { bg: 'bg-brand-sage/20', border: 'border-brand-sage/50', text: 'text-brand-navy', iconColor: 'text-brand-sage' },
]

export default function AllSubcategoriesModal({ categories, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const pillsRef = useRef([])
  const tlRef = useRef(null)

  // Flatten all subcategories, cycling brand colors
  const allSubcategories = categories.flatMap(c =>
    c.tags.map((tag, i) => ({
      tag,
      categorySlug: c.slug,
      categoryName: c.name,
      icon: SUB_ICON_MAP[tag] || BookOpen,
      ...BRAND_THEMES[i % BRAND_THEMES.length],
    }))
  )

  // Animate in on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tlRef.current = tl

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    )

    tl.fromTo(panelRef.current,
      { y: '100%' },
      { y: '0%', duration: 0.5, ease: 'power4.out' },
      '-=0.15'
    )

    tl.fromTo(headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 },
      '-=0.25'
    )

    const pills = pillsRef.current.filter(Boolean)
    tl.fromTo(pills,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.025,
        ease: 'power2.out'
      },
      '-=0.15'
    )

    return () => tl.kill()
  }, [])

  // Animate out then close
  const handleClose = useCallback(() => {
    const pills = pillsRef.current.filter(Boolean)
    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: onClose
    })

    tl.to(pills, {
      x: 30,
      opacity: 0,
      duration: 0.2,
      stagger: { amount: 0.12, from: 'end' }
    })
    tl.to(panelRef.current, {
      y: '100%',
      duration: 0.35,
      ease: 'power3.in'
    }, '-=0.1')
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2
    }, '-=0.15')
  }, [onClose])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-brand-navy/30 backdrop-blur-sm z-[100]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      style={{ opacity: 0 }}
    >
      <div
        ref={panelRef}
        className="absolute inset-0 bg-brand-cream flex flex-col"
        style={{ transform: 'translateY(100%)' }}
      >
        {/* Floating close button */}
        <button
          ref={headerRef}
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-8 sm:right-10 z-10 w-11 h-11 rounded-full bg-brand-navy/5 hover:bg-brand-navy/10 flex items-center justify-center text-brand-navy/60 hover:text-brand-navy transition-colors"
          style={{ opacity: 0 }}
        >
          <X size={22} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-10 sm:pb-14">
          {/* Centered title */}
          <div className="text-center mb-10 sm:mb-14 max-w-lg mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy">Browse All</h2>
            <p className="text-brand-navy/50 text-base mt-2">Pick a subcategory that speaks to you.</p>
          </div>

          <div className="max-w-5xl mx-auto flex flex-wrap gap-3 sm:gap-4 justify-center">
            {allSubcategories.map((sub, idx) => {
              const Icon = sub.icon
              return (
                <Link
                  key={`${sub.categorySlug}-${sub.tag}-${idx}`}
                  ref={(el) => (pillsRef.current[idx] = el)}
                  to={`/bookstore/genre/${sub.categorySlug}?sub=${encodeURIComponent(sub.tag)}`}
                  onClick={onClose}
                  className={`group inline-flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full border-2 ${sub.bg} ${sub.border} ${sub.text} font-semibold text-sm sm:text-base transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5`}
                  style={{ opacity: 0 }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.06, duration: 0.25, ease: 'back.out(2)' })
                    gsap.to(e.currentTarget.querySelector('.pill-icon'), { rotate: 15, scale: 1.2, duration: 0.25, ease: 'back.out(3)' })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' })
                    gsap.to(e.currentTarget.querySelector('.pill-icon'), { rotate: 0, scale: 1, duration: 0.2, ease: 'power2.out' })
                  }}
                >
                  <Icon size={18} className={`pill-icon ${sub.iconColor} shrink-0`} strokeWidth={2} />
                  <span>{sub.tag}</span>
                  <ArrowRight size={14} className="opacity-0 -ml-1 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
