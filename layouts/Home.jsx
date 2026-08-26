import React from 'react'
import classNames from 'clsx'
import { useRouter } from 'next/router'
import { SocialProfileJsonLd } from 'next-seo'
import ContentRenderer from '@/components/ContentRenderer'
import Image from '@/components/Image'
import Sep from '@/components/Sep'
import Reveal from '@/components/Reveal'
import Companies from '@/components/Companies'
import { siteMetaData, social } from '../theme.config'

const HeroPhoto = ({ main }) => (
  <>
    {main.images?.[0] && (
      <div className="hidden md:block">
        <Image
          src={main.images[0].src}
          width={main.images[0].width}
          height={main.images[0].height}
          alt={main.images[0].alt}
          animation="slide-in-top fade-in"
          priority
        />
      </div>
    )}
    {main.images?.[1] && (
      <div className="md:hidden">
        <Image
          src={main.images[1].src}
          width={180}
          height={180}
          alt={main.images[1].alt}
          className="mx-auto"
          priority
        />
      </div>
    )}
  </>
)

const HeroAbout = ({ main }) => {
  const codeRef = React.useRef(null)
  const router = useRouter()

  // Progressive enhancement: turn the '/contact' string in the hero code sample into a
  // real, keyboard-operable link once Prism has tokenized it.
  React.useEffect(() => {
    const container = codeRef.current
    if (!container) return

    const token = Array.from(container.querySelectorAll('.token.string')).find(
      (el) => el.textContent === "'/contact'"
    )
    if (!token) return

    const goToContact = (event) => {
      event.preventDefault()
      router.push('/contact')
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') goToContact(event)
    }

    token.classList.add('cursor-pointer', 'underline')
    token.setAttribute('role', 'link')
    token.setAttribute('aria-label', 'Go to the contact page')
    token.tabIndex = 0
    token.addEventListener('click', goToContact)
    token.addEventListener('keydown', handleKeyDown)

    return () => {
      token.removeEventListener('click', goToContact)
      token.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return (
    <Reveal
      animation="fade-in slide-in-right"
      className={classNames(
        'prose prose-invert prose-headings:my-4 first-of-type:prose-headings:mt-0 prose-p:hidden',
        'prose-headings:my-6 prose-pre:max-w-[100vw] md:prose-p:block md:prose-pre:max-w-lg'
      )}
    >
      <div ref={codeRef}>
        <ContentRenderer source={main} />
      </div>
    </Reveal>
  )
}

const Achievements = ({ achievements }) => (
  <div
    className={classNames(
      'prose prose-invert hidden grow grid-cols-[auto_1fr_auto_1fr] gap-x-4 gap-y-2 sm:grid md:gap-x-6 md:gap-y-6 md:pr-6'
    )}
  >
    {achievements?.map((item) => (
      // Statistics, not section headings — styled to match the old h2 scale.
      <React.Fragment key={item.text}>
        <p className="m-0 text-right text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {item.number}
        </p>
        <div className="flex items-center dark:text-accent-400">{item.text}</div>
      </React.Fragment>
    ))}
  </div>
)

const Layout = ({ main = {}, cta = {}, achievements = [], companies }) => (
  <div className="mx-auto my-auto py-4 md:p-10 lg:p-20">
    <SocialProfileJsonLd
      type="Person"
      name={siteMetaData.authorName}
      url={siteMetaData.siteUrl}
      sameAs={social?.map((item) => item.url).filter(Boolean)}
    />
    <div className="absolute right-0 top-0 box-content hidden h-full w-1/4 bg-gradient-to-br from-alpha-100 via-alpha to-beta pl-5 md:block" />
    <div className="items-end text-center md:flex md:text-left">
      <div className="relative shrink-0 basis-1/2 text-center md:order-2 md:-ml-20">
        <HeroPhoto main={main} />
      </div>
      <div className="z-10 mt-6 basis-full md:mb-6 md:mt-0">
        <HeroAbout main={main} />
      </div>
    </div>
    <div className="relative z-10">
      <Sep line className="hidden md:block" />
      <div
        className={classNames(
          'md:bg-gradient-omega-900 flex flex-wrap items-center justify-between',
          'px-4 md:p-8 md:shadow-xl'
        )}
      >
        <Achievements achievements={achievements} />
        <div className="prose prose-invert grow text-center">
          <ContentRenderer source={cta} />
        </div>
      </div>
      <div className="mt-6 w-full px-4 md:mt-12 md:w-3/4 md:px-2 md:pr-12">
        <Companies {...companies} />
      </div>
    </div>
  </div>
)

export default Layout
