import { createMDX } from 'fumadocs-mdx/next'

const config = {
  reactStrictMode: true,
  transpilePackages: ['@e412/rnui-react'],
  allowedDevOrigins: ['192.168.150.40'],
}

const withMDX = createMDX()

export default withMDX(config)
