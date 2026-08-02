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
      // Per-module .d.ts files (mirroring preserveModules) so subpath exports
      // like ./code-block-full can resolve their own types.
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        // Subpath-only entry (not in the barrel): opting into the full shiki
        // registry must be an explicit import.
        'components/code-block-full': resolve(
          import.meta.dirname,
          'src/components/code-block-full.ts',
        ),
      },
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
