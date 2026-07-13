import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'

const links = [
  { label: 'Books', href: '/bookstore' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur border-b border-brand-navy/5">
      <nav className="container-page flex items-center justify-between h-20">
        <Logo />

        <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium text-brand-navy">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `transition-colors hover:text-brand-brick ${
                    isActive ? 'underline underline-offset-8 decoration-brand-navy' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5 text-brand-navy">
          <button aria-label="Cart" className="hover:text-brand-brick transition-colors">
            <ShoppingBag size={20} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hover:text-brand-brick transition-colors">
            <User size={20} strokeWidth={1.8} />
          </button>
        </div>

        <button
          className="md:hidden text-brand-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden container-page pb-6">
          <ul className="flex flex-col gap-4 text-brand-navy font-medium">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'underline underline-offset-8 decoration-brand-navy' : ''
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 mt-5 text-brand-navy">
            <ShoppingBag size={20} strokeWidth={1.8} />
            <User size={20} strokeWidth={1.8} />
          </div>
        </div>
      )}
    </header>
  )
}
