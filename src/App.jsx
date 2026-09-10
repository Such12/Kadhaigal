import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'

import RootLayout from './app/layout.jsx'
import AdminLayout from './app/admin/layout.jsx'

// public pages
import HomePage from './app/public/page.jsx'
import AboutPage from './app/public/about/page.jsx'
import EventsPage from './app/public/events/page.jsx'
import BookstorePage from './app/public/bookstore/page.jsx'
import BookstoreSearchPage from './app/public/bookstore/search/page.jsx'
import KidsBookstorePage from './app/public/bookstore/kids/page.jsx'
import GenrePage from './app/public/bookstore/genre/page.jsx'
import BookDetailPage from './app/public/bookstore/id/page.jsx'

// admin pages
import AdminDashboardPage from './app/admin/page.jsx'
import AdminBooksPage from './app/admin/books/page.jsx'
import AdminEventsPage from './app/admin/events/page.jsx'
import AdminOrdersPage from './app/admin/orders/page.jsx'
import AdminSettingsPage from './app/admin/settings/page.jsx'

import { CustomerAuthProvider } from './context/CustomerAuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import CustomerLoginPage from './app/public/account/login/page.jsx'
import AccountPage from './app/public/account/page.jsx'
import CartPage from './app/public/cart/page.jsx'

export default function App() {
  return (
      <CustomerAuthProvider>
      <CartProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* public */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="bookstore" element={<BookstorePage />} />
          <Route path="bookstore/search" element={<BookstoreSearchPage />} />
          <Route path="bookstore/kids" element={<KidsBookstorePage />} />
          <Route path="bookstore/genre/:genre" element={<GenrePage />} />
          <Route path="bookstore/:id" element={<BookDetailPage />} />
          <Route path="account/login" element={<CustomerLoginPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* admin */}
        {/* /admin/login redirects to the unified login page */}
        <Route path="admin/login" element={<Navigate to="/account/login" replace />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="books" element={<AdminBooksPage />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </CustomerAuthProvider>
  )
}