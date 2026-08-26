import ContentRenderer from '@/components/ContentRenderer'
import ImageCarousel from '@/components/ImageCarousel'
import Reveal from '@/components/Reveal'

const Layout = ({ reviews, upwork }) => {
  return (
    <div className="mx-auto p-3 md:p-6 lg:p-12">
      <div className="prose dark:prose-invert prose-headings:mb-4">
        {/* Section headings are h2 for semantics, shown at their original scale. */}
        <Reveal
          animation="fade-in"
          className="prose prose-invert [&_h2]:text-xl [&_h2]:font-bold md:[&_h2]:text-2xl"
          delay={200}
        >
          <ContentRenderer source={reviews} />
        </Reveal>

        <Reveal animation="fade-in" className="prose prose-invert" delay={200}>
          <ImageCarousel images={upwork} className="mb-4 mt-4" />
        </Reveal>
      </div>
    </div>
  )
}

export default Layout
