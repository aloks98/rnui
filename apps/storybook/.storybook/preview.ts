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

// Read initial state from localStorage (where the addon persists it)
function getIsDark(): boolean {
  try {
    const stored = localStorage.getItem('sb-addon-themes-3')
    if (stored) {
      const parsed = JSON.parse(stored)
      return parsed.current === 'dark'
    }
  } catch {}
  return false
}

// Apply on module load (covers initial render of all iframes)
applyTheme(getIsDark())

// Listen for toggle events (covers subsequent toggles)
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
      dark: { ...themes.dark },
      light: { ...themes.light },
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        // Re-apply on mount in case this iframe loaded after the toggle
        applyTheme(getIsDark())
      }, [])
      return Story()
    },
  ],
}

export default preview
