const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

module.exports = withBundleAnalyzer({
  images: {
    // Top end matches the max-w-screen-xl (1280px) container on 2x displays.
    deviceSizes: [428, 540, 640, 768, 1024, 1280, 1920, 2560],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'utils'],
  },
  experimental: {
    // The content pipeline reads from disk with process.cwd()-based paths, so file
    // tracing conservatively pulls the whole working directory into every serverless
    // function — including the webpack cache, which alone pushed each one past
    // Vercel's 250MB limit. None of these are needed at runtime: pages are fully
    // prerendered (fallback: false), so getStaticProps never executes on a request.
    outputFileTracingExcludes: {
      '*': [
        '.next/cache/**',
        '.claude/**',
        '.git/**',
        'package-lock.json',
        'node_modules/typescript/**',
        'node_modules/semantic-release/**',
        'node_modules/@semantic-release/**',
        'node_modules/prettier/**',
        'node_modules/uglify-js/**',
        'node_modules/@next/bundle-analyzer/**',
        'node_modules/@swc/core*/**',
        'node_modules/esbuild/**',
      ],
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
