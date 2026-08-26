import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import classNames from 'clsx'
import Loader from '@/components/Loader'

const Paging = ({ totalPages, currentPage, slug, infinite = false }) => {
  const router = useRouter()
  const [isFetching, setIsFetching] = React.useState()
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
    threshold: 1,
  })

  React.useEffect(() => {
    // off() only removes a listener when given the same reference that was passed to on().
    const handleStart = () => setIsFetching(true)
    const handleDone = () => setIsFetching(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleDone)
    router.events.on('routeChangeError', handleDone)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleDone)
      router.events.off('routeChangeError', handleDone)
    }
  }, [router.events])

  React.useEffect(() => {
    setIsIntersecting(inView)
  }, [inView])

  React.useEffect(() => {
    if (!infinite || currentPage === totalPages || !isIntersecting) return

    setIsIntersecting(false)

    router.push(
      {
        query: {
          slug: slug.concat('page', currentPage + 1),
          infinite,
        },
      },
      undefined,
      { scroll: false }
    )
  }, [router, currentPage, slug, totalPages, infinite, isIntersecting])

  return (
    <div ref={inViewRef}>
      <div className="mt-10 text-center">
        <div className="flex h-10 items-center justify-center text-omega-500">
          {isFetching && <Loader />}
        </div>
        <div className="my-4"></div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={`p-${page}`}
            href={slug.concat('page', page).join('/')}
            className={classNames(
              'mx-2 inline-block px-3 py-1 hover:border-transparent hover:bg-omega-600',
              currentPage == page
                ? 'bg-omega-700 text-white'
                : 'border border-omega-700 bg-transparent text-alpha'
            )}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        {currentPage && (
          <div className="md:block">
            <small className="font-mono font-normal text-omega-300">
              <span>
                Page <span className="font-bold text-white">{currentPage}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span>
              </span>
            </small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paging
