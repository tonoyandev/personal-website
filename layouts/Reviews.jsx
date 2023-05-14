import ContentRenderer from '@/components/ContentRenderer'
import ImageCarousel from '@/components/ImageCarousel'
import Image from '@/components/Image'

const Layout = ({ reviews }) => {
  const { banners, upwork } = reviews

  return (
    <div className="mx-auto p-3 md:p-6 lg:p-12">
      <div className="prose prose-headings:mb-4 dark:prose-invert">
        <ContentRenderer source={reviews} />

        <Image
          src={banners[0].src}
          alt={banners[0].alt}
          animation="fade-in zoom-out"
          wrapperClassName="transition-transform group-hover:scale-105 duration-300 ease-out before:bg-omega-700"
          className="m-0"
          width={'9999'}
          height={'999'}
        />

        <ImageCarousel images={upwork} animation="fade-in zoom-out" className="mb-4 mt-4" />

        <div className="m-0 grid grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-none">
          <Image
            src={banners[1].src}
            alt={banners[1].alt}
            animation="fade-in zoom-out"
            className="m-0"
            width={'9999'}
            height={'999'}
          />

          <Image
            src={banners[2].src}
            alt={banners[2].alt}
            animation="fade-in zoom-out"
            className="m-0"
            width={'9999'}
            height={'999'}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout
