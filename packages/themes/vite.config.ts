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
        oxide: resolve(import.meta.dirname, 'src/oxide.css'),
        ocean: resolve(import.meta.dirname, 'src/ocean.css'),
        violet: resolve(import.meta.dirname, 'src/violet.css'),
        forest: resolve(import.meta.dirname, 'src/forest.css'),
        rose: resolve(import.meta.dirname, 'src/rose.css'),
        amber: resolve(import.meta.dirname, 'src/amber.css'),
        slate: resolve(import.meta.dirname, 'src/slate.css'),
        crimson: resolve(import.meta.dirname, 'src/crimson.css'),
        presets: resolve(import.meta.dirname, 'src/presets.css'),
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
