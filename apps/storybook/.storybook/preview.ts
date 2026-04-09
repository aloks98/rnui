import type { Preview } from '@storybook/react'
import { themes } from 'storybook/theming'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { addons } from 'storybook/preview-api'
import '../src/styles.css'

const channel = addons.getChannel()

// Listen for dark mode toggle from the addon and update all iframes
channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  const root = document.documentElement
  if (isDark) {
    root.classList.add('dark')
    root.classList.remove('light')
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
  }
  document.body.style.backgroundColor = isDark ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'
  document.body.style.color = isDark ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)'
})

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
      theme: themes.light,
      canvas: {
        sourceState: 'shown',
      },
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light },
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
  },
}

export default preview
