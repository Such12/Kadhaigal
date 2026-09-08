import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'

export default function ImageUploadField({ bucket, value, onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err) {
      setError(err.message || 'Could not upload image.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-brand-navy/15">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-brand-navy/70 hover:text-red-600"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-32 h-24 rounded-lg border-2 border-dashed border-brand-navy/20 flex flex-col items-center justify-center gap-1.5 text-brand-navy/50 hover:border-brand-brick/40 hover:text-brand-brick transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          <span className="text-[11px]">{uploading ? 'Uploading…' : 'Upload Image'}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {error && <p className="text-[11px] text-red-600 mt-1">{error}</p>}
    </div>
  )
}