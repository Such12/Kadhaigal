export function SpiralDoodle({ className = '', color = '#B7410E' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 8c6 0 11 4 11 10s-4 9-9 9-7-3-7-6 2.5-5 5.5-5 4.5 2 4.5 4"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FlowerDoodle({ className = '', color = '#142950' }) {
  return (
    <svg viewBox="0 0 44 44" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6c4 0 6 3 6 6s-2 5-6 5-6-3-6-5 2-6 6-6z" />
        <path d="M22 17c4 0 6 3 6 6s-2 5-6 5-6-3-6-5 2-6 6-6z" />
        <path d="M11 16c0-4 3-6 6-6s5 2 5 6-3 6-5 6-6-2-6-6z" />
        <path d="M22 16c0-4 3-6 6-6s5 2 5 6-3 6-5 6-6-2-6-6z" />
        <circle cx="22" cy="16" r="2.4" fill={color} stroke="none" />
      </g>
    </svg>
  )
}

export function AsteriskDoodle({ className = '', color = '#B7410E' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 2v20" />
        <path d="M3 7l18 10" />
        <path d="M21 7L3 17" />
      </g>
    </svg>
  )
}

export function LeafSquiggle({ className = '', color = '#9DC183' }) {
  return (
    <svg viewBox="0 0 40 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12c6-10 16-10 20-4 3 5-1 10-6 8-4-1.5-3-6 2-6 8 0 14 6 20 10"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CurlyArrow({ className = '', color = '#142950' }) {
  return (
    <svg viewBox="0 0 140 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 12c10 0 18 8 16 18-2 9-13 12-19 5-4-5-1-11 5-11 10 0 24 8 32 22 5 9 6 19 3 28"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 68l12 17 6-19"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
