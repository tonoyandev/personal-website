import ContentRenderer from '@/components/ContentRenderer'
import ImageCarousel from '@/components/ImageCarousel'
import Reveal from '@/components/Reveal'


const Layout = ({ reviews, upwork }) => {
  return (
    <div className="mx-auto p-3 md:p-6 lg:p-12">
      <div className="prose prose-headings:mb-4 dark:prose-invert">
        <Reveal animation="fade-in" className="prose prose-invert" delay={200}>
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
