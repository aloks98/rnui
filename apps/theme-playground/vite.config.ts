import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // Served at /themes/ from the docs app's public directory
  base: '/themes/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    port: 3001,
  },
  build: {
    outDir: resolve(import.meta.dirname, '../docs/public/themes'),
    emptyOutDir: true,
  },
})
