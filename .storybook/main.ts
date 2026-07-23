import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/design-docs/**/*.mdx',
    '../src/foundations/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  // Pre-bundle MUI/Emotion so the first story render doesn't race Vite's optimizer.
  viteFinal: async (config) => {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        '@mui/material',
        '@mui/material/styles',
        '@mui/material/Button',
        '@emotion/react',
        '@emotion/styled',
      ],
    };
    return config;
  },
};

export default config;
