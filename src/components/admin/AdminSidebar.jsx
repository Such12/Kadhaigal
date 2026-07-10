// Placeholder sidebar navigation for the admin panel.

const links = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Books', href: '/admin/books' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar() {
  return (
    <nav className="w-56 bg-brand-navy text-white min-h-screen p-6 space-y-4">
      {links.map((link) => (
        <a key={link.label} href={link.href} className="block text-sm hover:text-brand-sage">
          {link.label}
        </a>
      ))}
    </nav>
  )
}
