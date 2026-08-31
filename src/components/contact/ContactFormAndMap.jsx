import { useState } from 'react'

const inputClass =
  'w-full rounded-xl px-4 py-3 text-sm text-brand-navy bg-brand-cream placeholder:text-brand-navy/40 border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-brick transition-shadow duration-200'

export default function ContactFormAndMap() {
  const [form, setForm] = useState({ email: '', name: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email.trim() || !form.name.trim()) return
    // TODO: wire up to a real backend / EmailJS / Formspree
    setSubmitted(true)
  }

  return (
    <section className="bg-brand-cream py-16 sm:py-20">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Contact form ─────────────────────────────────── */}
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy mb-8">
              Send Us a <span className="text-brand-brick">Message</span>
            </h2>

            {submitted ? (
              <div className="bg-brand-sage/20 border border-brand-sage rounded-2xl p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-brand-sage mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-display font-bold text-brand-navy text-lg">Message sent!</p>
                <p className="text-brand-navy/60 text-sm mt-1">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ email: '', name: '', subject: '', message: '' }) }}
                  className="mt-5 text-brand-brick text-sm font-semibold underline underline-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-email-input" className="block text-xs font-semibold uppercase tracking-widest text-brand-navy/50 mb-1.5">Email</label>
                  <input
                    id="contact-email-input"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-name-input" className="block text-xs font-semibold uppercase tracking-widest text-brand-navy/50 mb-1.5">Name</label>
                  <input
                    id="contact-name-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange('name')}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject-input" className="block text-xs font-semibold uppercase tracking-widest text-brand-navy/50 mb-1.5">Subject</label>
                  <input
                    id="contact-subject-input"
                    type="text"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message-input" className="block text-xs font-semibold uppercase tracking-widest text-brand-navy/50 mb-1.5">Message</label>
                  <textarea
                    id="contact-message-input"
                    placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={handleChange('message')}
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full bg-brand-brick hover:bg-[#9c380c] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-md mt-1"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Map + info ──────────────────────────────────── */}
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy mb-4">
              Information? Find{' '}
              <span className="text-brand-brick">Us Here</span>
            </h2>
            <p className="text-brand-navy/60 text-sm mb-6 leading-relaxed">
              Come in, browse the shelves, and let a book choose you. We're open Monday through Saturday and love drop-ins as much as planned visits.
            </p>

            {/* Google Maps embed — replace src with your actual location */}
            <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-card h-56 sm:h-64">
              <iframe
                title="Kadhaigal location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5803!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social links */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/50 mb-3">
                Follow Us On Social Media
              </p>
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com/kadhaigal"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-instagram-link"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-brick hover:text-white transition-colors duration-200"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href="https://chat.whatsapp.com/invite"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-link"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-brick hover:text-white transition-colors duration-200"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-facebook-link"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-navy hover:bg-brand-brick hover:text-white transition-colors duration-200"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
