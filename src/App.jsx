import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RootLayout from './app/layout.jsx'

// public pages
import HomePage from './app/public/page.jsx'
import AboutPage from './app/public/about/page.jsx'
import CafePage from './app/public/cafe/page.jsx'
import EventsPage from './app/public/events/page.jsx'
import BookstorePage from './app/public/bookstore/page.jsx'
import BookDetailPage from './app/public/bookstore/id/page.jsx'
import ContactPage from './app/public/contact/page.jsx'

// admin pages
import AdminDashboardPage from './app/admin/page.jsx'
import AdminBooksPage from './app/admin/books/page.jsx'
import AdminEventsPage from './app/admin/events/page.jsx'
import AdminOrdersPage from './app/admin/orders/page.jsx'
import AdminSettingsPage from './app/admin/settings/page.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* public */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cafe" element={<CafePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="bookstore" element={<BookstorePage />} />
          <Route path="bookstore/:id" element={<BookDetailPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* admin */}
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="admin/books" element={<AdminBooksPage />} />
          <Route path="admin/events" element={<AdminEventsPage />} />
          <Route path="admin/orders" element={<AdminOrdersPage />} />
          <Route path="admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
