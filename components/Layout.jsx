import React from 'react'
import classNames from 'clsx'
import Menu from '@/components/Menu'
import fonts from '@/styles/fonts'

const Layout = (props) => {
  const { children } = props

  return (
    <div
      className={classNames(
        'dark relative flex min-h-screen w-full justify-center bg-black font-sans lg:px-4 xl:px-8',
        ...fonts
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:bg-alpha focus:px-4 focus:py-2 focus:font-bold focus:text-black"
      >
        Skip to content
      </a>
      <div className="fixed bottom-0 left-0 z-50 hidden w-full bg-black md:block lg:h-4 xl:h-8"></div>
      <div className="fixed left-0 top-0 z-50 hidden w-full bg-black md:block lg:h-4 xl:h-8"></div>
      <div className="relative w-full max-w-screen-xl">
        <main
          id="main-content"
          className="relative h-full bg-gradient-to-tr from-omega-900 via-omega-900 to-omega-800"
        >
          <div className="flex h-full w-full flex-col content-center items-center pb-20 lg:py-4 xl:py-8">
            {children}
          </div>
        </main>
      </div>
      <Menu />
    </div>
  )
}

export default Layout
