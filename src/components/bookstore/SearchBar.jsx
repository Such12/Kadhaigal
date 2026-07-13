import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search By Title, Author, Publisher Or ISBN' }) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-3 flex items-center text-brand-navy/60">
          <Search size={18} />
        </span>
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-brand-navy/10 rounded-full pl-11 pr-4 py-3 bg-white text-sm placeholder:text-brand-navy/50 focus:outline-none"
        />
      </label>
    </div>
  )
}
