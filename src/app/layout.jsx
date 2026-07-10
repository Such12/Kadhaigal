import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar.jsx'
import Footer from '../components/home/Footer.jsx'

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
