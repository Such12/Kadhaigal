import BooksManager from '../../../components/admin/BooksManager.jsx'

export default function AdminBooksPage() {
  return (
    <div className="container-page py-10">
      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy mb-8">
        Manage Books
      </h1>
      <BooksManager />
    </div>
  )
}
