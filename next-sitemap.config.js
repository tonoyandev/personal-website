/**
 * Sitemap is generated via the next-sitemap plugin. For more options see:
 * https://www.npmjs.com/package/next-sitemap
 */

// Must resolve to the same origin as siteMetaData.siteUrl in theme.config.js.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'http://localhost:3000'
).replace(/\/$/, '')

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Paginated routes duplicate the collection index, and /not-found is served by pages/404.js.
  exclude: ['/not-found', '**/page/**'],
  transform: async (config, path) => ({
    loc: path,
    changefreq: 'weekly',
    priority: path === '/' ? 1.0 : /^\/(blog|projects)\/.+/.test(path) ? 0.7 : 0.8,
    lastmod: new Date().toISOString(),
  }),
}
