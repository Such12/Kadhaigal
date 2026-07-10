import { useState } from 'react'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'

export default function JoinCommunity() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire up to lib/emails.js
    setSubmitted(true)
  }

  return (
    <section className="bg-[#1B2A3B] relative overflow-hidden rounded-t-[40px] sm:rounded-t-[60px]">
      <div
        className="absolute inset-0 opacity-[0.06]"
      />
      <div className="container-page py-16 sm:py-20 text-center relative">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Join the Community
        </h2>
        <p className="text-white/60 mt-3 max-w-xl mx-auto">
          Immerse yourself in monthly discussions, exclusive author notes,
          and a community of readers who appreciate the art of slow reading.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="primary" className="w-full sm:w-auto shrink-0">
            {submitted ? 'Thank you!' : 'RSVP'}
          </Button>
        </form>
      </div>
    </section>
  )
}
