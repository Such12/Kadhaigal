export default function BookshelfIllustration() {
  const spineColors = [
    '#B7410E', '#142950', '#9DC183', '#D9A441', '#7A9E9F',
    '#C1666B', '#4A6FA5', '#E8B4BC', '#8B5E3C', '#5B7F5B',
  ]

  const renderShelf = (yStart, count, seedOffset) => {
    const spines = []
    let x = 6
    for (let i = 0; i < count; i++) {
      const w = 8 + ((i + seedOffset) % 4) * 4
      const h = 60 + ((i + seedOffset) % 3) * 14
      spines.push(
        <rect
          key={`${yStart}-${i}`}
          x={x}
          y={yStart + (78 - h)}
          width={w}
          height={h}
          rx="1.5"
          fill={spineColors[(i + seedOffset) % spineColors.length]}
          opacity="0.92"
        />
      )
      x += w + 2.5
    }
    return spines
  }

  return (
    <svg viewBox="0 0 320 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="#EFE6D8" />
      {/* bookshelf rows */}
      <g>{renderShelf(20, 16, 0)}</g>
      <g>{renderShelf(110, 15, 3)}</g>
      <g>{renderShelf(200, 16, 1)}</g>
      {/* shelf boards */}
      <rect x="0" y="108" width="320" height="6" fill="#C9BBA0" />
      <rect x="0" y="198" width="320" height="6" fill="#C9BBA0" />
      <rect x="0" y="288" width="320" height="6" fill="#C9BBA0" />

      {/* open window frame overlay */}
      <g opacity="0.9">
        <rect x="0" y="0" width="320" height="40" fill="#F7F2E7" />
        <rect x="140" y="0" width="14" height="140" fill="#F7F2E7" />
        <path d="M0 0 L150 0 L0 130 Z" fill="#F0EAD8" opacity="0.6" />
        <rect x="0" y="0" width="320" height="320" fill="none" stroke="#DCD0B8" strokeWidth="10" />
      </g>
    </svg>
  )
}
