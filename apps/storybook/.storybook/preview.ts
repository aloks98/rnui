import type { Preview } from '@storybook/react'
import { themes } from 'storybook/theming'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { addons } from 'storybook/preview-api'
import { useEffect } from 'react'
import '../src/styles.css'

function applyTheme(isDark: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', isDark)
  root.classList.toggle('light', !isDark)
  document.body.style.backgroundColor = isDark ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'
  document.body.style.color = isDark ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)'
}

function getIsDark(): boolean {
  try {
    const stored = localStorage.getItem('sb-addon-themes-3')
    if (stored) return JSON.parse(stored).current === 'dark'
  } catch {}
  return false
}

applyTheme(getIsDark())

const channel = addons.getChannel()
channel.on(DARK_MODE_EVENT_NAME, applyTheme)

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
    darkMode: {
      // These control BOTH the manager UI AND the docs page theme
      dark: {
        ...themes.dark,
        appBg: '#0a0a0a',
        appContentBg: '#0a0a0a',
        barBg: '#18181b',
        inputBg: '#18181b',
        inputBorder: '#27272a',
      },
      light: {
        ...themes.light,
      },
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        applyTheme(getIsDark())
      }, [])
      return Story()
    },
  ],
}

export default preview
