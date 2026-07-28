import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import kidsFlying from '../../assets/images/kids-flying-book.png'

const Cloud = ({ className }) => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M165 45c0-19.33-15.67-35-35-35-16.14 0-29.74 10.92-33.82 25.86-3.8-2.61-8.43-4.14-13.38-4.14-12.7 0-23 10.3-23 23 0 1.25.1 2.48.3 3.68C48.06 59.98 38 70.87 38 83.82c0 14.45 11.73 26.18 26.18 26.18h91.64C175.25 110 190 95.25 190 75.82c0-14.88-10.58-27.27-25-30.82z"
      fill="#fff"
    />
  </svg>
)

export default function KidsBooksHero() {
  return (
    <section className="relative pt-2 pb-16 sm:pt-4 sm:pb-20 bg-brand-cream">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffdca8] rounded-full opacity-60 blur-[120px] pointer-events-none" />
      
      <Cloud className="absolute top-4 left-[45%] w-32 opacity-90 animate-[float_6s_ease-in-out_infinite]" />
      <Cloud className="absolute top-[75%] left-[55%] w-36 opacity-70 animate-[float_8s_ease-in-out_infinite_reverse]" />
      <Cloud className="absolute top-2 right-[5%] w-24 opacity-80 animate-[float_7s_ease-in-out_infinite]" />
      
      <div className="container-page relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text block on the left */}
          <div className="pt-2 relative z-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#B7410E] mb-4">
              Chintu and Pintoo's Story Corner
            </p>
            
            <h1 className="font-display font-extrabold text-[42px] sm:text-[56px] text-brand-navy leading-[1.05] mb-6">
              Because every great thinker started with a great story.
            </h1>

            <p className="text-brand-navy/80 leading-relaxed max-w-md text-base sm:text-lg mb-8">
              Reading does more than teach new words. It sparks imagination, builds empathy, 
              and gives kids a safe space to ask big questions. Give them a book, and watch their world grow.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 md:mb-0">
              <Button as={Link} to="#kids-staff-picks" variant="primary" className="!bg-[#B7410E] hover:!bg-[#e66a4a] !border-none !px-8 shadow-lg shadow-[#B7410E]/30 hover:scale-105 transition-transform">
                Find Their Next Adventure
              </Button>
            </div>
          </div>

          {/* Right side illustration - optimized for above fold visibility */}
          <div className="relative w-full flex justify-center md:justify-end animate-[float_5s_ease-in-out_infinite] mix-blend-multiply">
            <img
              src={kidsFlying}
              alt="Kids flying on a book"
              className="w-full max-w-[650px] h-auto scale-110 lg:scale-[1.2] origin-center translate-x-2 lg:translate-x-6"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  )
}