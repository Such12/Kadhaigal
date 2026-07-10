import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-[#1B2A3B] border-t border-white/10">
      <div className="container-page py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo dark src="/footer-logo.svg" alt="Kadhaigal footer logo" />

        <p className="text-xs text-white/40 text-center sm:text-right">
          © 2026 Kadhaigal. Bookstore · Community Space · Café
        </p>
      </div>
    </footer>
  )
}