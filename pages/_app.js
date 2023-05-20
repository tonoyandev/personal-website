import React from 'react'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from '@/components/MDX'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <MDXProvider components={MDXComponents}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
    </>
  )
}

export default MyApp
