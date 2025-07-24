import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config: NextConfig = {
  outputFileTracingIncludes: {
    registry: ['./registry/**/*'],
  },
  reactStrictMode: true,
  serverExternalPackages: ['twoslash', 'typescript'],
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ]
  },
}

export default withMDX(config)
