export default function Logo({
  dark = false,
  src = '/logo.svg',
  alt = 'Kadhaigal',
}) {
  return (
    <a href="/" className="flex items-center gap-2.5 group">
      <img
        src={src}
        alt={alt}
        width={200}
        height={100}
        className="shrink-0"
      />
    </a>
  )
}