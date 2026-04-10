import { createMDX } from 'fumadocs-mdx/next'

const config = {
  reactStrictMode: true,
  transpilePackages: ['@e412/rnui-react'],
}

const withMDX = createMDX()

export default withMDX(config)
