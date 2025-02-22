import { setup } from '@storybook/vue3';
import vuetify from '../src/plugins/vuetify';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';

setup((app) => {
  // Registers your app's plugins into Storybook
  app.use(vuetify);
});

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [withVuetifyTheme];
export default preview;
