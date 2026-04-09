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

      // Apply to this iframe's document
      document.documentElement.classList.toggle('dark', isDark)
      document.body.style.backgroundColor = isDark ? '#0a0a0a' : '#ffffff'
      document.body.style.color = isDark ? '#fafafa' : ''

      // In docs mode, also update all sibling story iframes
      try {
        const storyFrames = window.parent?.document?.querySelectorAll('iframe[data-is-storybook]')
        storyFrames?.forEach((frame: Element) => {
          const iframeDoc = (frame as HTMLIFrameElement).contentDocument
          if (iframeDoc && iframeDoc !== document) {
            iframeDoc.documentElement.classList.toggle('dark', isDark)
            iframeDoc.body.style.backgroundColor = isDark ? '#0a0a0a' : '#ffffff'
            iframeDoc.body.style.color = isDark ? '#fafafa' : ''
          }
        })
      } catch {}

      return Story()
    },
  ],
}

export default preview
