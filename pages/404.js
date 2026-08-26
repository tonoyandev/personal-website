import React from 'react'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import layouts from '@/layouts/index'
import { getPageBySlug } from '@/lib/mdx'

// Statically render content/not-found.md so unknown URLs answer 404 with real content.
export async function getStaticProps() {
  const page = await getPageBySlug(['not-found'])

  return { props: { page: page || null } }
}

export default function NotFound({ page }) {
  const { meta = {}, ...content } = page || {}
  const DynamicLayout = layouts[meta.layout] || layouts.BlankCenter

  return (
    <>
      <Seo {...meta} noindex />
      <DynamicLayout {...meta} {...content} />
    </>
  )
}

NotFound.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
