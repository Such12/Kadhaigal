import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'
import Button from '../ui/Button.jsx'

const highlights = [
  'Carefully chosen books with a focus on feelings, curiosity, and understanding of the world',
  'Questions parents can discuss with children',
  'Monthly storytelling sessions at Kadhaigal',
]

export default function SubscriptionBox() {
  return (
    <section className="bg-[#F5F5DC]">
      <div className="container-page py-16 sm:py-20 grid md:grid-cols-2 gap-12 items-center">
        <ImagePlaceholder
          label="Chintu & Pintoo on a stack of books illustration"
          className="aspect-[4/5] rounded-2xl shadow-polaroid w-full max-w-sm mx-auto"
        />

        <div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
            Introducing the Chintu Pintoo Subscription Box
          </h2>

          <div className="mt-5 space-y-4 text-brand-navy/70 leading-relaxed max-w-md">
            <p>
              This is more than a book subscription — it's a reading
              community for families.
            </p>
            <p>
              Each month, you'll receive thoughtfully selected books for
              your child, plus join a parent community that shares simple
              ideas, reflection prompts, and gentle nudges to help children
              read regularly.
            </p>
            <p>
              We believe reading grows best with consistency and
              encouragement — not pressure or perfection.
            </p>
          </div>

          <p className="font-display font-bold text-brand-navy mt-6 mb-3">
            What makes our subscription special:
          </p>
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-brand-sage/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-[#3f6b2a]" strokeWidth={3} />
                </span>
                <span className="text-sm text-brand-navy/75">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-brand-brick text-white rounded-xl px-6 py-4 mt-6 max-w-xs text-center">
            <p className="font-display font-bold">Age: 3 to 8 years</p>
            <p className="font-display font-bold">Price: ₹750 per month</p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Button as={Link} to="/contact" variant="primary">
              Register Now
            </Button>
            <ImagePlaceholder
              label="Registration QR code"
              className="w-16 h-16 rounded-lg shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}