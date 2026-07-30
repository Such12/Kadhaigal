import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { signOutAdmin } from '../../lib/adminAuth.js'

export default function AdminSignOutButton({ className = '' }) {
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOutAdmin()
    navigate('/admin/login', { replace: true })
  }

  return (
    <button
      onClick={handleSignOut}
      className={`flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors ${className}`}
    >
      <LogOut size={16} /> Sign Out
    </button>
  )
}