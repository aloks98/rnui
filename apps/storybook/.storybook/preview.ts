import type { Preview } from '@storybook/react'
import { themes } from 'storybook/theming'
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
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light },
      darkClass: 'dark',
      lightClass: '',
      classTarget: 'html',
      stylePreview: true,
    },
  },
}

export default preview
