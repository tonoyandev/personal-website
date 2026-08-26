import Sep from '@/components/Sep'

// Page titles are h1 (and their subtitles h2) for document semantics, but keep the
// smaller display scale this block was designed around — without this the default
// h2 scale would render a subtitle larger than the title above it.
const titleScale = [
  '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight lg:[&_h1]:text-4xl',
  '[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight lg:[&_h2]:text-4xl',
].join(' ')

const PageTitle = ({ children }) => (
  <div className="-mx-3 -mt-3 md:m-0">
    <div
      className={`bg-gradient-to-b from-omega-800 to-omega-800 p-6 pb-2 md:bg-none md:p-0 ${titleScale}`}
    >
      {children}
    </div>
    <Sep className="md:bg-none" line />
  </div>
)

export default PageTitle
