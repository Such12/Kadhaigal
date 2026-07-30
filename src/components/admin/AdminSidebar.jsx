import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, CalendarDays, Package, Settings } from 'lucide-react'
import AdminSignOutButton from './AdminSignOutButton.jsx'

const links = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Books', href: '/admin/books', icon: BookOpen },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  return (
    <nav className="w-56 bg-brand-navy text-white min-h-screen p-6 flex flex-col">
      <div className="space-y-1 flex-1">
        {links.map(({ label, href, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={href}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 text-sm px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-white/10">
        <AdminSignOutButton className="px-3 py-2.5" />
      </div>
    </nav>
  )
}