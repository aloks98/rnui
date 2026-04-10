import { createMDX } from 'fumadocs-mdx/next'

const config = {
  reactStrictMode: true,
  transpilePackages: ['@e412/rnui-react'],
  allowedDevOrigins: ['*'],
}

const withMDX = createMDX()

export default withMDX(config)
