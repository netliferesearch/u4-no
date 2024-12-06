const { redirects } = require('./helpers/redirect');

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer({});
} else {
  const nextConfig = {
    // uncomment to enable critical css generation
    // reactStrictMode: true,
    // experimental: { optimizeCss: true }

    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    async redirects() {
      return redirects();
    },
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
        { protocol: 'https', hostname: 'www.u4.no', pathname: '/public/**' },
      ],
    },
    // set CORS headers for api routes
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
  };
  module.exports = nextConfig;
}
