/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    nextScriptWorkers: false,
    scrollRestoration: false,
    esmExternals: true
  },

  typescript: {
    ignoreBuildErrors: true
  },

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/login'
      }
    ];
  }
};

module.exports = nextConfig;
