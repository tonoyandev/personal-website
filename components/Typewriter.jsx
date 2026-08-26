import React from 'react'
import classNames from 'clsx'
import { IoChevronForwardSharp } from 'react-icons/io5'

const Typewriter = (props) => {
  const {
    children,
    className,
    lineClassName,
    as = 'span',
    lines = [],
    interval = 3000,
    withIcon = true,
    ...rest
  } = props

  // Starts at the first line so the text is present in the server-rendered HTML:
  // the CSS animation does the typing, rather than mounting the text after a delay.
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const linesLength = children ? 1 : lines.length
    if (linesLength < 2) return

    const intervalID = setInterval(() => setIndex((i) => (i + 1) % linesLength), interval)
    return () => clearInterval(intervalID)
  }, [lines, children, interval])

  const Component = as

  return (
    <Component className={classNames('m-0 inline-flex items-baseline font-mono', className)}>
      {withIcon && (
        <IoChevronForwardSharp className="hidden shrink-0 grow-0 self-center text-omega-500 md:block" />
      )}
      <span
        key={index}
        className={classNames(
          'animate-typewriter overflow-hidden whitespace-nowrap motion-reduce:animate-none',
          lineClassName
        )}
        {...rest}
      >
        {lines[index] || children}
      </span>
      <span
        aria-hidden="true"
        className="ml-2 -translate-y-2 animate-blink motion-reduce:animate-none"
      >
        _
      </span>
    </Component>
  )
}

export default Typewriter
