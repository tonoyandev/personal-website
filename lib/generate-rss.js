import { Feed } from 'feed'
import { siteMetaData } from '../theme.config'

export default async function generateRssFeed(records, feedPath) {
  const { siteUrl, defaultTitle, description, siteName, email, locale } = siteMetaData

  const date = new Date()

  const author = {
    name: siteName,
    email,
    link: siteUrl,
  }

  // Creating feed
  const feed = new Feed({
    title: defaultTitle,
    description: description,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon/favicon-32x32.png`,
    favicon: `${siteUrl}/favicon/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${siteName}`,
    updated: date,
    // `locale` is an Open Graph value (en_US); feeds expect a language tag (en-US).
    language: locale.replace('_', '-'),
    author,
    feedLinks: {
      rss2: `${siteUrl}${feedPath}/feed.xml`,
      json: `${siteUrl}${feedPath}/feed.json`,
    },
  })

  // Adding blogs to the rss feed
  records.forEach((record) => {
    const { title, slug, description, date } = record

    const url = `${siteUrl}/${slug.join('/')}`

    feed.addItem({
      title: title,
      id: url,
      link: url,
      description: description,
      author: [author],
      date: new Date(date),
    })
  })

  return feed
}
