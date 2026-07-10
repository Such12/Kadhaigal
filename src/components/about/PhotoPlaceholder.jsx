const palettes = {
  storefront: { bg: '#E4DCC8', a: '#B7410E', b: '#142950' },
  community: { bg: '#F0E6D2', a: '#9DC183', b: '#B7410E' },
  craft: { bg: '#EDE3CF', a: '#3A6EA5', b: '#B7410E' },
  reading: { bg: '#E9E0CB', a: '#142950', b: '#9DC183' },
  shelf: { bg: '#EFE6D8', a: '#B7410E', b: '#142950' },
  portrait: { bg: '#E6DCC4', a: '#142950', b: '#B7410E' },
}

export default function PhotoPlaceholder({ variant = 'shelf', className = '' }) {
  const p = palettes[variant] ?? palettes.shelf

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="300" height="300" fill={p.bg} />
      <g opacity="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={i * 38}
            y="30"
            width="20"
            height={120 + ((i * 37) % 60)}
            fill={i % 2 === 0 ? p.a : p.b}
            opacity="0.35"
          />
        ))}
      </g>
      <circle cx="230" cy="70" r="34" fill={p.a} opacity="0.25" />
      <rect x="30" y="190" width="160" height="70" rx="8" fill={p.b} opacity="0.18" />
      <rect x="0" y="0" width="300" height="300" fill="none" stroke={p.b} strokeOpacity="0.15" strokeWidth="10" />
    </svg>
  )
}
