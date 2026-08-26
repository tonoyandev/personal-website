import TagCard from '@/components/TagCard'
import BlogCardVertical from '@/components/BlogCardVertical'
import ContentRenderer from '@/components/ContentRenderer'
import Paging from '@/components/Paging'
import useInfinitePaging from '@/components/useInfinitePaging'
import Newsletter from '@/components/Newsletter'
import Reveal from '@/components/Reveal'
import Sep from '@/components/Sep'

const Layout = ({ pagination, collection, slug, content, categories }) => {
  const { records, infinitePaging } = collection
  const { currentPage, totalPages } = pagination
  const [infiniteRecords] = useInfinitePaging({
    currentPage,
    records,
    enabled: infinitePaging,
  })

  return (
    <div className="mx-auto w-full">
      <div className="prose dark:prose-invert prose-headings:mb-4">
        {categories && (
          <>
            <div className="grid-cols-2 bg-omega-800 md:grid">
              {/* Section heading is h2 for semantics, sized to sit below the page title. */}
              <div className="p-3 md:p-6 lg:p-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight lg:[&_h2]:text-4xl">
                <ContentRenderer source={categories} />
                <div className="mt-4 grid gap-2 lg:grid-cols-2">
                  {categories?.collection?.records?.map((tag) => (
                    <TagCard key={tag.title} {...tag} />
                  ))}
                </div>
              </div>
              <Reveal
                animation="fade-in slide-in-left"
                className="bg-gradient-omega-900 p-3 md:p-6 lg:p-12"
              >
                <Newsletter />
              </Reveal>
            </div>
            <Sep line className="" />
          </>
        )}
        <div className="p-4 md:p-6 lg:p-12">
          <div className="flex items-start justify-between">
            {/* Title is an h1 for semantics, shown at the original display scale. */}
            <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight lg:[&_h1]:text-4xl">
              <ContentRenderer source={content} />
            </div>
            {currentPage && (
              <div className="hidden border-b border-omega-700 md:block">
                <p className="m-0 font-mono text-lg font-normal md:text-xl">
                  <span>Page </span>
                  {currentPage}
                  <span>/{totalPages}</span>
                </p>
              </div>
            )}
          </div>
          {Array.from({ length: currentPage }, (_, i) => {
            const page = i + 1
            const isStaticPage = page === currentPage
            const pageRecords = isStaticPage
              ? records
              : infinitePaging && infiniteRecords[page]?.records
            if (!pageRecords) return null
            return (
              <div
                key={`page-${page}`}
                className="mt-4 grid grid-cols-1 gap-6 md:mt-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {pageRecords.map((record) => (
                  <BlogCardVertical key={record.slug.join('/')} {...record} />
                ))}
              </div>
            )
          })}
          <Paging
            infinite={infinitePaging}
            currentPage={currentPage}
            totalPages={totalPages}
            slug={slug}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout
