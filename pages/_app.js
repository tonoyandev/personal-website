import React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import MDXComponents from '@/components/MDX'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        {/* No maximum-scale/user-scalable: blocking pinch zoom fails WCAG 1.4.4. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MDXProvider components={MDXComponents}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default MyApp
