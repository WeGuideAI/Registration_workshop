import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode catches subtle React bugs
  reactStrictMode: true,

  // Speed up builds — type errors caught by tsc separately
  typescript: {
    ignoreBuildErrors: false,
  },

  // Images: allow external sources if needed later
  images: {
    remotePatterns: [],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'DENY'    },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
