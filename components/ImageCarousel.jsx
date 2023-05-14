import React from 'react'
import classNames from 'clsx'
import { ImageWithZoom, CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel'
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
      visibleSlides={isMobile ? 2 : 4}
      step={isMobile ? 2 : 4}
      totalSlides={images.length}
      naturalSlideWidth={440}
      naturalSlideHeight={300}
      hasMasterSpinner
      infinite
      isPlaying
    >
      <Slider>
        {images.map((image, i) => (
          <Slide key={i} className="cursor-pointer">
            <ImageWithZoom
              src={image.src}
              alt={image.alt}
              className="m-0 h-auto w-full object-contain object-center"
            />
          </Slide>
        ))}
      </Slider>
      <DotGroup className="dot-group hidden text-center sm:block" />
    </CarouselProvider>
  )
}

export default ImageCarousel
