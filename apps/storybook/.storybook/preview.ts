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

  const bg = isDark ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'
  const fg = isDark ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)'

  // Set on body
  document.body.style.backgroundColor = bg
  document.body.style.color = fg

  // Override Storybook's docs wrapper background
  const docsWrapper = document.querySelector('.sb-wrapper')
  if (docsWrapper) {
    ;(docsWrapper as HTMLElement).style.backgroundColor = bg
    ;(docsWrapper as HTMLElement).style.color = fg
  }

  // Also target any docs-story containers (story preview wrappers in docs)
  document.querySelectorAll('.docs-story').forEach((el) => {
    ;(el as HTMLElement).style.backgroundColor = bg
  })
}

function getIsDark(): boolean {
  try {
    const stored = localStorage.getItem('sb-addon-themes-3')
    if (stored) {
      return JSON.parse(stored).current === 'dark'
    }
  } catch {}
  return false
}

// Apply on module load
applyTheme(getIsDark())

// Listen for toggle events
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
        applyTheme(getIsDark())

        // Watch for late-rendered docs containers
        const observer = new MutationObserver(() => {
          applyTheme(getIsDark())
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => observer.disconnect()
      }, [])
      return Story()
    },
  ],
}

export default preview
