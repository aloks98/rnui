import type { Preview, Renderer } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
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
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    // Ensure body bg follows theme variables
    (Story, context) => {
      const root = document.documentElement
      const isDark = root.classList.contains('dark')
      document.body.style.backgroundColor = isDark ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'
      document.body.style.color = isDark ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)'
      return Story()
    },
  ],
}

export default preview
