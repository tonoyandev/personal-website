import React from 'react'
import { useRouter } from 'next/router'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPaths, getPageBySlug, generateCollectionRss } from '@/lib/mdx'
import getMdxOptions from '@/lib/mdx-options'
import { siteMetaData } from '../theme.config'

// Fetch data at build time
export async function getStaticProps({ params }) {
  let slug = params.slug || []
  let currentPage = 1

  const pageIndex = slug.indexOf('page')

  if (pageIndex !== -1) {
    currentPage = parseInt(slug[pageIndex + 1], 10)
    slug = slug.slice(0, pageIndex)

    if (!Number.isFinite(currentPage) || currentPage < 1) {
      return { notFound: true }
    }
  }

  const page = await getPageBySlug(slug)

  // Unknown slugs must answer with a real 404, not a 200 carrying not-found content.
  if (!page) {
    return { notFound: true }
  }

  const props = { page }

  // Add pagination props for collection pages
  if (page.meta && page.meta.collection) {
    const {
      meta: {
        collection: { totalPages, records, recordsPerPage, infinitePaging },
      },
    } = page

    const pageRecords = records?.slice(
      recordsPerPage * (currentPage - 1),
      recordsPerPage * currentPage
    )

    page.meta.collection.records = pageRecords

    props.pagination = {
      infinitePaging,
      totalPages,
      currentPage,
    }
  }

  return { props }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const pages = await getPaths()

  // Generate the RSS/JSON feeds once per build. This used to run inside getStaticProps,
  // which writes to public/ at request time on a read-only serverless filesystem.
  const { collections } = getMdxOptions()
  await Promise.all(collections.map((collectionSlug) => generateCollectionRss(collectionSlug)))

  const paths = pages
    // `/not-found` is rendered by pages/404.js, so it must not be a real route of its own.
    .filter((page) => !(page.slug.length === 1 && page.slug[0] === 'not-found'))
    .map((page) => ({
      params: {
        slug: page.slug,
      },
    }))

  // Every route is enumerable at build time, so unknown URLs fall through to the 404 page.
  return { paths, fallback: false }
}

export default function Page({ pagination, page = {} }) {
  const { meta = {}, ...content } = page
  const router = useRouter()

  const DynamicLayout = layouts[meta.layout]
  // Strip query/hash so canonical and og:url stay stable across tracking parameters.
  const pageUrl = siteMetaData.siteUrl + router.asPath.split('?')[0].split('#')[0]

  if (!DynamicLayout) return null

  return (
    <>
      <Seo {...meta} pageUrl={pageUrl} />
      <DynamicLayout {...meta} {...content} pagination={pagination} pageUrl={pageUrl} />
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
