import React from 'react'
import { NextSeo } from 'next-seo'
import { siteMetaData } from '../theme.config'

// Used whenever a page has no image of its own, so social previews are never blank.
const FALLBACK_OG_IMAGE = { src: '/og-default.png', width: 1200, height: 630 }

const Seo = (props) => {
  const { seo = {}, title, description, images, pageUrl, layout, date, noindex = false } = props

  const meta = { ...siteMetaData, title, description, ...seo }

  const isArticle = layout === 'Post' && Boolean(date)

  const ogImages = (images?.length ? images : [FALLBACK_OG_IMAGE]).map((image) => ({
    url: meta.siteUrl + image.src,
    width: image.width,
    height: image.height,
    alt: image.alt || meta.title || meta.defaultTitle,
  }))

  const openGraph = {
    type: isArticle ? 'article' : 'website',
    url: pageUrl,
    title: meta.title || meta.defaultTitle,
    description: meta.description,
    images: ogImages,
    site_name: meta.siteName,
    locale: meta.locale,
    ...(isArticle && { article: { publishedTime: date } }),
  }

  return (
    <NextSeo
      title={meta.title}
      defaultTitle={meta.defaultTitle}
      titleTemplate={meta.titleTemplate}
      description={meta.description}
      canonical={noindex ? undefined : pageUrl}
      noindex={noindex}
      nofollow={noindex}
      openGraph={openGraph}
      twitter={meta.twitter}
    />
  )
}

export default Seo
