import ContentRenderer from '@/components/ContentRenderer'
import ImageCarousel from '@/components/ImageCarousel'

const Layout = ({ reviews, upwork }) => {
  return (
    <div className="mx-auto p-3 md:p-6 lg:p-12">
      <div className="prose prose-headings:mb-4 dark:prose-invert">
        <ContentRenderer source={reviews} />
        <ImageCarousel images={upwork} animation="fade-in zoom-out" className="mb-4 mt-4" />
      </div>
    </div>
  )
}

export default Layout
