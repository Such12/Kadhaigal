import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-brand-cream">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}