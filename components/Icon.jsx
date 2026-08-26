import SVG from 'react-inlinesvg'

// `title` gives the inline SVG an accessible name; without one it is decorative
// and must be hidden from assistive technology rather than announced as an image.
const Icon = ({ source, src, title, width = 28, ...props }) => {
  if (!source && !src) return null

  return (
    <SVG
      src={source || src}
      width={width}
      title={title}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    />
  )
}

export default Icon
