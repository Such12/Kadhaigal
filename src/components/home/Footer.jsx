import Logo from './Logo.jsx'
import { Instagram, MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Bookstore', href: '/bookstore' },
    { label: 'Events', href: '/events' },
  ]

  const policies = [
    { label: 'Terms & Conditions', href: '/policies/terms' },
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Return and Refund Policy', href: '/policies/returns' },
    { label: 'Shipping Policy', href: '/policies/shipping' },
  ]

  const socials = [
    { name: 'Instagram', href: 'https://instagram.com/kadhaigal', Icon: Instagram },
    { name: 'WhatsApp', href: 'https://wa.me/your-number', Icon: MessageCircle },
    { name: 'Gmail', href: 'mailto:contact@kadhaigal.com', Icon: Mail },
  ]

  const storeTimings = [
    { days: 'Monday - Sunday', hours: '11:00 AM - 9:00 PM' },
    { days: 'Closed on Tuesdays', hours: null, isClosed: true },
  ]

  return (
    <footer className="bg-brand-navy border-t border-brand-cream/10 text-brand-cream">
      {/* Main Footer Content */}
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-4 ">
          {/* Logo and Socials */}
          <div className="lg:col-span-1">
            <Logo dark src="/footer-logo.svg" alt="Kadhaigal footer logo" />
            <div className="flex gap-4 mt-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brick hover:text-brand-cream transition-colors"
                  title={social.name}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-brand-cream mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-brand-cream hover:text-brand-brick transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold text-brand-cream mb-4">Policies</h3>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li key={policy.href}>
                  <a
                    href={policy.href}
                    className="text-xs text-brand-cream hover:text-brand-brick transition-colors"
                  >
                    {policy.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Timings */}
          <div>
            <h3 className="text-sm font-semibold text-brand-cream mb-4">Store Timings</h3>
            <div className="text-xs text-brand-cream space-y-3">
              {storeTimings.map((timing, idx) => (
                <div key={idx}>
                  <p className={timing.isClosed ? 'text-brand-brick font-semibold' : 'text-brand-cream'}>
                    {timing.days}
                  </p>
                  {timing.hours && (
                    <p className="font-semibold text-brand-cream">{timing.hours}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-sm font-semibold text-brand-cream mb-4">Visit Us</h3>
            <div className="text-xs text-brand-cream space-y-2">
              <p className="font-semibold text-brand-cream">Kadhaigal Bookstore</p>
              <p className="text-brand-cream">
                Ground Floor, Plot No. 547/16<br />
                A Block, Sahakar Nagar<br />
                Bengaluru, Karnataka 560092
              </p>
              <p className="mt-4">
                <a
                  href="tel:+91-your-number"
                  className="text-brand-cream hover:text-brand-brick transition-colors"
                >
                  Phone: +91-XXX-XXX-XXXX
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@kadhaigal.com"
                  className="text-brand-cream hover:text-brand-brick transition-colors"
                >
                  Email: contact@kadhaigal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-brand-navy pb-6">
        <div className="container-page">
          <p className="text-xs text-white/40 text-center">
            © 2026 Kadhaigal. All rights reserved. Bookstore · Community Space · Café
          </p>
          <p className="text-xs text-white/30 text-center mt-3">
            <span className="group inline-block">
              <span className="group-hover:hidden">Made by </span>
              <span className="hidden group-hover:inline">Please don't inspect the code :) </span>
              <a
                href="https://arivay.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-brick hover:text-brand-brick/80 transition-colors font-semibold"
              >
                Arivay
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}