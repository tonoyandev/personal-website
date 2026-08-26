import React from 'react'
import classNames from 'clsx'
import NextImage from 'next/image'
import { CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const ImageCarousel = (props) => {
  const { images, className } = props
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Check if window is defined (i.e., we're on the client side, not server side)
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => window.innerWidth <= 640
      setIsMobile(checkIsMobile())

      const handleResize = () => {
        setIsMobile(checkIsMobile())
      }

      window.addEventListener('resize', handleResize)

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  if (!images || !images.length) return null

  return (
    <CarouselProvider
      className={classNames('relative', className)}
      visibleSlides={isMobile ? 1 : 3}
      step={isMobile ? 1 : 3}
      totalSlides={images.length}
      naturalSlideWidth={440}
      naturalSlideHeight={300}
      infinite
    >
      {/* next/image lazy-loads and serves resized WebP; the carousel's own Image
          component renders eager, full-size <img> tags for every slide at once. */}
      <Slider>
        {images.map((image) => (
          <Slide key={image.src}>
            <NextImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 92vw, 30vw"
              className="m-0 object-contain object-center"
            />
          </Slide>
        ))}
      </Slider>
      <DotGroup className="dot-group hidden text-center sm:block" />
    </CarouselProvider>
  )
}

export default ImageCarousel
