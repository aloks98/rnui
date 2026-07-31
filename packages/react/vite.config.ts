import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

// Externalize everything that isn't a relative/absolute import (i.e. all node_modules)
const external = (id: string) =>
  !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('@/')

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
    },
    rolldownOptions: {
      external,
      // Preserve the module graph instead of emitting a single flat file so
      // consumers only pull in the components they actually import.
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          exports: 'named',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
