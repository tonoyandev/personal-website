import ProjectCardHorizontal from '@/components/ProjectCardHorizontal'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import ImageCarousel from '@/components/ImageCarousel'

const Layout = ({ projects, testimonials }) => {
  return (
    <div className="mx-auto p-3 md:p-6 lg:p-12">
      <div className="prose prose-headings:mb-4 dark:prose-invert">
        <ContentRenderer source={projects} />

        <div className="mt-4 grid gap-4 md:mt-12 md:gap-6">
          <ImageCarousel images={testimonials?.upwork} />
        </div>
        {/* <div className="mt-4 grid grid-cols-fluid ">
          <ImageGallery images={testimonials?.topBanner} />
        </div>
        <div className="mt-4 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:15rem] md:mt-12 md:gap-6">
          <ImageGallery images={testimonials?.upwork} />
        </div>
        <div className="mt-4 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:15rem] md:mt-12 md:gap-6">
          <ImageGallery images={testimonials?.banners[0]} />
        </div>
        <div className="mt-4 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:15rem] md:mt-12 md:gap-6">
          <ImageGallery images={testimonials?.banners[1]} />
        </div>
        <div className="mt-4 grid grid-cols-fluid gap-4 [--tw-fluid-col-min:15rem] md:mt-12 md:gap-6">
          <ImageGallery images={testimonials?.linkedin} />
        </div> */}
        <div className="my-6 md:my-12"></div>
        <div className="mt-4 grid gap-4 md:mt-12 md:gap-6">
          {projects?.collection?.records?.map((item, i) => (
            <ProjectCardHorizontal key={item.slug} index={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Layout
