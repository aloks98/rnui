import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'src/index.css'),
        base: resolve(import.meta.dirname, 'src/base.css'),
        light: resolve(import.meta.dirname, 'src/light.css'),
        dark: resolve(import.meta.dirname, 'src/dark.css'),
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
