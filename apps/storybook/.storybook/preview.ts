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
      const isDark = context.globals.theme === 'dark'

      // Toggle .dark on iframe's <html>
      document.documentElement.classList.toggle('dark', isDark)

      // Explicitly set body bg/color — CSS var approach fails in some
      // storybook iframe contexts where the cascade doesn't reach body
      document.body.style.backgroundColor = isDark
        ? 'oklch(0.145 0 0)'
        : 'oklch(1 0 0)'
      document.body.style.color = isDark
        ? 'oklch(0.985 0 0)'
        : 'oklch(0.145 0 0)'

      return Story()
    },
  ],
}

export default preview
