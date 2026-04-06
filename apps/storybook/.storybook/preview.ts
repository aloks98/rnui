import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      darkClass: 'dark',
      lightClass: '',
      classTarget: 'html',
    },
  },
}

export default preview
