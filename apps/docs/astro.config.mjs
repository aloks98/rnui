import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [
    starlight({
      title: '@e412/rnui',
      sidebar: [
        { label: 'Getting Started', slug: 'getting-started' },
        { label: 'Theming', slug: 'theming' },
        {
          label: 'Components',
          items: [
            { label: 'Button', slug: 'components/button' },
            { label: 'Card', slug: 'components/card' },
            { label: 'Dialog', slug: 'components/dialog' },
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },
})
