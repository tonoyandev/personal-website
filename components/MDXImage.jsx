import Image from 'next/image'

// Tolerates "500px", "500" and numbers; returns undefined for anything unparseable.
const toInt = (value) => {
  const parsed = parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : undefined
}

const isExternal = (src) => /^https?:\/\//i.test(src || '')

const MDXImage = ({ src, alt = '', width, height, ...rest }) => {
  const w = toInt(width)
  const h = toInt(height)
  const caption = alt ? <figcaption className="text-center italic">{alt}</figcaption> : null

  // External images (and any image missing dimensions) bypass next/image: remote hosts would
  // need `images.remotePatterns`, and the animated GIFs used in posts are passed through
  // unoptimized by the image optimizer anyway.
  if (isExternal(src) || !w || !h) {
    return (
      <figure className="mx-auto" style={w ? { maxWidth: `${w}px` } : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mx-auto"
          src={src}
          alt={alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {caption}
      </figure>
    )
  }

  return (
    <figure className="mx-auto" style={{ maxWidth: `${w}px` }}>
      <Image className="mx-auto" src={src} alt={alt} width={w} height={h} {...rest} />
      {caption}
    </figure>
  )
}

export default MDXImage
