import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  docs: {
    defaultName: 'Docs',
  },
  viteFinal(config) {
    config.plugins ??= []
    config.plugins.push(tailwindcss())
    return config
  },
}

export default config
