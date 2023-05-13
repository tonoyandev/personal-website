import React from 'react'
import { Image , CarouselProvider, DotGroup, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const ImageCarousel = (props) => {
  const { images } = props
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Ensure window object is defined
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => window.innerWidth < 640
      setIsMobile(checkIsMobile())

      const handleResize = () => {
        setIsMobile(checkIsMobile())
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  if (!images || !images.length) return null

  return (
    <CarouselProvider
      visibleSlides={isMobile ? 1 : 3}
      step={isMobile ? 1 : 3}
      totalSlides={images.length}
      naturalSlideWidth={720}
      naturalSlideHeight={320}
      isIntrinsicHeight
      hasMasterSpinner
      infinite
      isPlaying
    >
      <Slider>
        {images.map((image, i) => (
          <Slide key={i} className="cursor-pointer">
            <Image
              src={image.src}
              alt={image.alt}
              className="m-0 object-contain object-center pr-1"
            />
          </Slide>
        ))}
      </Slider>
      <DotGroup className="dot-group  hidden text-center sm:block" />
    </CarouselProvider>
  )
}

export default ImageCarousel
