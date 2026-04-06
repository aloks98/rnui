import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'react/jsx-runtime',
]

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rolldownOptions: {
      external,
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
