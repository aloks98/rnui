import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'centered',
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Toggle dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme

      // Apply dark mode to the iframe document
      document.documentElement.classList.toggle('dark', theme === 'dark')
      document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#ffffff'
      document.body.style.color = theme === 'dark' ? '#fafafa' : ''

      // Also try to apply to the parent docs page
      try {
        const docsRoot = document.querySelector('.docs-story')
        if (docsRoot) {
          (docsRoot as HTMLElement).style.backgroundColor = theme === 'dark' ? '#0a0a0a' : ''
        }
      } catch {}

      return Story()
    },
  ],
}

export default preview
